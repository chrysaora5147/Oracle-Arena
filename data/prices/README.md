# Price CSV Snapshots

Oracle Arena loads real market data from this folder when all three files are present and valid:

- `SPY.csv`
- `QQQ.csv`
- `GLD.csv`

Required format:

```csv
date,open,high,low,close,adjClose,volume
2026-06-25,738.90,739.37,729.60,734.30,734.30,53934400
```

Use:

```bash
npm run prices:update
npm run prices:verify
```

The current update script uses the no-key Yahoo Finance chart endpoint. It writes adjusted close when the endpoint returns it; otherwise it falls back to close. The deployed site uses whatever CSV snapshot is committed.
