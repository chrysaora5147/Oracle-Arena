# Oracle Arena

Oracle Arena is an experimental symbolic-market-prediction tournament. One hundred oracle schools compete across three leagues: SPY, QQQ, and GLD. Each oracle produces a standardized 1D prediction and maps it to BUY or CASH only. The app supports backtests, forward tests, deterministic synthetic data, real CSV data, champion cards, local forward-log backups, and static deployment.

Oracle Arena is an experimental statistics and entertainment project. It is not financial advice.

## Live / Local Usage

Run locally:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:4174/
```

Update and verify price snapshots:

```bash
npm run prices:update
npm run prices:verify
npm run check
```

## Data Modes

- Synthetic deterministic data: offline demo and system validation. Results do not represent real market performance.
- Real CSV data: loaded from `data/prices/SPY.csv`, `data/prices/QQQ.csv`, and `data/prices/GLD.csv`.
- Auto fallback: if any CSV is missing or invalid, the whole app falls back to synthetic mode. Real and synthetic assets are never mixed in one run.

## Price Update Workflow

The price updater uses the no-key Yahoo Finance chart endpoint:

```bash
npm run prices:update
npm run prices:verify
```

It writes:

```text
data/prices/SPY.csv
data/prices/QQQ.csv
data/prices/GLD.csv
```

Required CSV format:

```csv
date,open,high,low,close,adjClose,volume
2026-06-25,738.90,739.37,729.60,734.30,734.30,53934400
```

The script safe-writes by merging rows, deduplicating dates, sorting ascending, validating, writing a temp file, and replacing the original only after validation. If the endpoint returns adjusted close, `adjClose` uses it; otherwise the script falls back to `close`.

## Automatic Price Updates

GitHub Actions runs `.github/workflows/update-prices.yml` automatically on weekdays at `23:30 UTC`, intentionally after the regular US market close. The workflow:

1. Runs `node scripts/update-prices.js`.
2. Runs `node scripts/verify-prices.js`.
3. Commits changed `data/prices/*.csv` files.
4. Pushes to `main`.
5. Lets Vercel's Git integration redeploy the static site from the new CSV snapshot.

This is a daily snapshot update, not a real-time price feed.

## Daily Tournament Workflow

1. Update prices: `npm run prices:update`.
2. Verify prices: `npm run prices:verify`.
3. Open or reload the app.
4. Confirm Real CSV Data mode.
5. Generate the latest-price-date forward batch.
6. Export a forward backup.
7. Next trading day, update and verify prices again.
8. Reload the app.
9. Resolve pending predictions.
10. Check Forward Leaderboard.
11. Export backup again.

## Deployment

This is a static app. Vercel can deploy the folder directly.

- Framework preset: Other
- Build command: blank
- Output directory: `.`
- Runtime backend: none

The deployed site uses the committed CSV snapshot. The included GitHub Actions workflow can update the CSV snapshot on weekdays and trigger a Vercel redeploy through Git integration.

## Methodology

- Prediction date `t` is scored on next trading date `t+1`.
- `assetReturn = adjClose[t+1] / adjClose[t] - 1`
- BUY receives `assetReturn`.
- CASH receives `0`.
- SHORT is not used.
- Benchmark is buy-and-hold over the same window.
- UP is correct when asset return is positive.
- DOWN is correct when asset return is negative.
- Exact zero-return days are treated as ties and excluded from accuracy.
- Max drawdown is calculated from the strategy equity curve.
- Sharpe uses daily strategy returns annualized by `sqrt(252)`.
- Exposure is BUY days divided by prediction days.
- Grand Score combines return, accuracy, drawdown, and consistency.

## Forward Test Notes

- Forward predictions are stored in browser `localStorage`.
- Each record has `createdAt`, `status`, and immutable raw prediction fields.
- Existing `date + oracle + asset` predictions are not overwritten.
- Pending predictions resolve only when both prediction-date and next-trading-date prices exist.
- Resolution adds `actualReturn`, `benchmarkReturn`, `strategyReturn`, `correct`, `resultDate`, and `resolvedAt`.
- Forward leaderboard is separate from backtest and uses resolved predictions only.
- Export JSON backups regularly. localStorage is browser-specific and can be cleared.

## Champion Archive

The Home dashboard shows champion archive cards. Backtest champions use all-time and rolling period data. Forward champions use resolved forward predictions only. If resolved forward data is sparse, the UI shows that there is not enough data yet.

## Verification

Run:

```bash
npm run check
npm run prices:verify
```

Direct commands:

```bash
node --check app.js
node verify-engine.js
node --check scripts/update-prices.js
node --check scripts/verify-prices.js
node scripts/verify-prices.js
```

Manual smoke checklist:

1. App opens.
2. Data Settings shows Synthetic or Real CSV mode.
3. Price verification passes when CSV files exist.
4. Forward batch creates up to 300 predictions and skips duplicates.
5. Pending rows stay pending when next trading day price is absent.
6. Resolver adds result fields when next trading day price exists.
7. Raw prediction fields remain unchanged.
8. Forward leaderboard uses resolved predictions only.
9. Champion Archive renders.
10. Prediction Log filters by mode, league, family, signal, correctness, and date range.
11. Export/import safe merge reports imported, skipped duplicates, and invalid rows.

## Limitations

- Not financial advice.
- Past performance does not guarantee future results.
- Synthetic data is not real market performance.
- Backtests can overfit.
- With 100 oracles, some winners may be luck.
- Yahoo Finance or any public price source may fail, lag, or change format.
- CSV data quality directly affects results.
- localStorage can be lost.
- Prices update through GitHub Actions on a weekday schedule, not continuously or intraday.

## Next Steps

- Supabase or persistent forward storage.
- Automated forward batch creation.
- Public champion archive pages.
- More leagues or boss battles.
- Social share images.
