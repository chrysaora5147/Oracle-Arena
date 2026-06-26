#!/usr/bin/env node

const fs = require("fs");
const https = require("https");
const path = require("path");
const { parseCsv } = require("./verify-prices");

const ROOT = path.resolve(__dirname, "..");
const PRICE_DIR = path.join(ROOT, "data", "prices");
const SYMBOLS = [
  { symbol: "SPY" },
  { symbol: "QQQ" },
  { symbol: "GLD" },
];
const HEADER = "date,open,high,low,close,adjClose,volume";

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "OracleArena/1.0" } }, (response) => {
      if (response.statusCode < 200 || response.statusCode >= 300) {
        reject(new Error(`HTTP ${response.statusCode}`));
        response.resume();
        return;
      }
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => { body += chunk; });
      response.on("end", () => resolve(body));
    }).on("error", reject);
  });
}

function splitCsvLine(line) {
  const out = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === "\"") quoted = !quoted;
    else if (char === "," && !quoted) {
      out.push(current.trim().replace(/^"|"$/g, ""));
      current = "";
    } else current += char;
  }
  out.push(current.trim().replace(/^"|"$/g, ""));
  return out;
}

function numeric(value) {
  return Number(String(value ?? "").replace(/,/g, ""));
}

function parseYahooChart(jsonText, symbol) {
  const payload = JSON.parse(jsonText);
  const result = payload.chart?.result?.[0];
  const error = payload.chart?.error;
  if (error) throw new Error(`${symbol}: ${error.description || error.code}`);
  if (!result) throw new Error(`${symbol}: no chart data returned`);
  const timestamps = result.timestamp || [];
  const quote = result.indicators?.quote?.[0] || {};
  const adj = result.indicators?.adjclose?.[0]?.adjclose || [];
  return timestamps.map((timestamp, index) => {
    const close = quote.close?.[index];
    const row = {
      date: new Date(timestamp * 1000).toISOString().slice(0, 10),
      open: numeric(quote.open?.[index]),
      high: numeric(quote.high?.[index]),
      low: numeric(quote.low?.[index]),
      close: numeric(close),
      adjClose: numeric(adj[index] ?? close),
      volume: Math.round(numeric(quote.volume?.[index]) || 0),
    };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(row.date)) throw new Error(`${symbol}: invalid date ${row.date}`);
    ["open", "high", "low", "close", "adjClose"].forEach((field) => {
      if (!Number.isFinite(row[field])) throw new Error(`${symbol}: invalid ${field} on ${row.date}`);
    });
    return row;
  }).filter((row) => row.date <= new Date().toISOString().slice(0, 10));
}

function readExistingRows(symbol) {
  const file = path.join(PRICE_DIR, `${symbol}.csv`);
  if (!fs.existsSync(file)) return [];
  const parsed = parseCsv(symbol);
  if (!parsed.ok) throw new Error(`${symbol}: existing CSV failed validation; refusing to overwrite`);
  const lines = fs.readFileSync(file, "utf8").trim().split(/\r?\n/).filter(Boolean);
  return lines.slice(1).map((line) => {
    const parts = splitCsvLine(line);
    return {
      date: parts[0],
      open: numeric(parts[1]),
      high: numeric(parts[2]),
      low: numeric(parts[3]),
      close: numeric(parts[4]),
      adjClose: numeric(parts[5]),
      volume: Math.round(numeric(parts[6]) || 0),
    };
  });
}

function mergeRows(existing, incoming) {
  const byDate = new Map();
  existing.forEach((row) => byDate.set(row.date, row));
  incoming.forEach((row) => byDate.set(row.date, row));
  return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
}

function toCsv(rows) {
  return [
    HEADER,
    ...rows.map((row) => [
      row.date,
      row.open,
      row.high,
      row.low,
      row.close,
      row.adjClose,
      row.volume ?? "",
    ].join(",")),
  ].join("\n") + "\n";
}

function validateRows(symbol, rows) {
  const seen = new Set();
  let previous = "";
  if (rows.length < 80) throw new Error(`${symbol}: only ${rows.length} rows after merge`);
  rows.forEach((row) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(row.date)) throw new Error(`${symbol}: invalid date ${row.date}`);
    if (seen.has(row.date)) throw new Error(`${symbol}: duplicate date ${row.date}`);
    if (previous && row.date < previous) throw new Error(`${symbol}: dates not sorted at ${row.date}`);
    seen.add(row.date);
    previous = row.date;
    ["open", "high", "low", "close", "adjClose"].forEach((field) => {
      if (!Number.isFinite(row[field])) throw new Error(`${symbol}: invalid ${field} on ${row.date}`);
    });
  });
}

async function updateSymbol(config) {
  const period1 = Math.floor(Date.UTC(2019, 0, 1) / 1000);
  const period2 = Math.floor(Date.now() / 1000);
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${config.symbol}?period1=${period1}&period2=${period2}&interval=1d&events=history&includeAdjustedClose=true`;
  const existing = readExistingRows(config.symbol);
  const existingLatest = existing.at(-1)?.date || "none";
  const incoming = parseYahooChart(await fetchText(url), config.symbol);
  const merged = mergeRows(existing, incoming);
  validateRows(config.symbol, merged);
  const latest = merged.at(-1)?.date || "none";
  const appended = merged.filter((row) => existingLatest === "none" || row.date > existingLatest).length;

  fs.mkdirSync(PRICE_DIR, { recursive: true });
  const file = path.join(PRICE_DIR, `${config.symbol}.csv`);
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, toCsv(merged));
  const original = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
  try {
    fs.renameSync(tmp, file);
    const validation = parseCsv(config.symbol);
    if (!validation.ok) throw new Error(validation.errors.join("; "));
  } catch (error) {
    if (original != null) fs.writeFileSync(file, original);
    else if (fs.existsSync(file)) fs.unlinkSync(file);
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    throw error;
  }
  return { symbol: config.symbol, rows: merged.length, latest, appended };
}

async function main() {
  console.log("Oracle Arena price update");
  console.log("Source: Yahoo Finance chart endpoint. adjClose uses adjusted close when returned, otherwise close.");
  const summaries = [];
  for (const config of SYMBOLS) {
    try {
      summaries.push(await updateSymbol(config));
    } catch (error) {
      console.error(`${config.symbol}: update failed: ${error.message}`);
      process.exitCode = 1;
    }
  }
  summaries.forEach((summary) => {
    console.log(`${summary.symbol}: ${summary.rows} rows, latest ${summary.latest}, appended ${summary.appended} rows`);
  });
  if (process.exitCode) console.error("One or more updates failed. Existing valid CSV files were preserved where possible.");
}

if (require.main === module) main();
