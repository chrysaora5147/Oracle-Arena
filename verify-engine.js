const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

function hashString(input) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rand(seed) {
  return hashString(seed) / 4294967295;
}

function average(values) {
  const clean = values.filter(Number.isFinite);
  return clean.length ? clean.reduce((a, b) => a + b, 0) / clean.length : 0;
}

function maxDrawdown(equityCurve) {
  let peak = equityCurve[0] || 1;
  let drawdown = 0;
  equityCurve.forEach((value) => {
    peak = Math.max(peak, value);
    drawdown = Math.min(drawdown, value / peak - 1);
  });
  return drawdown;
}

function sharpe(returns) {
  if (!returns.length) return 0;
  const avg = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((a, b) => a + (b - avg) ** 2, 0) / returns.length;
  const stdev = Math.sqrt(variance);
  return stdev === 0 ? 0 : (avg / stdev) * Math.sqrt(252);
}

function parseCorrectValue(value) {
  if (value === null || value === undefined || value === "") return null;
  if (value === true || value === false) return value;
  const normalized = String(value).trim().toLowerCase();
  if (["true", "yes", "1", "correct"].includes(normalized)) return true;
  if (["false", "no", "0", "incorrect"].includes(normalized)) return false;
  if (["null", "pending", "tie", ""].includes(normalized)) return null;
  return null;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function forwardLeagueReturn(rows, league) {
  return rows
    .filter((row) => row.status === "resolved" && row.league === league)
    .reduce((equityValue, row) => equityValue * (1 + row.strategyReturn), 1) - 1;
}

function forwardGrandAverage(rows) {
  return average(["Stock League", "Tech League", "Gold League"].map((league) => forwardLeagueReturn(rows, league)));
}

function canDrawLineSeries(series) {
  return series
    .map((s) => ({ points: (s.points || []).filter((p) => Number.isFinite(p.value)) }))
    .filter((s) => s.points.length >= 2).length > 0;
}

const prices = [100, 110, 99, 108.9];
const signals = ["BUY", "CASH", "BUY"];
const directions = ["UP", "DOWN", "UP"];
let equity = 1;
let benchmark = 1;
let wins = 0;
let buyDays = 0;
const strategyReturns = [];
const equityCurve = [1];

for (let i = 0; i < signals.length; i += 1) {
  const assetReturn = prices[i + 1] / prices[i] - 1;
  const strategyReturn = signals[i] === "BUY" ? assetReturn : 0;
  equity *= 1 + strategyReturn;
  benchmark *= 1 + assetReturn;
  wins += (directions[i] === "UP" && assetReturn > 0) || (directions[i] === "DOWN" && assetReturn < 0) ? 1 : 0;
  buyDays += signals[i] === "BUY" ? 1 : 0;
  strategyReturns.push(strategyReturn);
  equityCurve.push(equity);
}

assert.ok(Math.abs(strategyReturns[0] - 0.10) < 1e-12);
assert.strictEqual(strategyReturns[1], 0);
assert.ok(Math.abs(strategyReturns[2] - 0.10) < 1e-12);
assert.ok(Math.abs(equity - 1.21) < 1e-12);
assert.ok(Math.abs(benchmark - 1.089) < 1e-12);
assert.strictEqual(wins / signals.length, 1);
assert.strictEqual(buyDays / signals.length, 2 / 3);
assert.ok(maxDrawdown(equityCurve) <= 0);
assert.ok(Number.isFinite(sharpe(strategyReturns)));

const priceMap = {
  SPY: [
    { date: "2026-06-24", adjustedClose: 100 },
    { date: "2026-06-25", adjustedClose: 105 },
    { date: "2026-06-26", adjustedClose: 102.9 },
  ],
};

function resolveForwardPrediction(prediction, resolvedAt, pricesByAsset) {
  const series = pricesByAsset[prediction.asset];
  if (!series) return null;
  const dateIndex = series.findIndex((row) => row.date === prediction.date);
  if (dateIndex < 0 || dateIndex >= series.length - 1) return null;
  const current = series[dateIndex];
  const next = series[dateIndex + 1];
  const assetReturn = next.adjustedClose / current.adjustedClose - 1;
  const strategyReturn = prediction.signal === "BUY" ? assetReturn : 0;
  const correct = assetReturn === 0
    ? null
    : (prediction.direction === "UP" && assetReturn > 0) || (prediction.direction === "DOWN" && assetReturn < 0);
  return {
    ...prediction,
    status: "resolved",
    resultDate: next.date,
    resolvedAt,
    actualReturn: assetReturn,
    benchmarkReturn: assetReturn,
    strategyReturn,
    correct,
  };
}

function forwardLeaderboard(rows) {
  return rows
    .filter((row) => row.status === "resolved")
    .reduce((acc, row) => {
      acc[row.oracle_id] ||= { totalReturn: 1, resolvedCount: 0 };
      acc[row.oracle_id].totalReturn *= 1 + row.strategyReturn;
      acc[row.oracle_id].resolvedCount += 1;
      return acc;
    }, {});
}

function validImport(row) {
  return Boolean(
    row
    && /^\d{4}-\d{2}-\d{2}$/.test(row.date)
    && row.oracle_id
    && row.asset
    && ["UP", "DOWN"].includes(row.direction)
    && ["BUY", "CASH"].includes(row.signal)
    && ["pending", "resolved"].includes(row.status || "pending")
  );
}

const rawPrediction = {
  id: "2026-06-24-oracle-SPY-forward",
  date: "2026-06-24",
  createdAt: "2026-06-24T21:05:00Z",
  oracle_id: "oracle",
  oracle_name: "Oracle",
  league: "Stock League",
  asset: "SPY",
  raw_output: "The Sun",
  interpretation: "Positive omen",
  direction: "UP",
  signal: "BUY",
  confidence: 0.62,
  position_size: 1,
  status: "pending",
};

const resolvedForward = resolveForwardPrediction(rawPrediction, "2026-06-25T22:00:00Z", priceMap);
assert.strictEqual(resolvedForward.status, "resolved");
assert.strictEqual(resolvedForward.resultDate, "2026-06-25");
assert.ok(Math.abs(resolvedForward.actualReturn - 0.05) < 1e-12);
assert.ok(Math.abs(resolvedForward.strategyReturn - 0.05) < 1e-12);
assert.strictEqual(resolvedForward.correct, true);
assert.strictEqual(resolvedForward.raw_output, rawPrediction.raw_output);
assert.strictEqual(resolvedForward.direction, rawPrediction.direction);
assert.strictEqual(resolvedForward.signal, rawPrediction.signal);
assert.strictEqual(resolvedForward.confidence, rawPrediction.confidence);
assert.strictEqual(resolvedForward.createdAt, rawPrediction.createdAt);

const cashPrediction = { ...rawPrediction, id: "cash", date: "2026-06-25", direction: "DOWN", signal: "CASH", status: "pending" };
const resolvedCash = resolveForwardPrediction(cashPrediction, "2026-06-26T22:00:00Z", priceMap);
assert.ok(Math.abs(resolvedCash.actualReturn - -0.02) < 1e-12);
assert.strictEqual(resolvedCash.strategyReturn, 0);
assert.strictEqual(resolvedCash.correct, true);

const noNextDay = resolveForwardPrediction({ ...rawPrediction, date: "2026-06-26" }, "2026-06-27T00:00:00Z", priceMap);
assert.strictEqual(noNextDay, null);

const leaderboard = forwardLeaderboard([resolvedForward, { ...rawPrediction, status: "pending" }]);
assert.strictEqual(leaderboard.oracle.resolvedCount, 1);
assert.ok(Math.abs(leaderboard.oracle.totalReturn - 1.05) < 1e-12);

const imported = [];
const incoming = [rawPrediction, { ...rawPrediction }, { bad: true }];
let skipped = 0;
let invalid = 0;
incoming.forEach((row) => {
  if (!validImport(row)) {
    invalid += 1;
    return;
  }
  const key = `${row.date}|${row.oracle_id}|${row.asset}`;
  if (imported.some((item) => `${item.date}|${item.oracle_id}|${item.asset}` === key)) {
    skipped += 1;
    return;
  }
  imported.push(row);
});
assert.strictEqual(imported.length, 1);
assert.strictEqual(skipped, 1);
assert.strictEqual(invalid, 1);

const oracleIds = Array.from({ length: 100 }, (_, index) => `oracle_${String(index + 1).padStart(3, "0")}`);
const assets = ["SPY", "QQQ", "GLD"];
function generateBatch(existing, date) {
  let generated = 0;
  let skippedExisting = 0;
  oracleIds.forEach((oracleId) => assets.forEach((asset) => {
    const key = `${date}|${oracleId}|${asset}`;
    if (existing.has(key)) {
      skippedExisting += 1;
      return;
    }
    existing.add(key);
    generated += 1;
  }));
  return { generated, skippedExisting };
}

const existingBatch = new Set();
const firstBatch = generateBatch(existingBatch, "2026-06-26");
const duplicateBatch = generateBatch(existingBatch, "2026-06-26");
assert.strictEqual(firstBatch.generated, 300);
assert.strictEqual(firstBatch.skippedExisting, 0);
assert.strictEqual(duplicateBatch.generated, 0);
assert.strictEqual(duplicateBatch.skippedExisting, 300);

const appSource = fs.readFileSync(path.join(__dirname, "app.js"), "utf8");
const oracleNamesBlock = appSource.match(/const ORACLE_NAMES = \[([\s\S]*?)\];/);
assert.ok(oracleNamesBlock, "ORACLE_NAMES block should exist");
const oracleNames = [...oracleNamesBlock[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
assert.strictEqual(oracleNames.length, 100);
assert.strictEqual(new Set(oracleNames).size, 100);
assert.ok(appSource.includes('const confidence = isPureRandomGrandpa ? 0.5'));
assert.ok(appSource.includes("!isPureRandomGrandpa) score += bias"));
assert.ok(appSource.includes("topRows(state.leaderboard.league, state.leaderboard.metric, 100)"));
assert.ok(appSource.includes("sortRows(byOracle, sortMetric).slice(0, 100)"));
assert.ok(appSource.includes('id="leaderboard-race-chart"'));
assert.ok(appSource.includes('id="leaderboard-race-svg"'));
assert.ok(appSource.includes("function drawLeaderboardRaceChart"));
assert.ok(appSource.includes("function renderLeaderboardRaceSvg"));
assert.ok(appSource.includes("function leaderboardRaceSvgMarkup"));
assert.ok(appSource.includes('raceMarkup = leaderboardRaceSvgMarkup(buildBacktestRaceSeries())'));

const pureRandomSignals = [];
const pureRandomDates = Array.from({ length: 260 }, (_, index) => {
  const d = new Date("2025-01-01T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + index);
  return d.toISOString().slice(0, 10);
});
pureRandomDates.forEach((date) => {
  assets.forEach((asset) => {
    const isBuy = rand(`${date}:${asset}:pure-random-grandpa`) > 0.5;
    pureRandomSignals.push(isBuy ? "BUY" : "CASH");
  });
});
const pureRandomBuyRatio = pureRandomSignals.filter((signal) => signal === "BUY").length / pureRandomSignals.length;
assert.ok(pureRandomBuyRatio >= 0.40 && pureRandomBuyRatio <= 0.60, `pure random BUY ratio ${pureRandomBuyRatio}`);

assert.strictEqual(parseCorrectValue("true"), true);
assert.strictEqual(parseCorrectValue("FALSE"), false);
assert.strictEqual(parseCorrectValue("tie"), null);
assert.strictEqual(parseCorrectValue("maybe"), null);
assert.strictEqual(escapeHtml('<img src=x onerror="alert(1)">'), "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");

const forwardRows = [
  { status: "resolved", league: "Stock League", strategyReturn: 0.10 },
  { status: "resolved", league: "Tech League", strategyReturn: 0.20 },
  { status: "resolved", league: "Gold League", strategyReturn: -0.05 },
];
const grandAverage = forwardGrandAverage(forwardRows);
const sequentialCompound = forwardRows.reduce((acc, row) => acc * (1 + row.strategyReturn), 1) - 1;
assert.ok(Math.abs(grandAverage - ((0.10 + 0.20 - 0.05) / 3)) < 1e-12);
assert.ok(Math.abs(grandAverage - sequentialCompound) > 1e-3);

assert.strictEqual(canDrawLineSeries([]), false);
assert.strictEqual(canDrawLineSeries([{ points: [] }, { points: [{ value: NaN }] }]), false);
assert.strictEqual(canDrawLineSeries([{ points: [{ value: 1 }, { value: 1.01 }] }]), true);

function loadAppAuditApi() {
  const sandbox = {
    console,
    fetch: async () => ({ ok: false, text: async () => "" }),
    localStorage: { getItem: () => null, setItem: () => undefined, removeItem: () => undefined },
    window: { devicePixelRatio: 1, innerWidth: 1200, innerHeight: 800 },
    document: {
      getElementById: () => ({ innerHTML: "", textContent: "", addEventListener: () => undefined, classList: { toggle: () => undefined } }),
      querySelectorAll: () => [],
      body: { appendChild: () => undefined, addEventListener: () => undefined },
      createElement: () => ({ click: () => undefined, remove: () => undefined, style: {} }),
    },
    requestAnimationFrame: () => undefined,
    URL: { createObjectURL: () => "", revokeObjectURL: () => undefined },
    Blob: function Blob() {},
    FileReader: function FileReader() {},
    alert: () => undefined,
    confirm: () => true,
  };
  const source = appSource.replace(/\ninitApp\(\);\s*$/, `
globalThis.__oracleArenaAudit = {
  ASSETS,
  FAMILY_NAMES,
  makeOracles,
  businessDays,
  generatePrices,
  fibonacciLike,
  priceContext,
  atrRatio,
  rsi,
  recentHigh,
  omenDirection,
  setEnvironment(nextDays, nextPrices) {
    days = nextDays;
    prices = nextPrices;
    oracles = makeOracles();
  },
  getOracles() { return oracles; },
  getPrices() { return prices; },
};
`);
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: "app.js" });
  return sandbox.__oracleArenaAudit;
}

function runOracleSignalAudit() {
  const api = loadAppAuditApi();
  const auditDays = api.businessDays("2021-01-04", "2026-06-25");
  const auditPrices = api.generatePrices(auditDays);
  api.setEnvironment(auditDays, auditPrices);
  const appOracles = api.getOracles();
  assert.strictEqual(appOracles.length, 100);
  assert.strictEqual(new Set(appOracles.map((oracle) => oracle.id)).size, 100);
  assert.strictEqual(new Set(appOracles.map((oracle) => oracle.name)).size, 100);

  const fibonacciTrueCount = Array.from({ length: 366 }, (_, index) => index + 1)
    .filter((day) => api.fibonacciLike(day)).length;
  assert.ok(fibonacciTrueCount > 0 && fibonacciTrueCount < 366, `fibonacciLike true count ${fibonacciTrueCount}`);
  assert.ok(fibonacciTrueCount >= 10 && fibonacciTrueCount <= 200, `fibonacciLike true count should be non-extreme, got ${fibonacciTrueCount}`);

  const suspicious = [];
  const assetReports = [];
  const combinedByOracle = new Map();
  const indicatorFailures = [];
  const warmup = 20;

  for (const oracle of appOracles) {
    combinedByOracle.set(oracle.id, {
      oracle,
      buyCount: 0,
      cashCount: 0,
      totalCount: 0,
      assetRatios: {},
    });

    for (const asset of api.ASSETS) {
      const stats = {
        oracle,
        asset,
        buyCount: 0,
        cashCount: 0,
        totalCount: 0,
        minConfidence: Infinity,
        maxConfidence: -Infinity,
        invalidDirectionCount: 0,
        invalidSignalCount: 0,
        invalidPositionSizeCount: 0,
        invalidConfidenceCount: 0,
        emptyRawOutputCount: 0,
        emptyInterpretationCount: 0,
      };

      for (let dateIndex = warmup; dateIndex < auditDays.length - 1; dateIndex += 1) {
        const prediction = api.omenDirection(oracle, asset, auditDays[dateIndex], dateIndex);
        stats.totalCount += 1;
        stats.buyCount += prediction.signal === "BUY" ? 1 : 0;
        stats.cashCount += prediction.signal === "CASH" ? 1 : 0;
        stats.invalidDirectionCount += ["UP", "DOWN"].includes(prediction.direction) ? 0 : 1;
        stats.invalidSignalCount += ["BUY", "CASH"].includes(prediction.signal) ? 0 : 1;
        stats.invalidPositionSizeCount += [0, 1].includes(prediction.position_size) ? 0 : 1;
        stats.invalidConfidenceCount += Number.isFinite(prediction.confidence) && prediction.confidence >= 0.50 && prediction.confidence <= 0.75 ? 0 : 1;
        stats.emptyRawOutputCount += typeof prediction.raw_output === "string" && prediction.raw_output.trim() ? 0 : 1;
        stats.emptyInterpretationCount += typeof prediction.interpretation === "string" && prediction.interpretation.trim() ? 0 : 1;
        stats.minConfidence = Math.min(stats.minConfidence, prediction.confidence);
        stats.maxConfidence = Math.max(stats.maxConfidence, prediction.confidence);

        if (oracle.index === 69) assert.strictEqual(prediction.confidence, 0.5);
      }

      const buyRatio = stats.buyCount / stats.totalCount;
      stats.buyRatio = buyRatio;
      assetReports.push(stats);

      const combined = combinedByOracle.get(oracle.id);
      combined.buyCount += stats.buyCount;
      combined.cashCount += stats.cashCount;
      combined.totalCount += stats.totalCount;
      combined.assetRatios[asset.symbol] = buyRatio;

      const schemaErrors = [
        stats.invalidDirectionCount,
        stats.invalidSignalCount,
        stats.invalidPositionSizeCount,
        stats.invalidConfidenceCount,
        stats.emptyRawOutputCount,
        stats.emptyInterpretationCount,
      ].reduce((sum, count) => sum + count, 0);

      let reason = "";
      if (stats.totalCount === 0) reason = "no predictions";
      else if (schemaErrors) reason = "invalid output schema";
      else if (stats.buyCount === stats.totalCount) reason = "constant BUY";
      else if (stats.cashCount === stats.totalCount) reason = "constant CASH";
      else if (buyRatio > 0.95) reason = "BUY ratio > 95%";
      else if (buyRatio < 0.05) reason = "BUY ratio < 5%";
      if (reason) suspicious.push({ ...stats, reason });

      assert.ok(stats.totalCount > 0);
      assert.strictEqual(schemaErrors, 0, `${oracle.index} ${oracle.name} ${asset.symbol} schema errors`);
      assert.ok(buyRatio > 0 && buyRatio < 1, `${oracle.index} ${oracle.name} ${asset.symbol} constant signal`);
      assert.ok(buyRatio >= 0.05 && buyRatio <= 0.95, `${oracle.index} ${oracle.name} ${asset.symbol} extreme BUY ratio ${buyRatio}`);
    }
  }

  const oracle18Reports = assetReports.filter((report) => report.oracle.index === 18);
  assert.strictEqual(oracle18Reports.length, 3);
  oracle18Reports.forEach((report) => {
    assert.ok(report.buyCount > 0 && report.cashCount > 0, `#18 must have BUY and CASH for ${report.asset.symbol}`);
  });

  const oracle69Reports = assetReports.filter((report) => report.oracle.index === 69);
  const oracle69BuyRatio = oracle69Reports.reduce((sum, report) => sum + report.buyCount, 0)
    / oracle69Reports.reduce((sum, report) => sum + report.totalCount, 0);
  assert.ok(oracle69BuyRatio >= 0.40 && oracle69BuyRatio <= 0.60, `#69 BUY ratio ${oracle69BuyRatio}`);
  assert.strictEqual(appOracles.find((oracle) => oracle.index === 69).usesPriceData, false);

  const combinedSuspicious = [];
  for (const combined of combinedByOracle.values()) {
    const buyRatio = combined.buyCount / combined.totalCount;
    if (combined.buyCount === combined.totalCount) combinedSuspicious.push({ combined, reason: "combined constant BUY" });
    if (combined.cashCount === combined.totalCount) combinedSuspicious.push({ combined, reason: "combined constant CASH" });
    if (Object.values(combined.assetRatios).every((ratio) => ratio === 1)) combinedSuspicious.push({ combined, reason: "all assets constant BUY" });
    if (Object.values(combined.assetRatios).every((ratio) => ratio === 0)) combinedSuspicious.push({ combined, reason: "all assets constant CASH" });
    assert.ok(buyRatio > 0 && buyRatio < 1, `${combined.oracle.index} ${combined.oracle.name} combined constant signal`);
  }
  assert.strictEqual(combinedSuspicious.length, 0);

  for (const asset of api.ASSETS) {
    for (let dateIndex = 0; dateIndex < auditDays.length; dateIndex += 1) {
      const context = api.priceContext(asset, dateIndex);
      const indicators = [
        context.close,
        context.oneDay,
        context.threeDay,
        context.fiveDay,
        context.twentyDay,
        context.dayOfYear,
        api.atrRatio(asset, dateIndex),
        api.rsi(asset, dateIndex),
        api.recentHigh(asset, dateIndex),
      ];
      if (!indicators.every(Number.isFinite)) {
        indicatorFailures.push({ asset: asset.symbol, dateIndex, indicators });
      }
    }
  }
  assert.deepStrictEqual(indicatorFailures, []);

  const riskyReports = assetReports.filter((report) => report.oracle.index >= 91 && report.oracle.index <= 100);
  riskyReports.forEach((report) => {
    assert.ok(report.buyRatio >= 0.05 && report.buyRatio <= 0.95, `#${report.oracle.index} ${report.asset.symbol} chart-shadow extreme`);
  });

  const riskySource = appSource.slice(appSource.indexOf("function priceContext"), appSource.indexOf("function maxDrawdown"));
  const riskyPatterns = [
    /%\s*1\s*={2,3}\s*0/,
    /\[[^\]]*\b1\b[^\]]*\]\.some\([^)]*%\s*\w+\s*={2,3}\s*0/s,
    /\[\s*dateIndex\s*\+\s*1\s*\]/,
    /Math\.max\(\s*\.\.\.[^)]+slice\([^)]*\)\.map/s,
  ];
  riskyPatterns.forEach((pattern) => {
    assert.ok(!pattern.test(riskySource), `Risky oracle-rule pattern found: ${pattern}`);
  });

  const reportLines = assetReports.map((report) => {
    const buyPct = (report.buyRatio * 100).toFixed(1);
    const cashPct = (100 - report.buyRatio * 100).toFixed(1);
    return `#${String(report.oracle.index).padStart(3, "0")} ${report.oracle.name} | ${report.asset.symbol} BUY ${buyPct}% CASH ${cashPct}% OK`;
  });

  console.log("Oracle Signal Audit");
  console.log(reportLines.join("\n"));
  if (suspicious.length) {
    console.log("Suspicious BUY ratio:");
    suspicious.forEach((item) => {
      console.log(`#${String(item.oracle.index).padStart(3, "0")} ${item.oracle.name} | ${item.oracle.family} | ${item.asset.symbol} | BUY ${item.buyCount} / CASH ${item.cashCount} | ${(item.buyRatio * 100).toFixed(1)}% | ${item.reason}`);
    });
  } else {
    console.log("Oracle signal audit passed. No constant BUY/CASH oracles found.");
    console.log("No oracle has BUY ratio > 95% or < 5%.");
  }

  return { oracle69BuyRatio, fibonacciTrueCount, suspiciousCount: suspicious.length };
}

const audit = runOracleSignalAudit();
console.log(`Oracle Arena verification passed. Pure random BUY ratio: ${(audit.oracle69BuyRatio * 100).toFixed(1)}%. Fibonacci true days/year: ${audit.fibonacciTrueCount}.`);
