const assert = require("assert");

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

console.log("Oracle Arena engine and forward resolver verification passed.");
