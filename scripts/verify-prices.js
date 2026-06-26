#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PRICE_DIR = path.join(ROOT, "data", "prices");
const SYMBOLS = ["SPY", "QQQ", "GLD"];
const MIN_ROWS = 80;

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

function normalizeHeader(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function numeric(value) {
  return Number(String(value ?? "").replace(/,/g, ""));
}

function parseCsv(symbol) {
  const file = path.join(PRICE_DIR, `${symbol}.csv`);
  if (!fs.existsSync(file)) {
    return { ok: false, symbol, errors: [`${symbol}.csv missing`], rows: [] };
  }
  const lines = fs.readFileSync(file, "utf8").trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return { ok: false, symbol, errors: [`${symbol}.csv has no data rows`], rows: [] };

  const headers = splitCsvLine(lines[0]).map(normalizeHeader);
  const index = {
    date: headers.indexOf("date"),
    open: headers.indexOf("open"),
    high: headers.indexOf("high"),
    low: headers.indexOf("low"),
    close: headers.indexOf("close"),
    adjClose: headers.indexOf("adjclose"),
    volume: headers.indexOf("volume"),
  };
  const errors = [];
  ["date", "open", "high", "low", "close", "adjClose"].forEach((field) => {
    if (index[field] < 0) errors.push(`missing header ${field}`);
  });

  const seen = new Set();
  const rows = [];
  let previousDate = "";
  for (let i = 1; i < lines.length; i += 1) {
    const parts = splitCsvLine(lines[i]);
    const date = parts[index.date];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
      errors.push(`row ${i + 1}: invalid date`);
      continue;
    }
    if (seen.has(date)) errors.push(`duplicate date ${date}`);
    seen.add(date);
    if (previousDate && date < previousDate) errors.push(`date order breaks at ${date}`);
    previousDate = date;

    ["open", "high", "low", "close", "adjClose"].forEach((field) => {
      if (!Number.isFinite(numeric(parts[index[field]]))) errors.push(`row ${i + 1}: ${field} is not numeric`);
    });
    rows.push({
      date,
      close: numeric(parts[index.close]),
      adjClose: numeric(parts[index.adjClose]),
    });
  }
  if (rows.length < MIN_ROWS) errors.push(`only ${rows.length} rows, need at least ${MIN_ROWS}`);
  return { ok: errors.length === 0, symbol, errors, rows };
}

function intersectDateRange(results) {
  const valid = results.filter((result) => result.rows.length);
  if (valid.length !== SYMBOLS.length) return null;
  const starts = valid.map((result) => result.rows[0].date).sort();
  const ends = valid.map((result) => result.rows[result.rows.length - 1].date).sort();
  return { start: starts[starts.length - 1], end: ends[0] };
}

function main() {
  console.log("Price Data Verification");
  const results = SYMBOLS.map(parseCsv);
  results.forEach((result) => {
    if (result.ok) {
      const first = result.rows[0].date;
      const last = result.rows[result.rows.length - 1].date;
      console.log(`${result.symbol} OK rows=${result.rows.length} range=${first}..${last}`);
    } else {
      console.log(`${result.symbol} FAIL ${result.errors.join("; ")}`);
    }
  });

  const range = intersectDateRange(results);
  if (range && range.start <= range.end) console.log(`Common range OK ${range.start}..${range.end}`);
  else console.log("Common range FAIL no overlapping range across SPY/QQQ/GLD");

  if (results.some((result) => !result.ok) || !range || range.start > range.end) process.exit(1);
}

if (require.main === module) main();

module.exports = { parseCsv, splitCsvLine };
