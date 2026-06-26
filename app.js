const ASSETS = [
  { symbol: "SPY", name: "S&P 500 ETF", league: "Stock League", drift: 0.00034, vol: 0.010, start: 372 },
  { symbol: "QQQ", name: "Nasdaq 100 ETF", league: "Tech League", drift: 0.00041, vol: 0.014, start: 309 },
  { symbol: "GLD", name: "Gold ETF", league: "Gold League", drift: 0.00018, vol: 0.009, start: 174 },
];

const FAMILY_NAMES = [
  "Tarot", "Numerology", "Moon & Time", "I Ching", "Runes",
  "Siam Si", "Pendulum & Ritual Random", "Four Elements", "Animal Omens", "Disguised Chart Shadows",
];

const ORACLE_NAMES = [
  "ไพ่เดี่ยวสุริยัน", "ไพ่สามกาล Past-Present-Future", "ไพ่กลับหัวพิพากษา", "สำนัก Major Arcana เท่านั้น", "ไพ่ Minor ตลาดรายวัน",
  "ไพ่ถ้วยแห่งสภาพคล่อง", "ไพ่ดาบแห่งความผันผวน", "ไพ่เหรียญแห่งมูลค่า", "ไพ่ไม้เท้าแห่งโมเมนตัม", "หอคอยเตือนภัย",
  "เลขวันชะตาตลาด", "เลขเดือนนำทาง", "เลขท้ายราคาปิด", "ผลรวมราคาปิด", "เลข ticker วิญญาณหุ้น",
  "เลขลำดับวันของปี", "เลขคู่คี่พยากรณ์", "เลข Fibonacci พิธีกรรม", "เลข 7 วันศักดิ์สิทธิ์", "เลข 9 มังกรทอง",
  "นักพรตข้างขึ้น", "นักพรตข้างแรม", "จันทร์เต็มดวง", "จันทร์มืด", "วันจันทร์เปิดประตู",
  "วันศุกร์ปิดเวที", "ต้นเดือนรับพร", "กลางเดือนเขย่าใจ", "สิ้นเดือนเก็บเหรียญ", "ฤดูกาลสี่ทิศ",
  "หกเส้นหยินหยาง", "เส้นเปลี่ยนสะเทือนฟ้า", "Hexagram แรกนำทาง", "Hexagram ที่สองบอกอนาคต", "หยางมากให้บุก",
  "หยินมากให้ถอย", "สามเส้นบนฟ้า", "สามเส้นล่างดิน", "สายฟ้าในก้นบ่อ", "น้ำเหนือภูเขา",
  "รูนแห่งทรัพย์", "รูนแห่งน้ำแข็ง", "รูนแห่งการเดินทาง", "รูนแห่งพายุลูกเห็บ", "รูนแห่งการเก็บเกี่ยว",
  "รูนแห่งไฟเริ่มต้น", "รูนแห่งการป้องกัน", "รูนแห่งชะตาเปิด", "รูนสามตัว", "รูนกลับหัว",
  "เซียมซีหนึ่งใบ", "เซียมซีสามใบ", "เซียมซีเลขสูง", "เซียมซีเลขต่ำ", "เซียมซีมังกร",
  "เซียมซีเต่าแก่", "เซียมซีเสี่ยงรักตลาด", "เซียมซีวัดกลางคืน", "เซียมซีใบซ้ำ", "เซียมซีร้อยคำทำนาย",
  "ลูกตุ้มตามเข็ม", "ลูกตุ้มทวนเข็ม", "ลูกเต๋าสามหน้า", "เหรียญสามครั้ง", "เหรียญเจ็ดครั้ง",
  "วงล้อหมอดู", "สุ่มสุริยัน", "สุ่มจันทรา", "ปู่สุ่มบริสุทธิ์", "ยายสุ่มไม่สนโลก",
  "ธาตุไฟบุกตลาด", "ธาตุน้ำรอดู", "ธาตุลมเปลี่ยนทิศ", "ธาตุดินถือยาว", "ไฟชนะน้ำ",
  "น้ำกลบไฟ", "ลมพัดราคา", "ดินหนักไม่ขยับ", "ธาตุผสมสองชั้น", "ธาตุแตกสมดุล",
  "แมวดำข้ามกราฟ", "นกฮูกมองกลางคืน", "มังกรทองคำราม", "งูเปลี่ยนคราบ", "อีกาบอกข่าวร้าย",
  "กระต่ายกระโดดราคา", "เต่าถือเงินสด", "หมาป่าล่าเทรนด์", "ปลาวาฬกลืนแท่งเทียน", "จิ้งจอกหลอกตลาด",
  "ลูกแก้วโมเมนตัม 1 วัน", "ลูกแก้วโมเมนตัม 3 วัน", "กระจกย้อนกลับ 1 วัน", "กระจกย้อนกลับ 5 วัน", "เมฆ ATR ผันผวน",
  "วิญญาณเส้นค่าเฉลี่ย", "เสียงกระซิบ RSI", "เงาแท่งเทียนแดงเขียว", "ประตู Breakout", "หลุมพราง False Signal",
];

const OmenBanks = {
  Tarot: ["The Sun", "The Tower", "The Star", "Wheel of Fortune", "Two of Cups", "Nine of Swords", "Ace of Wands"],
  Numerology: ["เลข 1", "เลข 3", "เลข 6", "เลข 8", "เลข 2", "เลข 5", "เลข 9"],
  "Moon & Time": ["Waxing Moon", "Full Moon", "Dark Moon", "Friday Bell", "Month Gate", "Season Turn"],
  "I Ching": ["Hexagram 1", "Hexagram 2", "Hexagram 34", "Hexagram 51", "Changing Lines 3", "Mountain over Water"],
  Runes: ["Fehu", "Isa", "Raidho", "Hagalaz", "Jera", "Kenaz", "Algiz"],
  "Siam Si": ["เซียมซีใบ 6", "เซียมซีใบ 13", "เซียมซีใบ 24", "เซียมซีใบ 42", "เซียมซีใบซ้ำ"],
  "Pendulum & Ritual Random": ["หมุนตามเข็ม", "หมุนทวนเข็ม", "เหรียญด้านสุริยัน", "เหรียญด้านจันทร์", "วงล้อหยุดนิ่ง"],
  "Four Elements": ["ไฟนำ", "น้ำรั้ง", "ลมเปลี่ยน", "ดินนิ่ง", "ธาตุผสม"],
  "Animal Omens": ["กราฟถูกข้าม", "ดวงตากลางคืน", "เสียงคำรามทอง", "คราบใหม่", "ข่าวร้ายบนเสา"],
  "Disguised Chart Shadows": ["Momentum pulse", "Mean reversion mirror", "ATR cloud", "RSI whisper", "Breakout gate"],
};

const state = {
  view: "home",
  leaderboard: { league: "Grand", period: "All-time", metric: "grandScore", mode: "Backtest" },
  league: "Stock League",
  oracleId: "tarot_001",
  logSearch: "",
  logLeague: "All",
  logMode: "All",
  logFamily: "All",
  logSignal: "All",
  logCorrect: "All",
  logRange: "All Dates",
  forwardOracle: "All",
  forwardSearch: "",
  forwardFamily: "All",
  forwardSignal: "All",
  forwardStatus: "Resolved",
  forwardRange: "All Forward",
};

const FORWARD_KEY = "oracle-arena-forward-log-v1";
const MIN_BACKTEST_DAYS = 80;
const EPS = 1e-10;

let oracles = [];
let days = [];
let prices = {};
let perf = { leagueRows: [], grandRows: [], predictions: [], curves: new Map(), periods: {} };
let forwardLog = [];
let leaderboardRaceFrame = 0;
let dataStatus = {
  mode: "Loading",
  assetCount: 0,
  startDate: "",
  endDate: "",
  tradingDays: 0,
  warnings: ["Loading price data..."],
  sourceMessage: "Checking data/prices CSV files.",
};

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

function normal(seed) {
  const u1 = Math.max(0.000001, rand(`${seed}:a`));
  const u2 = Math.max(0.000001, rand(`${seed}:b`));
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function fmtPct(value, digits = 1) {
  if (!Number.isFinite(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${(value * 100).toFixed(digits)}%`;
}

function fmtNum(value, digits = 2) {
  return Number.isFinite(value) ? Number(value).toFixed(digits) : "—";
}

function metricLabel(metric) {
  return {
    grandScore: "Grand Score",
    totalReturn: "Total Return",
    accuracy: "Accuracy",
    maxDrawdown: "Max Drawdown",
    sharpe: "Sharpe",
  }[metric] || metric;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function makeOracles() {
  return ORACLE_NAMES.map((name, idx) => {
    const n = idx + 1;
    const family = FAMILY_NAMES[Math.floor(idx / 10)];
    const slug = family.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    return {
      id: `${slug}_${String(n).padStart(3, "0")}`,
      index: n,
      name,
      family,
      description: `สำนักลำดับที่ ${n} จากตระกูล ${family} แปลงลางเชิงสัญลักษณ์เป็นสัญญาณ BUY/CASH แบบตรวจสอบย้อนหลังได้`,
      ruleDescription: n <= 90
        ? "ใช้ seed จาก date + asset + oracle_id เพื่อเลือก raw omen แล้ว map เป็น UP/DOWN แบบ deterministic"
        : "ใช้ข้อมูลราคาที่รู้ถึงวันทำนายเท่านั้น เช่น momentum, mean reversion, volatility หรือ breakout",
      usesPriceData: n > 90,
      usesExternalNews: false,
      allowedAssets: ["SPY", "QQQ", "GLD"],
    };
  });
}

function businessDays(start, end) {
  const out = [];
  const d = new Date(`${start}T00:00:00`);
  const last = new Date(`${end}T00:00:00`);
  while (d <= last) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) out.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

function generatePrices(days) {
  const prices = {};
  ASSETS.forEach((asset) => {
    let close = asset.start;
    prices[asset.symbol] = days.map((date, i) => {
      const shock = normal(`${asset.symbol}:${date}`) * asset.vol;
      const cycle = Math.sin(i / 37 + asset.symbol.length) * asset.vol * 0.25;
      const returnValue = asset.drift + shock + cycle;
      close = Math.max(20, close * (1 + returnValue));
      const intraday = Math.abs(normal(`${asset.symbol}:${date}:intra`)) * asset.vol * close;
      return {
        date,
        open: close * (1 - returnValue * 0.4),
        high: close + intraday,
        low: Math.max(1, close - intraday),
        close,
        adjustedClose: close,
        volume: Math.round(20_000_000 + rand(`${asset.symbol}:${date}:vol`) * 75_000_000),
      };
    });
  });
  return prices;
}

async function loadPriceEnvironment() {
  const syntheticDays = businessDays("2021-01-04", "2026-06-25");
  const syntheticPrices = generatePrices(syntheticDays);
  const realResult = await tryLoadRealCsvPrices();
  if (!realResult.ok) {
    return {
      days: syntheticDays,
      prices: syntheticPrices,
      status: {
        mode: "Synthetic Data",
        assetCount: ASSETS.length,
        startDate: syntheticDays[0],
        endDate: syntheticDays[syntheticDays.length - 1],
        tradingDays: syntheticDays.length,
        warnings: realResult.warnings,
        sourceMessage: "Synthetic deterministic prices are used for system validation only. Results do not represent real market performance.",
      },
    };
  }
  return {
    days: realResult.days,
    prices: realResult.prices,
    status: {
      mode: "Real CSV Data",
      assetCount: ASSETS.length,
      startDate: realResult.days[0],
      endDate: realResult.days[realResult.days.length - 1],
      tradingDays: realResult.days.length,
      warnings: realResult.warnings,
      sourceMessage: "Real CSV prices loaded locally. Results depend on the provided data files.",
    },
  };
}

async function tryLoadRealCsvPrices() {
  const warnings = [];
  const loaded = {};

  for (const asset of ASSETS) {
    try {
      const response = await fetch(`data/prices/${asset.symbol}.csv`, { cache: "no-store" });
      if (!response.ok) {
        warnings.push(`${asset.symbol}.csv not found or not readable; using synthetic data for all assets.`);
        return { ok: false, warnings };
      }
      const csvText = await response.text();
      const parsed = parsePriceCsv(csvText, asset.symbol);
      warnings.push(...parsed.warnings);
      if (!parsed.ok) return { ok: false, warnings };
      loaded[asset.symbol] = parsed.rows;
    } catch (error) {
      warnings.push(`Could not load ${asset.symbol}.csv (${error.message}); using synthetic data for all assets.`);
      return { ok: false, warnings };
    }
  }

  const commonDates = intersectDates(ASSETS.map((asset) => loaded[asset.symbol].map((row) => row.date)));
  if (commonDates.length < MIN_BACKTEST_DAYS) {
    warnings.push(`Real CSV files share only ${commonDates.length} dates; need at least ${MIN_BACKTEST_DAYS}. Using synthetic data.`);
    return { ok: false, warnings };
  }

  const commonSet = new Set(commonDates);
  const aligned = {};
  ASSETS.forEach((asset) => {
    aligned[asset.symbol] = loaded[asset.symbol].filter((row) => commonSet.has(row.date));
  });

  if (warnings.length === 0) warnings.push("CSV validation passed for all assets.");
  return { ok: true, days: commonDates, prices: aligned, warnings };
}

function parsePriceCsv(csvText, symbol) {
  const warnings = [];
  const lines = csvText.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < MIN_BACKTEST_DAYS + 1) {
    return { ok: false, rows: [], warnings: [`${symbol}.csv has too few rows for backtesting.`] };
  }

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
  if (index.date < 0 || index.close < 0) {
    return { ok: false, rows: [], warnings: [`${symbol}.csv must include date and close columns.`] };
  }

  const seen = new Set();
  const rows = [];
  for (let i = 1; i < lines.length; i += 1) {
    const parts = splitCsvLine(lines[i]);
    const date = normalizeDate(parts[index.date]);
    const close = numeric(parts[index.close]);
    const adjClose = index.adjClose >= 0 ? numeric(parts[index.adjClose]) : close;
    if (!date || !Number.isFinite(adjClose) || !Number.isFinite(close)) {
      warnings.push(`${symbol}.csv row ${i + 1} skipped because date or price is invalid.`);
      continue;
    }
    if (seen.has(date)) {
      return { ok: false, rows: [], warnings: [`${symbol}.csv has duplicate date ${date}.`] };
    }
    seen.add(date);
    rows.push({
      date,
      open: valueOr(index.open >= 0 ? numeric(parts[index.open]) : close, close),
      high: valueOr(index.high >= 0 ? numeric(parts[index.high]) : close, close),
      low: valueOr(index.low >= 0 ? numeric(parts[index.low]) : close, close),
      close,
      adjustedClose: adjClose,
      adjClose,
      volume: index.volume >= 0 ? numeric(parts[index.volume]) : undefined,
    });
  }

  rows.sort((a, b) => a.date.localeCompare(b.date));
  if (rows.length < MIN_BACKTEST_DAYS) {
    return { ok: false, rows: [], warnings: [`${symbol}.csv has only ${rows.length} valid rows after validation.`] };
  }
  return { ok: true, rows, warnings };
}

function splitCsvLine(line) {
  const out = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === "\"") quoted = !quoted;
    else if (char === "," && !quoted) {
      out.push(current.trim());
      current = "";
    } else current += char;
  }
  out.push(current.trim());
  return out.map((value) => value.replace(/^"|"$/g, ""));
}

function normalizeHeader(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeDate(value) {
  const parsed = new Date(String(value || "").trim());
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
}

function numeric(value) {
  if (value == null || value === "") return NaN;
  return Number(String(value).replace(/,/g, ""));
}

function valueOr(value, fallback) {
  return Number.isFinite(value) ? value : fallback;
}

function finiteOr(value, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
}

function intersectDates(dateLists) {
  const [first, ...rest] = dateLists.map((list) => new Set(list));
  return [...first].filter((date) => rest.every((set) => set.has(date))).sort();
}

function priceContext(asset, dateIndex) {
  const series = prices[asset.symbol];
  const current = series?.[dateIndex] || series?.[0] || { date: "1970-01-01", adjustedClose: 1, close: 1 };
  const close = finiteOr(current.adjustedClose ?? current.adjClose ?? current.close, 1);
  const prior = finiteOr(series?.[Math.max(0, dateIndex - 1)]?.adjustedClose, close);
  const three = finiteOr(series?.[Math.max(0, dateIndex - 3)]?.adjustedClose, close);
  const five = finiteOr(series?.[Math.max(0, dateIndex - 5)]?.adjustedClose, close);
  const twenty = finiteOr(series?.[Math.max(0, dateIndex - 20)]?.adjustedClose, close);
  const safeRatio = (base) => base > 0 ? close / base - 1 : 0;
  return {
    close,
    oneDay: finiteOr(safeRatio(prior)),
    threeDay: finiteOr(safeRatio(three)),
    fiveDay: finiteOr(safeRatio(five)),
    twentyDay: finiteOr(safeRatio(twenty)),
    dayOfYear: Math.floor((new Date(`${current.date}T00:00:00`) - new Date(`${current.date.slice(0, 4)}-01-01T00:00:00`)) / 86400000) + 1,
  };
}

function digitsOfNumber(value) {
  return String(Math.abs(Math.round(value * 100))).split("").map(Number).filter(Number.isFinite);
}

function sumDigits(value) {
  return digitsOfNumber(value).reduce((sum, digit) => sum + digit, 0);
}

function tickerNumber(symbol) {
  return symbol.split("").reduce((sum, char) => sum + char.charCodeAt(0) - 64, 0);
}

function fibonacciLike(value) {
  return [5, 8, 13, 21, 34, 55, 89].some((n) => value % n === 0);
}

function atrRatio(asset, dateIndex, window = 14) {
  const series = prices[asset.symbol];
  if (!series?.length) return 0;
  const start = Math.max(1, dateIndex - window + 1);
  const ranges = [];
  for (let i = start; i <= dateIndex; i += 1) {
    const bar = series[i];
    const prevClose = finiteOr(series[i - 1]?.adjustedClose, bar?.adjustedClose ?? 1);
    const trueRange = Math.max(
      finiteOr(bar?.high - bar?.low),
      Math.abs(finiteOr(bar?.high, prevClose) - prevClose),
      Math.abs(finiteOr(bar?.low, prevClose) - prevClose),
    );
    const close = finiteOr(bar?.adjustedClose, prevClose);
    ranges.push(close > 0 ? trueRange / close : 0);
  }
  return finiteOr(average(ranges));
}

function rsi(asset, dateIndex, window = 14) {
  const series = prices[asset.symbol];
  if (!series?.length || dateIndex <= 0) return 50;
  const start = Math.max(1, dateIndex - window + 1);
  let gains = 0;
  let losses = 0;
  for (let i = start; i <= dateIndex; i += 1) {
    const prior = finiteOr(series[i - 1]?.adjustedClose, series[i]?.adjustedClose ?? 1);
    const close = finiteOr(series[i]?.adjustedClose, prior);
    const change = prior > 0 ? close / prior - 1 : 0;
    if (change >= 0) gains += change;
    else losses += Math.abs(change);
  }
  if (gains === 0 && losses === 0) return 50;
  if (losses === 0) return 100;
  const rs = gains / losses;
  return finiteOr(100 - (100 / (1 + rs)), 50);
}

function recentHigh(asset, dateIndex, window = 20) {
  const series = prices[asset.symbol];
  const current = series?.[dateIndex] || series?.[0];
  if (!current) return 0;
  const start = Math.max(0, dateIndex - window);
  const priorHighs = series.slice(start, dateIndex).map((bar) => bar.high).filter(Number.isFinite);
  if (!priorHighs.length) return finiteOr(current.high ?? current.adjustedClose ?? current.close, 0);
  return finiteOr(Math.max(...priorHighs), finiteOr(current.high ?? current.adjustedClose ?? current.close, 0));
}

function omenDirection(oracle, asset, date, dateIndex) {
  const bank = OmenBanks[oracle.family];
  const context = priceContext(asset, dateIndex);
  const isPureRandomGrandpa = oracle.family === "Pendulum & Ritual Random" && oracle.name === "ปู่สุ่มบริสุทธิ์";
  let score = rand(`${date}:${asset.symbol}:${oracle.id}:score`) - 0.5;
  let rawOutput = bank[Math.floor(rand(`${date}:${asset.symbol}:${oracle.id}:omen`) * bank.length)];

  if (oracle.family === "Numerology") {
    const digitSum = date.replaceAll("-", "").split("").reduce((sum, x) => sum + Number(x), 0);
    const month = Number(date.slice(5, 7));
    const lastCloseDigit = digitsOfNumber(context.close).at(-1) ?? 0;
    const closeDigitSum = sumDigits(context.close);
    const tickerValue = tickerNumber(asset.symbol);
    const dateDay = Number(date.slice(8, 10));
    const ruleIndex = oracle.index;
    if (ruleIndex === 11) {
      score = [1, 3, 6, 8].includes(digitSum % 10) ? 0.18 : -0.18;
      rawOutput = `ผลรวมเลขวันที่ ${digitSum}`;
    } else if (ruleIndex === 12) {
      score = [1, 4, 7, 10].includes(month) ? 0.16 : -0.16;
      rawOutput = `เลขเดือน ${month}`;
    } else if (ruleIndex === 13) {
      score = [0, 1, 3, 5, 8].includes(lastCloseDigit) ? 0.16 : -0.16;
      rawOutput = `เลขท้ายราคาปิด ${lastCloseDigit}`;
    } else if (ruleIndex === 14) {
      score = [2, 4, 6, 8].includes(closeDigitSum % 10) ? 0.17 : -0.17;
      rawOutput = `ผลรวมราคาปิด ${closeDigitSum}`;
    } else if (ruleIndex === 15) {
      score = (tickerValue + digitSum) % 2 === 0 ? 0.15 : -0.15;
      rawOutput = `เลข ticker ${tickerValue}`;
    } else if (ruleIndex === 16) {
      score = [1, 2, 3, 5, 8].includes(context.dayOfYear % 10) ? 0.16 : -0.16;
      rawOutput = `ลำดับวันของปี ${context.dayOfYear}`;
    } else if (ruleIndex === 17) {
      score = dateDay % 2 === 1 ? 0.14 : -0.14;
      rawOutput = `วัน${dateDay % 2 === 1 ? "คี่" : "คู่"} ${dateDay}`;
    } else if (ruleIndex === 18) {
      score = fibonacciLike(context.dayOfYear) ? 0.20 : -0.12;
      rawOutput = `Fibonacci day ${context.dayOfYear}`;
    } else if (ruleIndex === 19) {
      score = (context.dayOfYear + tickerValue) % 7 <= 2 ? 0.16 : -0.16;
      rawOutput = `รอบเลข 7 ค่า ${(context.dayOfYear + tickerValue) % 7}`;
    } else if (ruleIndex === 20) {
      score = (digitSum + tickerValue) % 9 <= 3 ? 0.18 : -0.18;
      rawOutput = `รอบเลข 9 ค่า ${(digitSum + tickerValue) % 9}`;
    }
  }

  if (oracle.family === "Moon & Time") {
    const d = new Date(`${date}T00:00:00`);
    score = Math.sin((context.dayOfYear + oracle.index) / 29.53 * Math.PI * 2) * 0.42;
    rawOutput = d.getDay() === 5 ? "Friday Bell" : rawOutput;
  }

  if (oracle.family === "I Ching") {
    const yangLines = Array.from({ length: 6 }, (_, i) => rand(`${date}:${asset.symbol}:${oracle.id}:line:${i}`) > 0.5).filter(Boolean).length;
    score = (yangLines - 3) / 6;
    rawOutput = `Hexagram with ${yangLines} yang lines`;
  }

  if (isPureRandomGrandpa) {
    score = rand(`${date}:${asset.symbol}:pure-random-grandpa`) > 0.5 ? 0.01 : -0.01;
    rawOutput = score > 0 ? "เหรียญตกด้านสุริยัน" : "เหรียญตกด้านจันทร์";
  }

  if (oracle.family === "Disguised Chart Shadows") {
    const n = oracle.index;
    if (n === 91) score = context.oneDay;
    if (n === 92) score = context.threeDay;
    if (n === 93) score = -context.oneDay;
    if (n === 94) score = -context.fiveDay;
    if (n === 95) {
      const atr = atrRatio(asset, dateIndex, 14);
      const longAtr = atrRatio(asset, dateIndex, 60);
      score = finiteOr((longAtr - atr) * 18);
      rawOutput = `ATR cloud short ${(atr * 100).toFixed(2)}% / long ${(longAtr * 100).toFixed(2)}%`;
    }
    if (n === 96) {
      const ma20 = average(prices[asset.symbol].slice(Math.max(0, dateIndex - 19), dateIndex + 1).map((bar) => bar.adjustedClose));
      score = context.close / ma20 - 1;
      rawOutput = `MA20 spirit ${context.close >= ma20 ? "above" : "below"}`;
    }
    if (n === 97) {
      const value = rsi(asset, dateIndex, 14);
      score = value < 35 ? 0.18 : value > 65 ? -0.18 : (50 - value) / 250;
      rawOutput = `RSI whisper ${value.toFixed(1)}`;
    }
    if (n === 98) {
      const bar = prices[asset.symbol][dateIndex];
      score = bar.close >= bar.open ? 0.14 : -0.14;
      rawOutput = bar.close >= bar.open ? "Green candle shadow" : "Red candle shadow";
    }
    if (n === 99) {
      const high = recentHigh(asset, dateIndex, 20);
      score = context.close > high ? 0.22 : context.twentyDay > 0 ? 0.08 : -0.12;
      rawOutput = `Breakout gate ${context.close > high ? "open" : "closed"}`;
    }
    if (n === 100) score = Math.abs(context.threeDay) > asset.vol * 2 ? -context.threeDay : context.threeDay;
  }

  const bias = ((oracle.index % 7) - 3) * 0.015 + (asset.symbol === "GLD" ? -0.012 : 0.012);
  if (!oracle.usesPriceData && !isPureRandomGrandpa) score += bias;
  const direction = score >= 0 ? "UP" : "DOWN";
  const signal = direction === "UP" ? "BUY" : "CASH";
  const confidence = isPureRandomGrandpa ? 0.5 : Math.min(0.75, Math.max(0.5, 0.5 + Math.abs(score) * 0.44));
  const interpretation = direction === "UP"
    ? "ลางชี้แรงส่งเชิงบวก ตลาดมีโอกาสเดินหน้าวันถัดไป"
    : "ลางเตือนให้ลดความเสี่ยง ตลาดมีโอกาสพักตัววันถัดไป";

  return {
    date,
    oracle_id: oracle.id,
    oracle_name: oracle.name,
    league: asset.league,
    asset: asset.symbol,
    horizon: "1D",
    raw_output: rawOutput,
    interpretation,
    direction,
    signal,
    confidence,
    position_size: signal === "BUY" ? 1.0 : 0.0,
  };
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

function computePerformance(oracles, days, startIndex = 20, periodLabel = "All-time", collectPredictions = true) {
  const predictions = [];
  const rows = [];
  const curves = new Map();

  oracles.forEach((oracle) => {
    ASSETS.forEach((asset) => {
      let equity = 1;
      let benchmark = 1;
      let winDays = 0;
      let tieDays = 0;
      let buyDays = 0;
      let cashDays = 0;
      let bestDay = { date: "", value: -Infinity };
      let worstDay = { date: "", value: Infinity };
      const strategyReturns = [];
      const effectiveStart = Math.max(20, startIndex);
      const equityCurve = [{ date: days[effectiveStart], value: 1 }];

      for (let i = effectiveStart; i < days.length - 1; i += 1) {
        const date = days[i];
        const nextDate = days[i + 1];
        const prediction = omenDirection(oracle, asset, date, i);
        const currentClose = prices[asset.symbol][i].adjustedClose;
        const nextClose = prices[asset.symbol][i + 1].adjustedClose;
        const actualReturn = nextClose / currentClose - 1;
        const strategyReturn = prediction.signal === "BUY" ? actualReturn : 0;
        const correct = actualReturn === 0
          ? null
          : (prediction.direction === "UP" && actualReturn > 0) || (prediction.direction === "DOWN" && actualReturn < 0);

        equity *= 1 + strategyReturn;
        benchmark *= 1 + actualReturn;
        winDays += correct ? 1 : 0;
        tieDays += correct === null ? 1 : 0;
        buyDays += prediction.signal === "BUY" ? 1 : 0;
        cashDays += prediction.signal === "CASH" ? 1 : 0;
        strategyReturns.push(strategyReturn);
        equityCurve.push({ date: nextDate, value: equity });

        if (strategyReturn > bestDay.value) bestDay = { date: nextDate, value: strategyReturn };
        if (strategyReturn < worstDay.value) worstDay = { date: nextDate, value: strategyReturn };

        if (collectPredictions && (i > days.length - 35 || rand(`${oracle.id}:${asset.symbol}:${date}:sample-log`) > 0.965)) {
          predictions.push({
            id: `${date}-${oracle.id}-${asset.symbol}`,
            ...prediction,
            actual_return: actualReturn,
            correct,
            strategy_return: strategyReturn,
            position_size: prediction.position_size,
            prediction_timestamp: `${date}T21:05:00Z`,
          });
        }
      }

      const totalDays = buyDays + cashDays;
      const scoredDays = totalDays - tieDays;
      rows.push({
        oracleId: oracle.id,
        oracleName: oracle.name,
        family: oracle.family,
        asset: asset.symbol,
        league: asset.league,
        period: periodLabel,
        mode: "Backtest",
        totalReturn: equity - 1,
        benchmarkReturn: benchmark - 1,
        excessReturn: equity - benchmark,
        accuracy: scoredDays > 0 ? winDays / scoredDays : 0,
        exposure: buyDays / totalDays,
        maxDrawdown: maxDrawdown(equityCurve.map((x) => x.value)),
        sharpe: sharpe(strategyReturns),
        buyDays,
        cashDays,
        winDays,
        tieDays,
        scoredDays,
        totalDays,
        bestDay,
        worstDay,
      });
      curves.set(`${oracle.id}:${asset.league}`, equityCurve);
    });
  });

  const grand = oracles.map((oracle) => {
    const leagueRows = rows.filter((row) => row.oracleId === oracle.id);
    const avgTotalReturn = average(leagueRows.map((x) => x.totalReturn));
    const avgAccuracy = average(leagueRows.map((x) => x.accuracy));
    const avgDrawdown = average(leagueRows.map((x) => x.maxDrawdown));
    const dispersion = stdev(leagueRows.map((x) => x.totalReturn));
    const returnScore = normalize(avgTotalReturn, -0.35, 1.1);
    const accuracyScore = normalize(avgAccuracy, 0.43, 0.58);
    const drawdownScore = normalize(avgDrawdown, -0.32, -0.02);
    const consistencyScore = 1 - normalize(dispersion, 0.02, 0.38);
    const grandScore = 0.5 * returnScore + 0.25 * accuracyScore + 0.15 * drawdownScore + 0.1 * consistencyScore;
    return {
      oracleId: oracle.id,
      oracleName: oracle.name,
      family: oracle.family,
      league: "Grand",
      asset: "SPY/QQQ/GLD",
      mode: "Backtest",
      period: periodLabel,
      totalReturn: avgTotalReturn,
      benchmarkReturn: average(leagueRows.map((x) => x.benchmarkReturn)),
      excessReturn: average(leagueRows.map((x) => x.excessReturn)),
      accuracy: avgAccuracy,
      exposure: average(leagueRows.map((x) => x.exposure)),
      maxDrawdown: avgDrawdown,
      sharpe: average(leagueRows.map((x) => x.sharpe)),
      buyDays: leagueRows.reduce((sum, x) => sum + x.buyDays, 0),
      cashDays: leagueRows.reduce((sum, x) => sum + x.cashDays, 0),
      totalDays: leagueRows.reduce((sum, x) => sum + x.totalDays, 0),
      grandScore,
      consistencyScore,
    };
  });

  [...rows, ...grand].forEach((row) => {
    if (row.grandScore === undefined) {
      row.grandScore = normalize(row.totalReturn, -0.4, 1.2) * 0.65
        + normalize(row.accuracy, 0.43, 0.6) * 0.25
        + normalize(row.maxDrawdown, -0.35, -0.01) * 0.1;
    }
  });

  return { leagueRows: rows, grandRows: grand, predictions, curves };
}

function average(values) {
  const clean = values.filter(Number.isFinite);
  return clean.length ? clean.reduce((a, b) => a + b, 0) / clean.length : 0;
}

function stdev(values) {
  const clean = values.filter(Number.isFinite);
  if (!clean.length) return 0;
  const avg = average(clean);
  return Math.sqrt(average(clean.map((x) => (x - avg) ** 2)));
}

function normalize(value, min, max) {
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

function allRows() {
  const periodPerf = perf.periods[state.leaderboard.period] || perf;
  return [...periodPerf.grandRows, ...periodPerf.leagueRows];
}

function sortRows(rows, metric) {
  // For maxDrawdown, values closer to 0 are better, so descending sort is correct.
  return [...rows].sort((a, b) => {
    const av = Number.isFinite(a[metric]) ? a[metric] : -Infinity;
    const bv = Number.isFinite(b[metric]) ? b[metric] : -Infinity;
    return bv - av;
  });
}

function topRows(league = "Grand", metric = "grandScore", limit = 10) {
  return sortRows(allRows().filter((row) => row.league === league), metric).slice(0, limit);
}

function setView(view) {
  state.view = view;
  document.querySelectorAll(".nav-item").forEach((btn) => btn.classList.toggle("active", btn.dataset.view === view));
  document.querySelectorAll(".view").forEach((section) => section.classList.toggle("active", section.id === `${view}-view`));
  document.getElementById("page-title").textContent = {
    home: "Oracle Arena",
    leaderboard: "Leaderboard",
    league: "League Page",
    profile: "Oracle Profile",
    log: "Prediction Log",
  }[view];
  render();
}

function render() {
  const modePill = document.querySelector(".mode-pill");
  if (modePill) modePill.textContent = `${dataStatus.mode} · ${state.leaderboard.mode}`;
  renderHome();
  renderLeaderboard();
  renderLeague();
  renderProfile();
  renderLog();
}

function renderHome() {
  const champion = topRows("Grand", "grandScore", 1)[0];
  const bestByLeague = ASSETS.map((asset) => topRows(asset.league, "totalReturn", 1)[0]);
  const forward = forwardSummary();
  const forwardChampion = computeForwardLeaderboard(forwardLog, "Grand", "totalReturn")[0];
  document.getElementById("home-view").innerHTML = `
    <div class="hero">
      <div class="hero-copy">
        <p class="eyebrow">คำทำนายจะถูกตัดสินด้วยราคา ไม่ใช่ศรัทธา</p>
        <h2>ห้องทดลอง 100 สำนักพยากรณ์ตลาด</h2>
        <p>ทุกสำนักออกคำทำนาย SPY, QQQ และ GLD ในรูปแบบมาตรฐาน raw_output, interpretation, direction, signal, confidence และ position_size จากนั้น backtest แบบ BUY ถือสินทรัพย์ / CASH ถือเงินสดเพื่อจัดอันดับแชมป์รายลีกและรวมทุกลีก</p>
      </div>
      <div class="arena-visual"><div class="sigil">100</div></div>
    </div>
    <div class="grid metrics-grid">
      <div class="metric-card"><span class="muted">Oracles</span><strong>${oracles.length}</strong></div>
      <div class="metric-card"><span class="muted">Markets</span><strong>SPY · QQQ · GLD</strong></div>
      <div class="metric-card"><span class="muted">Backtest Days</span><strong>${perf.leagueRows[0].totalDays.toLocaleString()}</strong></div>
      <div class="metric-card"><span class="muted">Backtest Predictions</span><strong>${(perf.leagueRows[0].totalDays * oracles.length * ASSETS.length).toLocaleString()}</strong></div>
      <div class="metric-card"><span class="muted">Forward Pending</span><strong>${forward.pending.toLocaleString()}</strong></div>
      <div class="metric-card"><span class="muted">Forward Resolved</span><strong>${forward.resolved.toLocaleString()}</strong></div>
      <div class="metric-card"><span class="muted">Current Data Mode</span><strong>${dataStatus.mode}</strong></div>
      <div class="metric-card"><span class="muted">Latest Price Date</span><strong>${dataStatus.endDate}</strong></div>
    </div>
    ${dataStatusPanel()}
    ${dailyWorkflowPanel()}
    ${championArchivePanel("Backtest", "All-time", "Grand")}
    ${shareTextPanel(champion, forwardChampion)}
    <div class="grid champion-grid">
      <div class="champion-card" data-oracle="${champion.oracleId}">
        <span class="rank-badge">Grand Oracle</span>
        <h3>${champion.oracleName}</h3>
        <p class="muted">${champion.family}</p>
        <strong>${fmtNum(champion.grandScore * 100, 1)} pts</strong>
      </div>
      ${bestByLeague.map((row) => `
        <div class="champion-card" data-league="${row.league}">
          <span class="rank-badge">${row.league}</span>
          <h3>${row.oracleName}</h3>
          <p class="muted">${row.asset} champion</p>
          <strong class="${row.totalReturn >= 0 ? "positive" : "negative"}">${fmtPct(row.totalReturn)}</strong>
        </div>
      `).join("")}
      ${forwardChampion ? `
        <div class="champion-card" data-oracle="${forwardChampion.oracleId}">
          <span class="rank-badge">Forward Grand Champion</span>
          <h3>${forwardChampion.oracleName}</h3>
          <p class="muted">${forwardChampion.resolvedCount} resolved predictions</p>
          <strong class="${forwardChampion.totalReturn >= 0 ? "positive" : "negative"}">${fmtPct(forwardChampion.totalReturn)}</strong>
        </div>
      ` : ""}
    </div>
    <div class="data-panel">
      <h2>Top 5 Grand Leaderboard</h2>
      ${grandLeaderboardTable(topRows("Grand", "grandScore", 5))}
    </div>
    <div class="data-panel">
      <h2>Latest Forward Log</h2>
      ${predictionLogTable(forwardLog.slice().sort((a, b) => `${b.date}${b.createdAt || ""}`.localeCompare(`${a.date}${a.createdAt || ""}`)).slice(0, 20).map((p) => ({ ...p, is_forward: true })))}
    </div>
    <div class="disclaimer">Oracle Arena is an experimental statistics and entertainment project. It is not financial advice. Backtest and forward test results should not be used as investment recommendations. Past performance does not guarantee future results.${dataStatus.mode === "Synthetic Data" ? " This page is currently using synthetic deterministic price data. Results do not represent real market performance." : " This page is using local CSV price data. Results depend on the quality and freshness of the provided files."}</div>
  `;

  document.querySelectorAll("[data-oracle]").forEach((card) => {
    card.addEventListener("click", () => {
      state.oracleId = card.dataset.oracle;
      setView("profile");
    });
  });
  document.querySelectorAll("[data-league]").forEach((card) => {
    card.addEventListener("click", () => {
      state.league = card.dataset.league;
      setView("league");
    });
  });
  const copyButton = document.getElementById("copy-share-text");
  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const text = document.getElementById("share-text").value;
      try {
        await navigator.clipboard.writeText(text);
        copyButton.textContent = "Copied";
      } catch {
        document.getElementById("share-text").focus();
        document.getElementById("share-text").select();
      }
    });
  }
}

function shareTextPanel(backtestChampion, forwardChampion) {
  const target = forwardChampion || backtestChampion;
  const mode = forwardChampion ? "Forward" : "Backtest";
  const text = [
    "Oracle Arena Update",
    `Grand Oracle Champion: ${target.oracleName}`,
    `Mode: ${mode}`,
    `Return: ${fmtPct(target.totalReturn)}`,
    `Accuracy: ${fmtPct(target.accuracy)}`,
    `Benchmark: ${fmtPct(target.benchmarkReturn ?? 0)}`,
    "Signal: BUY/CASH only",
    "Not financial advice.",
  ].join("\n");
  return `
    <div class="data-panel">
      <div class="status-head">
        <div>
          <span class="rank-badge">Share Text</span>
          <h2>Share Text Generator</h2>
        </div>
        <button id="copy-share-text" class="action-button">Copy Share Text</button>
      </div>
      <textarea id="share-text" class="share-text" readonly>${text}</textarea>
    </div>
  `;
}

function dataStatusPanel() {
  const forward = forwardSummary();
  return `
    <div class="data-panel status-panel">
      <div class="status-head">
        <div>
          <span class="rank-badge">${dataStatus.mode}</span>
          <h2>Data Settings</h2>
        </div>
        <strong>${dataStatus.assetCount}/${ASSETS.length} assets loaded</strong>
      </div>
      <div class="grid metrics-grid compact">
        <div class="metric-card"><span class="muted">Date Range</span><strong>${dataStatus.startDate} → ${dataStatus.endDate}</strong></div>
        <div class="metric-card"><span class="muted">Trading Days</span><strong>${dataStatus.tradingDays.toLocaleString()}</strong></div>
        <div class="metric-card"><span class="muted">CSV Path</span><strong>data/prices/*.csv</strong></div>
        <div class="metric-card"><span class="muted">Data Mode</span><strong>Auto</strong></div>
        <div class="metric-card"><span class="muted">Forward Total</span><strong>${forward.total.toLocaleString()}</strong></div>
        <div class="metric-card"><span class="muted">Forward Pending</span><strong>${forward.pending.toLocaleString()}</strong></div>
        <div class="metric-card"><span class="muted">Forward Resolved</span><strong>${forward.resolved.toLocaleString()}</strong></div>
        <div class="metric-card"><span class="muted">Latest Resolved</span><strong>${forward.latestResolvedDate || "None"}</strong></div>
      </div>
      <p class="muted">Forward range: ${forward.earliestDate || "None"} → ${forward.latestDate || "None"}</p>
      <p class="muted">${dataStatus.sourceMessage}</p>
      ${dataStatus.mode === "Synthetic Data" && forward.total ? `<div class="disclaimer">Forward resolver can run in synthetic mode for workflow checks, but real forward evaluation should use Real CSV Data.</div>` : ""}
      <ul class="warning-list">${dataStatus.warnings.map((warning) => `<li>${warning}</li>`).join("")}</ul>
    </div>
  `;
}

function forwardSummary() {
  const dates = forwardLog.map((p) => p.date).filter(Boolean).sort();
  const resolvedDates = forwardLog.map((p) => p.resultDate || p.result_date).filter(Boolean).sort();
  return {
    total: forwardLog.length,
    pending: forwardLog.filter((p) => p.status === "pending").length,
    resolved: forwardLog.filter((p) => p.status === "resolved").length,
    earliestDate: dates[0] || "",
    latestDate: dates[dates.length - 1] || "",
    latestResolvedDate: resolvedDates[resolvedDates.length - 1] || "",
  };
}

function currentPredictionDate() {
  return dataStatus.endDate || todayString();
}

function latestForwardBatchDate() {
  const dates = forwardLog.map((p) => p.date).filter(Boolean).sort();
  return dates[dates.length - 1] || "";
}

function hasBatchForDate(date) {
  return forwardLog.some((p) => p.date === date);
}

function pendingResolvableCount() {
  return forwardLog.filter((p) => p.status === "pending" && canResolveForwardPrediction(p)).length;
}

function canResolveForwardPrediction(prediction) {
  return resolveForwardPredictionDetailed(prediction, "").resolved;
}

function suggestedNextAction() {
  const latestPrice = dataStatus.endDate;
  const forward = forwardSummary();
  if (!latestPrice) return "Load or verify price data first.";
  if (!hasBatchForDate(latestPrice)) return "No forward batch for latest price date. Generate today's predictions.";
  if (forward.pending && pendingResolvableCount()) return "Pending predictions exist and next trading day prices are available. Resolve now.";
  if (forward.total) return "Forward log is up to date. Export backup recommended.";
  return "Generate a forward batch to start the tournament.";
}

function dailyWorkflowPanel() {
  const forward = forwardSummary();
  const latestByAsset = ASSETS.map((asset) => `${asset.symbol}: ${prices[asset.symbol]?.at(-1)?.date || "missing"}`).join(" · ");
  return `
    <div class="data-panel">
      <div class="status-head">
        <div>
          <span class="rank-badge">Daily Tournament Workflow</span>
          <h2>Daily Tournament Workflow</h2>
        </div>
        <strong>${suggestedNextAction()}</strong>
      </div>
      <div class="grid metrics-grid compact">
        <div class="metric-card"><span class="muted">Data Mode</span><strong>${dataStatus.mode}</strong></div>
        <div class="metric-card"><span class="muted">Latest Prices</span><strong>${latestByAsset}</strong></div>
        <div class="metric-card"><span class="muted">Latest Forward Batch</span><strong>${latestForwardBatchDate() || "None"}</strong></div>
        <div class="metric-card"><span class="muted">Latest Resolved</span><strong>${forward.latestResolvedDate || "None"}</strong></div>
      </div>
      <p class="muted">Workflow: update prices, reload app, confirm Real CSV Data, generate forward batch, export backup, update prices next trading day, resolve pending predictions, check Forward Leaderboard, export backup again.</p>
    </div>
  `;
}

function championArchivePanel(mode = "Backtest", period = "All-time", league = "Grand") {
  const champions = mode === "Forward"
    ? forwardChampionCards(league)
    : backtestChampionCards(period, league);
  return `
    <div class="data-panel">
      <div class="status-head">
        <div>
          <span class="rank-badge">Champion Archive</span>
          <h2>Champion Archive</h2>
        </div>
        <strong>${mode} · ${period} · ${league}</strong>
      </div>
      ${champions.length ? `<div class="grid champion-grid">${champions.join("")}</div>` : `<p class="muted">Not enough resolved forward data yet.</p>`}
    </div>
  `;
}

function backtestChampionCards(period, league) {
  const periodPerf = perf.periods[period] || perf;
  const scoped = league === "Grand" ? periodPerf.grandRows : periodPerf.leagueRows.filter((row) => row.league === league);
  const cards = [];
  const add = (title, row, metric) => {
    if (!row) return;
    cards.push(`
      <div class="champion-card" data-oracle="${row.oracleId}">
        <span class="rank-badge">${title}</span>
        <h3>${row.oracleName}</h3>
        <p class="muted">${row.family} · ${row.league}</p>
        <strong class="${metric >= 0 ? "positive" : "negative"}">${fmtPct(metric)}</strong>
      </div>
    `);
  };
  add("Grand Champion", sortRows(scoped, "grandScore")[0], sortRows(scoped, "grandScore")[0]?.totalReturn ?? 0);
  add("Most Accurate", sortRows(scoped, "accuracy")[0], sortRows(scoped, "accuracy")[0]?.accuracy ?? 0);
  add("Lowest Drawdown", sortRows(scoped, "maxDrawdown")[0], sortRows(scoped, "maxDrawdown")[0]?.maxDrawdown ?? 0);
  add("Best Sharpe", sortRows(scoped, "sharpe")[0], sortRows(scoped, "sharpe")[0]?.sharpe / 100 || 0);
  return cards;
}

function forwardChampionCards(league) {
  const rows = computeForwardLeaderboard(forwardLog, league, "totalReturn");
  if (!rows.length) return [];
  const row = rows[0];
  return [`
    <div class="champion-card" data-oracle="${escapeHtml(row.oracleId)}">
      <span class="rank-badge">${league === "Grand" ? "Grand Forward Champion" : `${league} Forward Champion`}</span>
      <h3>${escapeHtml(row.oracleName)}</h3>
      <p class="muted">${escapeHtml(row.family)} · resolved ${row.resolvedCount}</p>
      <strong class="${row.totalReturn >= 0 ? "positive" : "negative"}">${fmtPct(row.totalReturn)}</strong>
    </div>
  `];
}

function renderLeaderboard() {
  const rows = topRows(state.leaderboard.league, state.leaderboard.metric, 100);
  document.getElementById("leaderboard-view").innerHTML = `
    <div class="data-panel">
      <div class="controls">
        ${select("lb-league", ["Grand", ...ASSETS.map((a) => a.league)], state.leaderboard.league)}
        ${select("lb-period", ["All-time", "Yearly", "Monthly"], state.leaderboard.period)}
        ${select("lb-mode", ["Backtest", "Forward Test"], state.leaderboard.mode)}
        ${select("lb-metric", [["grandScore", "Grand Score"], ["totalReturn", "Total Return"], ["accuracy", "Accuracy"], ["maxDrawdown", "Max Drawdown"], ["sharpe", "Sharpe"]], state.leaderboard.metric)}
        ${state.leaderboard.mode === "Forward Test" ? select("fw-oracle-filter", [["All", "All Oracles"], ...oracles.map((o) => [o.id, `${String(o.index).padStart(3, "0")} ${o.name}`])], state.forwardOracle) : ""}
        ${state.leaderboard.mode === "Forward Test" ? `<input id="fw-search-filter" class="control" value="${escapeHtml(state.forwardSearch)}" placeholder="Search oracle" />` : ""}
        ${state.leaderboard.mode === "Forward Test" ? select("fw-family-filter", ["All", ...FAMILY_NAMES], state.forwardFamily) : ""}
        ${state.leaderboard.mode === "Forward Test" ? select("fw-signal-filter", ["All", "BUY", "CASH"], state.forwardSignal) : ""}
        ${state.leaderboard.mode === "Forward Test" ? select("fw-status-filter", ["Resolved", "Pending", "All"], state.forwardStatus) : ""}
        ${state.leaderboard.mode === "Forward Test" ? select("fw-range-filter", ["All Forward", "Last 30 Resolved Days", "Last 7 Resolved Days"], state.forwardRange) : ""}
      </div>
      ${state.leaderboard.mode === "Backtest" ? `<p class="muted">Showing all 100 oracles. Sorted by: ${metricLabel(state.leaderboard.metric)}. Grand Backtest is the average of Stock, Tech, and Gold league results.</p>` : ""}
      ${state.leaderboard.mode === "Forward Test"
        ? forwardLeaderboardPanel()
        : `${backtestRacePanel()}${state.leaderboard.league === "Grand" ? grandLeaderboardTable(rows) : leagueLeaderboardTable(rows)}`}
    </div>
  `;

  bindSelect("lb-league", (value) => state.leaderboard.league = value);
  bindSelect("lb-period", (value) => state.leaderboard.period = value);
  bindSelect("lb-mode", (value) => state.leaderboard.mode = value);
  bindSelect("lb-metric", (value) => state.leaderboard.metric = value);
  if (state.leaderboard.mode === "Forward Test") {
    bindSelect("fw-oracle-filter", (value) => state.forwardOracle = value);
    document.getElementById("fw-search-filter").addEventListener("input", (event) => {
      state.forwardSearch = event.target.value;
      renderLeaderboard();
    });
    bindSelect("fw-family-filter", (value) => state.forwardFamily = value);
    bindSelect("fw-signal-filter", (value) => state.forwardSignal = value);
    bindSelect("fw-status-filter", (value) => state.forwardStatus = value);
    bindSelect("fw-range-filter", (value) => state.forwardRange = value);
  }
  if (state.leaderboard.mode === "Backtest") {
    requestAnimationFrame(drawLeaderboardRaceChart);
    setTimeout(drawLeaderboardRaceChart, 180);
  }
}

function backtestRacePanel() {
  let raceMarkup = "";
  try {
    raceMarkup = leaderboardRaceSvgMarkup(buildBacktestRaceSeries());
  } catch (error) {
    raceMarkup = leaderboardRaceSvgMarkup([], error.message);
  }
  return `
    <div class="race-panel">
      <div class="race-header">
        <div>
          <h2>Backtest Race Chart</h2>
          <p class="muted">100 oracles running through the selected backtest period. Top finishers are brighter and labeled at the finish line.</p>
        </div>
        <span class="badge">${escapeHtml(state.leaderboard.league)} · ${escapeHtml(state.leaderboard.period)}</span>
      </div>
      <div id="leaderboard-race-svg" class="race-svg">${raceMarkup}</div>
      <canvas id="leaderboard-race-chart" class="race-chart"></canvas>
    </div>
  `;
}

function leagueLeaderboardTable(rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Rank</th><th>Oracle</th><th>Family</th><th>League</th><th class="right">Total Return</th><th class="right">Benchmark</th><th class="right">Excess</th><th class="right">Accuracy</th><th class="right">Exposure</th><th class="right">Max Drawdown</th><th class="right">Sharpe</th><th class="right">Buy Days</th><th class="right">Cash Days</th>
        </tr></thead>
        <tbody>
          ${rows.map((row, idx) => `
            <tr data-profile="${row.oracleId}">
              <td><span class="rank-badge">${idx + 1}</span></td>
              <td><strong>${row.oracleName}</strong><br><span class="muted">${row.asset}</span></td>
              <td>${row.family}</td>
              <td>${row.league}</td>
              <td class="right ${row.totalReturn >= 0 ? "positive" : "negative"}">${fmtPct(row.totalReturn)}</td>
              <td class="right ${row.benchmarkReturn >= 0 ? "positive" : "negative"}">${fmtPct(row.benchmarkReturn)}</td>
              <td class="right ${row.excessReturn >= 0 ? "positive" : "negative"}">${fmtPct(row.excessReturn)}</td>
              <td class="right">${fmtPct(row.accuracy)}</td>
              <td class="right">${fmtPct(row.exposure)}</td>
              <td class="right negative">${fmtPct(row.maxDrawdown)}</td>
              <td class="right">${fmtNum(row.sharpe)}</td>
              <td class="right">${row.buyDays.toLocaleString()}</td>
              <td class="right">${row.cashDays.toLocaleString()}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function grandLeaderboardTable(rows) {
  const periodPerf = perf.periods[state.leaderboard.period] || perf;
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Rank</th><th>Oracle</th><th>Family</th><th class="right">Grand Score</th><th class="right">Avg Return</th><th class="right">Avg Accuracy</th><th class="right">Avg Max DD</th><th class="right">Stock Return</th><th class="right">Tech Return</th><th class="right">Gold Return</th><th class="right">Consistency</th>
        </tr></thead>
        <tbody>
          ${rows.map((row, idx) => {
            const byLeague = Object.fromEntries(periodPerf.leagueRows.filter((x) => x.oracleId === row.oracleId).map((x) => [x.league, x]));
            return `
              <tr data-profile="${row.oracleId}">
                <td><span class="rank-badge">${idx + 1}</span></td>
                <td><strong>${row.oracleName}</strong><br><span class="muted">${row.asset}</span></td>
                <td>${row.family}</td>
                <td class="right">${fmtNum(row.grandScore * 100, 1)}</td>
                <td class="right ${row.totalReturn >= 0 ? "positive" : "negative"}">${fmtPct(row.totalReturn)}</td>
                <td class="right">${fmtPct(row.accuracy)}</td>
                <td class="right negative">${fmtPct(row.maxDrawdown)}</td>
                <td class="right">${fmtPct(byLeague["Stock League"].totalReturn)}</td>
                <td class="right">${fmtPct(byLeague["Tech League"].totalReturn)}</td>
                <td class="right">${fmtPct(byLeague["Gold League"].totalReturn)}</td>
                <td class="right">${fmtNum(row.consistencyScore * 100, 1)}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function forwardLeaderboardPanel() {
  const filtered = filterForwardLog(forwardLog);
  const pending = filtered.filter((p) => p.status === "pending").length;
  const resolved = filtered.filter((p) => p.status === "resolved").length;
  const rows = computeForwardLeaderboard(filtered, state.leaderboard.league, state.leaderboard.metric);
  const pendingRows = filtered.filter((p) => p.status === "pending").slice(0, 100);
  return `
    <div class="data-panel">
      <h2>Forward Test Leaderboard</h2>
      <p class="muted">Forward predictions are stored separately from backtest results. Rankings below use resolved forward predictions only.</p>
      <div class="grid metrics-grid compact">
        <div class="metric-card"><span class="muted">Forward Predictions</span><strong>${forwardLog.length.toLocaleString()}</strong></div>
        <div class="metric-card"><span class="muted">Pending</span><strong>${pending.toLocaleString()}</strong></div>
        <div class="metric-card"><span class="muted">Resolved</span><strong>${resolved.toLocaleString()}</strong></div>
        <div class="metric-card"><span class="muted">Storage</span><strong>localStorage</strong></div>
      </div>
      ${dataStatus.mode === "Synthetic Data" ? `<div class="disclaimer">Warning: resolving forward predictions in Synthetic Data mode is for workflow validation only and does not represent real market performance.</div>` : ""}
      <p class="muted">Showing up to all 100 oracles with matching forward data. Sorted by: ${metricLabel(state.leaderboard.metric)}. Grand Forward is the average of Stock, Tech, and Gold league results, not one compounded three-asset portfolio.</p>
      ${state.forwardStatus === "Pending"
        ? predictionLogTable(pendingRows.map((p) => ({ ...p, is_forward: true })))
        : state.leaderboard.league === "Grand" ? forwardGrandLeaderboardTable(rows) : forwardLeaderboardTable(rows)}
    </div>
  `;
}

function filterForwardLog(rows) {
  const search = state.forwardSearch.trim().toLowerCase();
  const resolvedDates = [...new Set(rows.filter((p) => p.status === "resolved").map((p) => p.resultDate || p.result_date).filter(Boolean))].sort();
  const rangeLimit = state.forwardRange === "Last 7 Resolved Days" ? 7 : state.forwardRange === "Last 30 Resolved Days" ? 30 : null;
  const allowedDates = rangeLimit ? new Set(resolvedDates.slice(-rangeLimit)) : null;
  return rows
    .filter((p) => state.forwardOracle === "All" || p.oracle_id === state.forwardOracle)
    .filter((p) => {
      const oracle = oracles.find((o) => o.id === p.oracle_id);
      return state.forwardFamily === "All" || oracle?.family === state.forwardFamily;
    })
    .filter((p) => !search || `${p.oracle_name} ${p.oracle_id}`.toLowerCase().includes(search))
    .filter((p) => state.forwardSignal === "All" || p.signal === state.forwardSignal)
    .filter((p) => {
      if (state.forwardStatus === "All") return true;
      return p.status === state.forwardStatus.toLowerCase();
    })
    .filter((p) => !allowedDates || p.status !== "resolved" || allowedDates.has(p.resultDate || p.result_date));
}

function computeForwardLeaderboard(rows, league, metric) {
  const oracleIds = [...new Set(rows.map((p) => p.oracle_id))];
  const byOracle = oracleIds.map((oracleId) => {
    if (league !== "Grand") return computeForwardLeagueRow(rows, oracleId, league);
    const oracle = oracles.find((o) => o.id === oracleId);
    const leagueRows = ASSETS
      .map((asset) => computeForwardLeagueRow(rows, oracleId, asset.league))
      .filter(Boolean);
    if (!leagueRows.length) return null;
    const totalReturn = average(leagueRows.map((row) => row.totalReturn));
    const benchmarkReturn = average(leagueRows.map((row) => row.benchmarkReturn));
    const accuracy = average(leagueRows.map((row) => row.accuracy));
    const exposure = average(leagueRows.map((row) => row.exposure));
    const maxDd = average(leagueRows.map((row) => row.maxDrawdown));
    return {
      oracleId,
      oracleName: oracle?.name || leagueRows[0].oracleName,
      family: oracle?.family || leagueRows[0].family || "",
      league: "Grand",
      asset: "Stock/Tech/Gold avg",
      totalReturn,
      benchmarkReturn,
      excessReturn: totalReturn - benchmarkReturn,
      accuracy,
      exposure,
      maxDrawdown: maxDd,
      sharpe: average(leagueRows.map((row) => row.sharpe)),
      buyDays: leagueRows.reduce((sum, row) => sum + row.buyDays, 0),
      cashDays: leagueRows.reduce((sum, row) => sum + row.cashDays, 0),
      resolvedCount: leagueRows.reduce((sum, row) => sum + row.resolvedCount, 0),
      pendingCount: rows.filter((p) => p.oracle_id === oracleId && p.status === "pending").length,
      latestResolvedDate: leagueRows.map((row) => row.latestResolvedDate).filter(Boolean).sort().at(-1) || "",
      stockReturn: leagueRows.find((row) => row.league === "Stock League")?.totalReturn ?? 0,
      techReturn: leagueRows.find((row) => row.league === "Tech League")?.totalReturn ?? 0,
      goldReturn: leagueRows.find((row) => row.league === "Gold League")?.totalReturn ?? 0,
      grandForwardScore: totalReturn * 0.55 + accuracy * 0.35 + (1 + maxDd) * 0.10,
    };
  }).filter(Boolean);
  const sortMetric = metric === "grandScore" ? "grandForwardScore" : metric;
  return sortRows(byOracle, sortMetric).slice(0, 100);
}

function computeForwardLeagueRow(rows, oracleId, league) {
  const oracle = oracles.find((o) => o.id === oracleId);
  const leagueScoped = rows
    .filter((p) => p.status === "resolved" && p.oracle_id === oracleId && p.league === league)
    .slice()
    .sort((a, b) => `${a.resultDate || a.result_date || ""}${a.asset || ""}`.localeCompare(`${b.resultDate || b.result_date || ""}${b.asset || ""}`));
  if (!leagueScoped.length) return null;
  const equityCurve = [1];
  const benchmarkCurve = [1];
  let buyDays = 0;
  let cashDays = 0;
  let winDays = 0;
  let tieDays = 0;
  const strategyReturns = [];
  leagueScoped.forEach((p) => {
    const strategyReturn = Number(p.strategyReturn ?? p.strategy_return ?? 0);
    const benchmarkReturn = Number(p.benchmarkReturn ?? p.benchmark_return ?? p.actualReturn ?? p.actual_return ?? 0);
    strategyReturns.push(Number.isFinite(strategyReturn) ? strategyReturn : 0);
    equityCurve.push(equityCurve[equityCurve.length - 1] * (1 + (Number.isFinite(strategyReturn) ? strategyReturn : 0)));
    benchmarkCurve.push(benchmarkCurve[benchmarkCurve.length - 1] * (1 + (Number.isFinite(benchmarkReturn) ? benchmarkReturn : 0)));
    buyDays += p.signal === "BUY" ? 1 : 0;
    cashDays += p.signal === "CASH" ? 1 : 0;
    winDays += p.correct === true ? 1 : 0;
    tieDays += p.correct === null ? 1 : 0;
  });
  const totalDays = leagueScoped.length;
  const scoredDays = totalDays - tieDays;
  const totalReturn = equityCurve[equityCurve.length - 1] - 1;
  const benchmarkReturn = benchmarkCurve[benchmarkCurve.length - 1] - 1;
  const maxDd = maxDrawdown(equityCurve);
  return {
    oracleId,
    oracleName: oracle?.name || leagueScoped[0].oracle_name,
    family: oracle?.family || leagueScoped[0].family || "",
    league,
    asset: leagueScoped[0].asset,
    totalReturn,
    benchmarkReturn,
    excessReturn: totalReturn - benchmarkReturn,
    accuracy: scoredDays ? winDays / scoredDays : 0,
    exposure: totalDays ? buyDays / totalDays : 0,
    maxDrawdown: maxDd,
    sharpe: sharpe(strategyReturns),
    buyDays,
    cashDays,
    resolvedCount: totalDays,
    pendingCount: rows.filter((p) => p.oracle_id === oracleId && p.status === "pending" && p.league === league).length,
    latestResolvedDate: leagueScoped.map((p) => p.resultDate || p.result_date).filter(Boolean).sort().at(-1) || "",
  };
}

function forwardGrandLeaderboardTable(rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Rank</th><th>Oracle</th><th>Family</th><th class="right">Grand Forward Score</th><th class="right">Avg Forward Return</th><th class="right">Avg Accuracy</th><th class="right">Stock Return</th><th class="right">Tech Return</th><th class="right">Gold Return</th><th class="right">Resolved</th><th class="right">Pending</th><th>Latest Resolved</th>
        </tr></thead>
        <tbody>
          ${rows.map((row, idx) => `
            <tr data-profile="${escapeHtml(row.oracleId)}">
              <td><span class="rank-badge">${idx + 1}</span></td>
              <td><strong>${escapeHtml(row.oracleName)}</strong><br><span class="muted">${escapeHtml(row.asset)}</span></td>
              <td>${escapeHtml(row.family)}</td>
              <td class="right">${fmtNum(row.grandForwardScore * 100, 1)}</td>
              <td class="right ${row.totalReturn >= 0 ? "positive" : "negative"}">${fmtPct(row.totalReturn)}</td>
              <td class="right">${fmtPct(row.accuracy)}</td>
              <td class="right">${fmtPct(row.stockReturn)}</td>
              <td class="right">${fmtPct(row.techReturn)}</td>
              <td class="right">${fmtPct(row.goldReturn)}</td>
              <td class="right">${row.resolvedCount.toLocaleString()}</td>
              <td class="right">${row.pendingCount.toLocaleString()}</td>
              <td>${escapeHtml(row.latestResolvedDate || "None")}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function forwardLeaderboardTable(rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Rank</th><th>Oracle</th><th>Family</th><th>League</th><th class="right">Total Return</th><th class="right">Benchmark</th><th class="right">Excess</th><th class="right">Accuracy</th><th class="right">Exposure</th><th class="right">Max Drawdown</th><th class="right">Sharpe</th><th class="right">Buy Days</th><th class="right">Cash Days</th><th class="right">Resolved</th><th class="right">Pending</th>
        </tr></thead>
        <tbody>
          ${rows.map((row, idx) => `
            <tr data-profile="${escapeHtml(row.oracleId)}">
              <td><span class="rank-badge">${idx + 1}</span></td>
              <td><strong>${escapeHtml(row.oracleName)}</strong><br><span class="muted">${escapeHtml(row.asset)}</span></td>
              <td>${escapeHtml(row.family)}</td>
              <td>${escapeHtml(row.league)}</td>
              <td class="right ${row.totalReturn >= 0 ? "positive" : "negative"}">${fmtPct(row.totalReturn)}</td>
              <td class="right ${row.benchmarkReturn >= 0 ? "positive" : "negative"}">${fmtPct(row.benchmarkReturn)}</td>
              <td class="right ${row.excessReturn >= 0 ? "positive" : "negative"}">${fmtPct(row.excessReturn)}</td>
              <td class="right">${fmtPct(row.accuracy)}</td>
              <td class="right">${fmtPct(row.exposure)}</td>
              <td class="right negative">${fmtPct(row.maxDrawdown)}</td>
              <td class="right">${fmtNum(row.sharpe)}</td>
              <td class="right">${row.buyDays.toLocaleString()}</td>
              <td class="right">${row.cashDays.toLocaleString()}</td>
              <td class="right">${row.resolvedCount.toLocaleString()}</td>
              <td class="right">${row.pendingCount.toLocaleString()}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderLeague() {
  const asset = ASSETS.find((a) => a.league === state.league);
  const rows = topRows(state.league, "totalReturn", 10);
  const worstRows = sortRows(perf.leagueRows.filter((row) => row.league === state.league), "totalReturn").slice(-5).reverse();
  const leagueRows = perf.leagueRows.filter((row) => row.league === state.league);
  const leaguePredictions = perf.predictions.filter((p) => p.league === state.league).slice(0, 80);
  const benchmark = rows[0]?.benchmarkReturn ?? 0;
  const latestBar = prices[asset.symbol]?.at(-1);
  const forwardLeague = forwardLog.filter((p) => p.league === state.league);
  const forwardChampion = computeForwardLeaderboard(forwardLog, state.league, "totalReturn")[0];
  const latestForwardResolved = forwardLeague.map((p) => p.resultDate || p.result_date).filter(Boolean).sort().at(-1) || "None";
  const mostAccurate = sortRows(leagueRows, "accuracy")[0];
  const lowDrawdown = sortRows(leagueRows, "maxDrawdown")[0];
  const bestExcess = sortRows(leagueRows, "excessReturn")[0];
  document.getElementById("league-view").innerHTML = `
    <div class="controls">${select("league-select", ASSETS.map((a) => a.league), state.league)}</div>
    <div class="grid metrics-grid">
      <div class="metric-card"><span class="muted">League</span><strong>${asset.league}</strong></div>
      <div class="metric-card"><span class="muted">Asset</span><strong>${asset.symbol}</strong></div>
      <div class="metric-card"><span class="muted">Data Mode</span><strong>${dataStatus.mode}</strong></div>
      <div class="metric-card"><span class="muted">Date Range</span><strong>${dataStatus.startDate} → ${dataStatus.endDate}</strong></div>
      <div class="metric-card"><span class="muted">Latest Price</span><strong>${latestBar ? fmtNum(latestBar.adjustedClose ?? latestBar.adjClose ?? latestBar.close, 2) : "None"}</strong></div>
      <div class="metric-card"><span class="muted">Benchmark</span><strong class="${benchmark >= 0 ? "positive" : "negative"}">${fmtPct(benchmark)}</strong></div>
      <div class="metric-card"><span class="muted">Champion</span><strong>${rows[0].oracleName}</strong></div>
      <div class="metric-card"><span class="muted">Average Oracle Return</span><strong>${fmtPct(average(leagueRows.map((x) => x.totalReturn)))}</strong></div>
      <div class="metric-card"><span class="muted">Average Accuracy</span><strong>${fmtPct(average(leagueRows.map((x) => x.accuracy)))}</strong></div>
      <div class="metric-card"><span class="muted">Average Exposure</span><strong>${fmtPct(average(leagueRows.map((x) => x.exposure)))}</strong></div>
      <div class="metric-card"><span class="muted">Forward Status</span><strong>${forwardLeague.filter((p) => p.status === "resolved").length} resolved / ${forwardLeague.filter((p) => p.status === "pending").length} pending</strong></div>
      <div class="metric-card"><span class="muted">Latest Forward Result</span><strong>${latestForwardResolved}</strong></div>
    </div>
    <div class="data-panel">
      <h2>League Champion Cards</h2>
      <div class="grid champion-grid">
        ${leagueChampionCard("Backtest Champion", rows[0], rows[0]?.totalReturn)}
        ${forwardChampion ? leagueChampionCard("Forward Champion", forwardChampion, forwardChampion.totalReturn) : `<div class="champion-card"><span class="rank-badge">Forward Champion</span><h3>Not enough resolved forward data yet.</h3></div>`}
        ${leagueChampionCard("Most Accurate", mostAccurate, mostAccurate?.accuracy)}
        ${leagueChampionCard("Lowest Drawdown", lowDrawdown, lowDrawdown?.maxDrawdown)}
        ${leagueChampionCard("Best Excess Return", bestExcess, bestExcess?.excessReturn)}
      </div>
    </div>
    <div class="data-panel">
      <h2>Top 10 ${asset.league}</h2>
      ${leagueLeaderboardTable(rows)}
    </div>
    <div class="data-panel">
      <h2>Worst 5 ${asset.league}</h2>
      ${leagueLeaderboardTable(worstRows)}
    </div>
    <div class="data-panel">
      <h2>Top 5 Equity Curves</h2>
      <canvas id="league-chart" class="sparkline"></canvas>
    </div>
    <div class="data-panel">
      <h2>${asset.league} Prediction Log</h2>
      <p class="muted">${leaguePredictions.length.toLocaleString()} sampled predictions shown from this league.</p>
      ${predictionLogTable(leaguePredictions)}
    </div>
  `;
  bindSelect("league-select", (value) => state.league = value);
  requestAnimationFrame(() => drawLeagueChart(rows.slice(0, 5)));
}

function leagueChampionCard(title, row, value = 0) {
  if (!row) return "";
  return `
    <div class="champion-card" data-oracle="${row.oracleId}">
      <span class="rank-badge">${title}</span>
      <h3>${row.oracleName}</h3>
      <p class="muted">${row.family} · ${row.league}</p>
      <strong class="${value >= 0 ? "positive" : "negative"}">${title.includes("Sharpe") ? fmtNum(value) : fmtPct(value)}</strong>
    </div>
  `;
}

function renderProfile() {
  const oracle = oracles.find((o) => o.id === state.oracleId) || oracles[0];
  const rows = perf.leagueRows.filter((row) => row.oracleId === oracle.id);
  const grand = perf.grandRows.find((row) => row.oracleId === oracle.id);
  const grandRank = sortRows(perf.grandRows, "grandScore").findIndex((row) => row.oracleId === oracle.id) + 1;
  const sample = perf.predictions.find((p) => p.oracle_id === oracle.id) || omenDirection(oracle, ASSETS[0], days[80], 80);
  const oraclePredictions = perf.predictions.filter((p) => p.oracle_id === oracle.id).slice(0, 80);
  const randomOracle = oracles.find((o) => o.name === "ปู่สุ่มบริสุทธิ์");
  const randomGrand = perf.grandRows.find((row) => row.oracleId === randomOracle?.id);
  const beatsRandom = randomGrand ? grand.grandScore > randomGrand.grandScore + EPS : false;
  const randomComparison = oracle.id === randomOracle?.id ? "Pure random baseline" : beatsRandom ? "Yes" : "No";
  const benchmark = benchmarkRecord(rows);
  const forwardRows = computeForwardLeaderboard(forwardLog, "Grand", "totalReturn").filter((row) => row.oracleId === oracle.id);
  const forwardLeagueRows = ASSETS.map((asset) => computeForwardLeaderboard(forwardLog, asset.league, "totalReturn").find((row) => row.oracleId === oracle.id)).filter(Boolean);
  const badges = oracleBadges(oracle, rows, grand, forwardRows[0]);
  const signalStyle = grand.exposure > 0.65 ? "mostly BUY" : grand.exposure < 0.35 ? "mostly CASH" : "balanced";

  document.getElementById("profile-view").innerHTML = `
    <div class="controls">${select("oracle-select", oracles.map((o) => [o.id, `${String(o.index).padStart(3, "0")} ${o.name}`]), oracle.id)}</div>
    <div class="profile-layout">
      <aside>
        <div class="profile-header">
          <div class="profile-title-row">
            <div>
              <span class="rank-badge">#${oracle.index}</span>
              <h2>${oracle.name}</h2>
            </div>
            <span class="badge">${oracle.family}</span>
          </div>
          <p class="muted">${oracle.description}</p>
          <div class="stat-list">
            <div><span>Uses price data</span><strong>${oracle.usesPriceData ? "Yes" : "No"}</strong></div>
            <div><span>External news</span><strong>No</strong></div>
            <div><span>Signal style</span><strong>${signalStyle}</strong></div>
            <div><span>Grand score</span><strong>${fmtNum(grand.grandScore * 100, 1)}</strong></div>
            <div><span>Avg return</span><strong class="${grand.totalReturn >= 0 ? "positive" : "negative"}">${fmtPct(grand.totalReturn)}</strong></div>
            <div><span>BUY / CASH</span><strong>${grand.buyDays.toLocaleString()} / ${grand.cashDays.toLocaleString()}</strong></div>
            <div><span>Benchmark result</span><strong>${benchmark.wins}W / ${benchmark.ties}T / ${benchmark.losses}L</strong></div>
            <div><span>Beat pure random</span><strong>${randomComparison}</strong></div>
          </div>
        </div>
        <div class="data-panel">
          <h3>Rule</h3>
          <p class="muted">${oracle.ruleDescription}</p>
          <h3>Badges</h3>
          <p>${badges.map((badge) => `<span class="badge">${badge}</span>`).join(" ") || `<span class="muted">No computed badges yet.</span>`}</p>
          <h3>Sample Prediction</h3>
          <p><strong>${sample.league}: ${sample.asset}</strong></p>
          <p class="muted">ลางที่เห็น: ${sample.raw_output}</p>
          <p>${sample.interpretation}</p>
          <p><span class="${sample.direction.toLowerCase()}">${sample.direction}</span> · <span class="${sample.signal.toLowerCase()}">${sample.signal}</span> · ${fmtPct(sample.confidence, 0)}</p>
        </div>
      </aside>
      <section>
        <div class="data-panel">
          <h2>Grand Summary</h2>
          ${profileGrandSummaryTable(grand, grandRank)}
        </div>
        <div class="data-panel">
          <h2>League Statistics</h2>
          ${leagueLeaderboardTable(rows)}
        </div>
        <div class="data-panel">
          <h2>Forward Performance</h2>
          ${forwardRows.length ? forwardGrandLeaderboardTable(forwardRows) + forwardLeaderboardTable(forwardLeagueRows) : `<p class="muted">Not enough resolved forward data yet.</p>`}
        </div>
        <div class="data-panel">
          <h2>Equity Curve</h2>
          <canvas id="profile-chart" class="sparkline"></canvas>
        </div>
        <div class="data-panel">
          <h2>Forward Equity Curve</h2>
          ${forwardRows.length ? `<canvas id="profile-forward-chart" class="sparkline"></canvas>` : `<p class="muted">Not enough resolved forward results yet.</p>`}
        </div>
        <div class="data-panel">
          <h2>Prediction History</h2>
          ${predictionLogTable(oraclePredictions)}
        </div>
      </section>
    </div>
  `;
  bindSelect("oracle-select", (value) => state.oracleId = value);
  requestAnimationFrame(() => drawProfileChart(oracle.id));
  requestAnimationFrame(() => drawForwardProfileChart(oracle.id));
}

function benchmarkRecord(rows) {
  return rows.reduce((record, row) => {
    const diff = row.totalReturn - row.benchmarkReturn;
    if (diff > EPS) record.wins += 1;
    else if (diff < -EPS) record.losses += 1;
    else record.ties += 1;
    return record;
  }, { wins: 0, ties: 0, losses: 0 });
}

function profileGrandSummaryTable(row, rank) {
  const byLeague = Object.fromEntries(perf.leagueRows.filter((x) => x.oracleId === row.oracleId).map((x) => [x.league, x]));
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Actual Rank</th><th>Oracle</th><th class="right">Grand Score</th><th class="right">Avg Return</th><th class="right">Avg Accuracy</th><th class="right">Stock</th><th class="right">Tech</th><th class="right">Gold</th>
        </tr></thead>
        <tbody>
          <tr data-profile="${escapeHtml(row.oracleId)}">
            <td><span class="rank-badge">#${rank || "—"}</span></td>
            <td><strong>${escapeHtml(row.oracleName)}</strong><br><span class="muted">${escapeHtml(row.family)}</span></td>
            <td class="right">${fmtNum(row.grandScore * 100, 1)}</td>
            <td class="right ${row.totalReturn >= 0 ? "positive" : "negative"}">${fmtPct(row.totalReturn)}</td>
            <td class="right">${fmtPct(row.accuracy)}</td>
            <td class="right">${fmtPct(byLeague["Stock League"]?.totalReturn)}</td>
            <td class="right">${fmtPct(byLeague["Tech League"]?.totalReturn)}</td>
            <td class="right">${fmtPct(byLeague["Gold League"]?.totalReturn)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function oracleBadges(oracle, rows, grand, forwardRow) {
  const badges = [];
  if (grand.exposure > 0.7) badges.push("High Exposure");
  if (grand.exposure < 0.3) badges.push("Mostly Cash");
  if (rows.some((row) => row.totalReturn === Math.max(...perf.leagueRows.filter((x) => x.league === row.league).map((x) => x.totalReturn)))) badges.push("League Leader");
  if (grand.accuracy > 0.54) badges.push("Accuracy Master");
  if (grand.maxDrawdown > -0.08) badges.push("Low Drawdown");
  if (grand.totalReturn > 0.35) badges.push("High Return");
  if (oracle.family === "Disguised Chart Shadows") badges.push("Price Ritualist");
  if (forwardRow?.resolvedCount > 0) badges.push("Forward Active");
  const bestLeague = rows.slice().sort((a, b) => b.totalReturn - a.totalReturn)[0];
  if (bestLeague?.league === "Gold League") badges.push("Gold Specialist");
  if (bestLeague?.league === "Tech League") badges.push("Tech Specialist");
  if (bestLeague?.league === "Stock League") badges.push("Stock Specialist");
  return badges;
}

function renderLog() {
  const combinedLog = [
    ...forwardLog.map((p) => ({ ...p, is_forward: true })),
    ...perf.predictions.map((p) => ({ ...p, is_forward: false })),
  ];
  const search = state.logSearch.trim().toLowerCase();
  const rangeStart = logRangeStart(combinedLog, state.logRange);
  const rows = combinedLog
    .filter((p) => !search || `${p.oracle_name} ${p.asset} ${p.raw_output} ${p.date}`.toLowerCase().includes(search))
    .filter((p) => state.logMode === "All" || (state.logMode === "Forward" ? p.is_forward : !p.is_forward))
    .filter((p) => state.logLeague === "All" || p.league === state.logLeague)
    .filter((p) => {
      const oracle = oracles.find((o) => o.id === p.oracle_id);
      return state.logFamily === "All" || oracle?.family === state.logFamily;
    })
    .filter((p) => state.logSignal === "All" || p.signal === state.logSignal)
    .filter((p) => {
      if (state.logCorrect === "All") return true;
      if (state.logCorrect === "Pending") return p.correct == null;
      if (state.logCorrect === "Correct") return p.correct === true;
      return p.correct === false;
    })
    .filter((p) => !rangeStart || p.date >= rangeStart)
    .sort((a, b) => `${b.date}${b.prediction_timestamp}`.localeCompare(`${a.date}${a.prediction_timestamp}`))
    .slice(0, 250);

  document.getElementById("log-view").innerHTML = `
    <div class="data-panel">
      <div class="controls">
        <input id="log-search" class="control" value="${state.logSearch}" placeholder="Search oracle, asset, omen, date" />
        ${select("log-mode", ["All", "Backtest", "Forward"], state.logMode)}
        ${select("log-league", ["All", ...ASSETS.map((a) => a.league)], state.logLeague)}
        ${select("log-family", ["All", ...FAMILY_NAMES], state.logFamily)}
        ${select("log-signal", ["All", "BUY", "CASH"], state.logSignal)}
        ${select("log-correct", ["All", "Correct", "Incorrect", "Pending"], state.logCorrect)}
        ${select("log-range", ["All Dates", "Last 30 Dates", "Last 7 Dates"], state.logRange)}
        <button id="forward-button" class="action-button">Generate today forward batch</button>
        <button id="resolve-forward" class="action-button">Resolve Pending Forward Predictions</button>
        <button id="export-forward-json" class="action-button">Export JSON</button>
        <button id="export-forward-csv" class="action-button">Export CSV</button>
        <button id="export-pending-forward-json" class="action-button">Export Pending JSON</button>
        <button id="export-resolved-forward-json" class="action-button">Export Resolved JSON</button>
        <button id="export-resolved-forward-csv" class="action-button">Export Resolved CSV</button>
        <label class="action-button file-button">Import JSON<input id="import-forward-json" type="file" accept="application/json,.json" hidden /></label>
        <button id="clear-forward" class="action-button danger-button">Clear Forward Data</button>
      </div>
      <p class="muted">Log นี้แสดง prediction history พร้อม timestamp และรองรับ forward batch ใน localStorage แบบไม่เขียนทับวันเดิม</p>
      ${predictionLogTable(rows)}
    </div>
  `;
  document.getElementById("log-search").addEventListener("input", (event) => {
    state.logSearch = event.target.value;
    renderLog();
  });
  bindSelect("log-mode", (value) => state.logMode = value);
  bindSelect("log-league", (value) => state.logLeague = value);
  bindSelect("log-family", (value) => state.logFamily = value);
  bindSelect("log-signal", (value) => state.logSignal = value);
  bindSelect("log-correct", (value) => state.logCorrect = value);
  bindSelect("log-range", (value) => state.logRange = value);
  document.getElementById("forward-button").addEventListener("click", () => {
    const result = generateForwardBatch();
    alert(`Forward batch date ${result.date}. Generated: ${result.generated}. Skipped existing: ${result.skipped}.`);
    renderLog();
  });
  document.getElementById("resolve-forward").addEventListener("click", () => {
    const result = resolvePendingForwardPredictions();
    alert(`Resolved ${result.resolved} pending predictions. ${result.stillPending} remain pending.\nReasons: ${Object.entries(result.skippedReasons).map(([key, value]) => `${key}=${value}`).join(", ")}`);
    render();
  });
  document.getElementById("export-forward-json").addEventListener("click", () => exportForwardLog("json"));
  document.getElementById("export-forward-csv").addEventListener("click", () => exportForwardLog("csv"));
  document.getElementById("export-pending-forward-json").addEventListener("click", exportPendingForwardLog);
  document.getElementById("export-resolved-forward-json").addEventListener("click", () => exportResolvedForwardResults("json"));
  document.getElementById("export-resolved-forward-csv").addEventListener("click", () => exportResolvedForwardResults("csv"));
  document.getElementById("import-forward-json").addEventListener("change", importForwardLog);
  document.getElementById("clear-forward").addEventListener("click", clearForwardData);
}

function logRangeStart(rows, range) {
  if (range === "All Dates") return "";
  const limit = range === "Last 7 Dates" ? 7 : 30;
  const dates = [...new Set(rows.map((p) => p.date).filter(Boolean))].sort();
  return dates.slice(-limit)[0] || "";
}

function predictionLogTable(rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Date</th><th>Oracle</th><th>Family</th><th>League</th><th>Asset</th><th>Raw Output</th><th>Interpretation</th><th>Direction</th><th>Signal</th><th class="right">Confidence</th><th class="right">Position</th><th class="right">Actual Return</th><th class="right">Strategy Return</th><th>Correct</th>
        </tr></thead>
        <tbody>
          ${rows.map((p) => {
            const oracle = oracles.find((o) => o.id === p.oracle_id);
            const oracleId = escapeHtml(p.oracle_id);
            const date = escapeHtml(p.date);
            const status = escapeHtml(p.status || "pending");
            const oracleName = escapeHtml(p.oracle_name);
            const createdAt = escapeHtml(p.createdAt || p.prediction_timestamp || "");
            const family = escapeHtml(oracle?.family || p.family || "");
            const league = escapeHtml(p.league);
            const asset = escapeHtml(p.asset);
            const rawOutput = escapeHtml(p.raw_output);
            const interpretation = escapeHtml(p.interpretation);
            const direction = ["UP", "DOWN"].includes(p.direction) ? p.direction : "";
            const signal = ["BUY", "CASH"].includes(p.signal) ? p.signal : "";
            const actualReturn = Number(p.actual_return ?? p.actualReturn);
            const strategyReturn = Number(p.strategy_return ?? p.strategyReturn);
            return `
              <tr data-profile="${oracleId}">
                <td>${date}${p.is_forward ? `<br><span class="badge">${status}</span>` : ""}</td>
                <td><strong>${oracleName}</strong><br><span class="muted">${createdAt}</span></td>
                <td>${family}</td>
                <td>${league}</td>
                <td>${asset}</td>
                <td>${rawOutput}</td>
                <td>${interpretation}</td>
                <td class="${direction.toLowerCase()}">${direction}</td>
                <td class="${signal.toLowerCase()}">${signal}</td>
                <td class="right">${fmtPct(p.confidence, 0)}</td>
                <td class="right">${fmtNum(p.position_size ?? (p.signal === "BUY" ? 1 : 0), 1)}</td>
                <td class="right ${actualReturn >= 0 ? "positive" : "negative"}">${Number.isFinite(actualReturn) ? fmtPct(actualReturn, 2) : "Pending"}</td>
                <td class="right ${strategyReturn >= 0 ? "positive" : "negative"}">${Number.isFinite(strategyReturn) ? fmtPct(strategyReturn, 2) : "Pending"}</td>
                <td>${p.correct == null ? "Pending" : p.correct ? "Yes" : "No"}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function loadForwardLog() {
  try {
    return JSON.parse(localStorage.getItem(FORWARD_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveForwardLog() {
  localStorage.setItem(FORWARD_KEY, JSON.stringify(forwardLog));
}

function generateForwardBatch() {
  const predictionDate = currentPredictionDate();
  const dateIndex = days.length - 1;
  const batch = [];
  let skipped = 0;
  oracles.forEach((oracle) => ASSETS.forEach((asset) => {
    if (forwardLog.some((p) => p.date === predictionDate && p.oracle_id === oracle.id && p.asset === asset.symbol)) {
      skipped += 1;
      return;
    }
    const prediction = omenDirection(oracle, asset, predictionDate, dateIndex);
    const createdAt = new Date().toISOString();
    batch.push({
      id: `${predictionDate}-${oracle.id}-${asset.symbol}-forward`,
      ...prediction,
      actual_return: null,
      correct: null,
      strategy_return: null,
      createdAt,
      prediction_timestamp: createdAt,
      status: "pending",
      immutable_note: "Generated forward prediction; do not mutate after timestamp.",
    });
  }));
  forwardLog = [...batch, ...forwardLog];
  saveForwardLog();
  return { date: predictionDate, generated: batch.length, skipped };
}

function resolvePendingForwardPredictions() {
  let resolved = 0;
  const skippedReasons = {
    alreadyResolved: 0,
    invalidAsset: 0,
    noPredictionDatePrice: 0,
    noNextTradingDayPrice: 0,
    invalidPrice: 0,
  };
  const resolvedAt = new Date().toISOString();

  forwardLog = forwardLog.map((prediction) => {
    if (prediction.status !== "pending") {
      skippedReasons.alreadyResolved += 1;
      return prediction;
    }
    const result = resolveForwardPredictionDetailed(prediction, resolvedAt);
    if (!result.resolved) {
      skippedReasons[result.reason] += 1;
      return prediction;
    }
    resolved += 1;
    return result.row;
  });

  saveForwardLog();
  const stillPending = Object.entries(skippedReasons)
    .filter(([reason]) => reason !== "alreadyResolved")
    .reduce((sum, [, count]) => sum + count, 0);
  return { resolved, stillPending, skippedReasons };
}

function resolveForwardPrediction(prediction, resolvedAt) {
  const result = resolveForwardPredictionDetailed(prediction, resolvedAt);
  return result.resolved ? result.row : null;
}

function resolveForwardPredictionDetailed(prediction, resolvedAt) {
  const series = prices[prediction.asset];
  if (!series) return { resolved: false, reason: "invalidAsset" };
  const dateIndex = series.findIndex((row) => row.date === prediction.date);
  if (dateIndex < 0) return { resolved: false, reason: "noPredictionDatePrice" };
  if (dateIndex >= series.length - 1) return { resolved: false, reason: "noNextTradingDayPrice" };
  const current = series[dateIndex];
  const next = series[dateIndex + 1];
  const currentClose = current.adjustedClose ?? current.adjClose ?? current.close;
  const nextClose = next.adjustedClose ?? next.adjClose ?? next.close;
  if (!Number.isFinite(currentClose) || !Number.isFinite(nextClose)) return { resolved: false, reason: "invalidPrice" };

  const assetReturn = nextClose / currentClose - 1;
  const strategyReturn = prediction.signal === "BUY" ? assetReturn : 0;
  const correct = assetReturn === 0
    ? null
    : (prediction.direction === "UP" && assetReturn > 0) || (prediction.direction === "DOWN" && assetReturn < 0);

  return {
    resolved: true,
    row: {
      ...prediction,
      status: "resolved",
      resultDate: next.date,
      resolvedAt,
      actualReturn: assetReturn,
      benchmarkReturn: assetReturn,
      strategyReturn,
      correct,
      actual_return: assetReturn,
      benchmark_return: assetReturn,
      strategy_return: strategyReturn,
      result_date: next.date,
      resolved_at: resolvedAt,
    },
  };
}

function exportForwardLog(format) {
  if (format === "csv") {
    const headers = forwardExportHeaders();
    const csv = [
      headers.join(","),
      ...forwardLog.map((row) => headers.map((key) => csvCell(row[key])).join(",")),
    ].join("\n");
    downloadText(`oracle-arena-forward-log-${currentPredictionDate()}.csv`, csv, "text/csv");
    return;
  }
  downloadText(`oracle-arena-forward-log-${currentPredictionDate()}.json`, JSON.stringify(forwardLog, null, 2), "application/json");
}

function exportResolvedForwardResults(format) {
  const resolved = forwardLog.filter((row) => row.status === "resolved");
  if (format === "csv") {
    const headers = forwardExportHeaders();
    const csv = [
      headers.join(","),
      ...resolved.map((row) => headers.map((key) => csvCell(row[key])).join(",")),
    ].join("\n");
    downloadText(`oracle-arena-forward-resolved-${currentPredictionDate()}.csv`, csv, "text/csv");
    return;
  }
  downloadText(`oracle-arena-forward-resolved-${currentPredictionDate()}.json`, JSON.stringify(resolved, null, 2), "application/json");
}

function exportPendingForwardLog() {
  const pending = forwardLog.filter((row) => row.status === "pending");
  downloadText(`oracle-arena-forward-pending-${currentPredictionDate()}.json`, JSON.stringify(pending, null, 2), "application/json");
}

function forwardExportHeaders() {
  return ["id", "date", "createdAt", "status", "resolvedAt", "resultDate", "oracle_id", "oracle_name", "league", "asset", "horizon", "raw_output", "interpretation", "direction", "signal", "confidence", "position_size", "actualReturn", "benchmarkReturn", "strategyReturn", "correct"];
}

function clearForwardData() {
  if (!confirm("Clear all forward predictions from localStorage? This cannot be undone unless you exported a backup.")) return;
  forwardLog = [];
  saveForwardLog();
  render();
}

function csvCell(value) {
  if (value == null) return "";
  const text = String(value).replace(/"/g, "\"\"");
  return `"${text}"`;
}

function downloadText(filename, text, type) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function importForwardLog(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const incoming = JSON.parse(reader.result);
      if (!Array.isArray(incoming)) throw new Error("JSON must be an array.");
      let imported = 0;
      let skipped = 0;
      let invalid = 0;
      incoming.forEach((row) => {
        const normalized = normalizeForwardImportRow(row);
        if (!normalized.ok) {
          invalid += 1;
          return;
        }
        const exists = forwardLog.some((p) => forwardKey(p) === forwardKey(normalized.row));
        if (exists) {
          skipped += 1;
          return;
        }
        forwardLog.push(normalized.row);
        imported += 1;
      });
      saveForwardLog();
      alert(`Import complete. Imported: ${imported}. Skipped duplicates: ${skipped}. Invalid: ${invalid}.`);
      render();
    } catch (error) {
      alert(`Import failed: ${error.message}`);
    }
  };
  reader.readAsText(file);
}

function normalizeForwardImportRow(row) {
  if (!row || typeof row !== "object") return { ok: false };
  const date = row.date;
  const oracleId = row.oracle_id || row.oracleId;
  const asset = row.asset;
  const direction = row.direction;
  const signal = row.signal;
  const status = row.status || "pending";
  const confidence = Number(row.confidence);
  const positionSize = Number(row.position_size ?? row.positionSize ?? (signal === "BUY" ? 1 : 0));
  const oracle = oracles.find((o) => o.id === oracleId);
  const assetConfig = ASSETS.find((item) => item.symbol === asset);

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return { ok: false };
  if (!oracleId || !oracle) return { ok: false };
  if (!asset || !assetConfig) return { ok: false };
  if (!["UP", "DOWN"].includes(direction)) return { ok: false };
  if (!["BUY", "CASH"].includes(signal)) return { ok: false };
  if (!["pending", "resolved"].includes(status)) return { ok: false };
  if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) return { ok: false };
  if (![0, 1].includes(positionSize)) return { ok: false };
  if (status === "resolved" && (!row.resultDate && !row.result_date)) return { ok: false };

  const createdAt = row.createdAt || row.prediction_timestamp || new Date().toISOString();
  const imported = {
    id: row.id || `${date}-${oracleId}-${asset}-forward`,
    date,
    oracle_id: oracleId,
    oracle_name: row.oracle_name || row.oracleName || oracle.name,
    league: row.league || assetConfig.league,
    asset,
    horizon: row.horizon || "1D",
    raw_output: row.raw_output || row.rawOutput || "",
    interpretation: row.interpretation || "",
    direction,
    signal,
    confidence,
    position_size: positionSize,
    createdAt,
    prediction_timestamp: row.prediction_timestamp || createdAt,
    status,
    immutable_note: row.immutable_note || "Imported forward prediction; raw fields must remain immutable.",
  };

  if (status === "resolved") {
    const actualReturn = Number(row.actualReturn ?? row.actual_return);
    const benchmarkReturn = Number(row.benchmarkReturn ?? row.benchmark_return ?? actualReturn);
    const strategyReturn = Number(row.strategyReturn ?? row.strategy_return);
    if (![actualReturn, benchmarkReturn, strategyReturn].every(Number.isFinite)) return { ok: false };
    Object.assign(imported, {
      resultDate: row.resultDate || row.result_date,
      resolvedAt: row.resolvedAt || row.resolved_at || createdAt,
      actualReturn,
      benchmarkReturn,
      strategyReturn,
      correct: parseCorrectValue(row.correct),
      actual_return: actualReturn,
      benchmark_return: benchmarkReturn,
      strategy_return: strategyReturn,
      result_date: row.resultDate || row.result_date,
      resolved_at: row.resolvedAt || row.resolved_at || createdAt,
    });
  } else {
    Object.assign(imported, {
      actual_return: null,
      benchmark_return: null,
      strategy_return: null,
      actualReturn: null,
      benchmarkReturn: null,
      strategyReturn: null,
      correct: null,
    });
  }

  return { ok: true, row: imported };
}

function forwardKey(row) {
  return `${row.date}|${row.oracle_id || row.oracleId}|${row.asset}`;
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

function select(id, options, value) {
  return `<select id="${id}" class="control">${options.map((option) => {
    const optionValue = Array.isArray(option) ? option[0] : option;
    const label = Array.isArray(option) ? option[1] : option;
    return `<option value="${escapeHtml(optionValue)}" ${optionValue === value ? "selected" : ""}>${escapeHtml(label)}</option>`;
  }).join("")}</select>`;
}

function bindSelect(id, setter) {
  document.getElementById(id).addEventListener("change", (event) => {
    setter(event.target.value);
    render();
  });
}

function bindProfileRows() {
  document.body.addEventListener("click", (event) => {
    const row = event.target.closest("[data-profile]");
    if (!row) return;
    state.oracleId = row.dataset.profile;
    setView("profile");
  });
}

function drawLeagueChart(rows) {
  const canvas = document.getElementById("league-chart");
  if (!canvas) return;
  drawLines(canvas, rows.map((row) => ({
    label: row.oracleName,
    color: ["#d6ad55", "#71b7d8", "#7ccf91", "#ee7e78", "#b39ddb"][rows.indexOf(row)],
    points: perf.curves.get(`${row.oracleId}:${row.league}`),
  })));
}

function drawProfileChart(oracleId) {
  const canvas = document.getElementById("profile-chart");
  if (!canvas) return;
  drawLines(canvas, ASSETS.map((asset, index) => ({
    label: asset.symbol,
    color: ["#d6ad55", "#71b7d8", "#7ccf91"][index],
    points: perf.curves.get(`${oracleId}:${asset.league}`),
  })));
}

function drawForwardProfileChart(oracleId) {
  const canvas = document.getElementById("profile-forward-chart");
  if (!canvas) return;
  const resolved = forwardLog
    .filter((p) => p.status === "resolved" && p.oracle_id === oracleId)
    .sort((a, b) => `${a.resultDate || a.result_date}${a.asset}`.localeCompare(`${b.resultDate || b.result_date}${b.asset}`));
  if (!resolved.length) return;
  let strategy = 1;
  let benchmark = 1;
  const strategyPoints = [{ date: resolved[0].date, value: 1 }];
  const benchmarkPoints = [{ date: resolved[0].date, value: 1 }];
  resolved.forEach((p) => {
    strategy *= 1 + Number(p.strategyReturn ?? p.strategy_return ?? 0);
    benchmark *= 1 + Number(p.benchmarkReturn ?? p.benchmark_return ?? p.actualReturn ?? p.actual_return ?? 0);
    strategyPoints.push({ date: p.resultDate || p.result_date, value: strategy });
    benchmarkPoints.push({ date: p.resultDate || p.result_date, value: benchmark });
  });
  drawLines(canvas, [
    { label: "Forward Strategy", color: "#d6ad55", points: strategyPoints },
    { label: "Forward Benchmark", color: "#71b7d8", points: benchmarkPoints },
  ]);
}

function buildBacktestRaceSeries() {
  const periodPerf = perf.periods[state.leaderboard.period] || perf;
  const rows = sortRows(
    state.leaderboard.league === "Grand"
      ? periodPerf.grandRows
      : periodPerf.leagueRows.filter((row) => row.league === state.leaderboard.league),
    state.leaderboard.metric,
  );
  return rows.map((row, index) => {
    const leagueCurves = state.leaderboard.league === "Grand"
      ? ASSETS.map((asset) => periodPerf.curves.get(`${row.oracleId}:${asset.league}`)).filter(Boolean)
      : [periodPerf.curves.get(`${row.oracleId}:${state.leaderboard.league}`)].filter(Boolean);
    const pointCount = Math.min(...leagueCurves.map((curve) => curve.length));
    const points = Array.from({ length: pointCount }, (_, pointIndex) => ({
      date: leagueCurves[0][pointIndex].date,
      value: average(leagueCurves.map((curve) => curve[pointIndex]?.value).filter(Number.isFinite)),
    })).filter((point) => Number.isFinite(point.value));
    return {
      rank: index + 1,
      oracleId: row.oracleId,
      oracleName: row.oracleName,
      family: row.family,
      color: oracleColor(index),
      points,
    };
  }).filter((series) => series.points.length >= 2);
}

function oracleColor(index) {
  const hue = (index * 137.508) % 360;
  return `hsl(${Math.round(hue)}, 72%, 66%)`;
}

function drawLeaderboardRaceChart() {
  if (leaderboardRaceFrame) cancelAnimationFrame(leaderboardRaceFrame);
  let series = [];
  try {
    series = buildBacktestRaceSeries();
  } catch (error) {
    renderLeaderboardRaceSvg([], error.message);
    return;
  }
  renderLeaderboardRaceSvg(series);
  const canvas = document.getElementById("leaderboard-race-chart");
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  if (rect.width < 20 || rect.height < 20) {
    leaderboardRaceFrame = requestAnimationFrame(drawLeaderboardRaceChart);
    return;
  }
  drawRaceFrame(canvas, series, 1);
  const startedAt = performance.now();
  const duration = 2200;

  function frame(now) {
    const progress = Math.min(1, (now - startedAt) / duration);
    drawRaceFrame(canvas, series, easeOutCubic(progress));
    if (progress < 1) leaderboardRaceFrame = requestAnimationFrame(frame);
  }

  leaderboardRaceFrame = requestAnimationFrame(frame);
}

function renderLeaderboardRaceSvg(series, errorMessage = "") {
  const target = document.getElementById("leaderboard-race-svg");
  if (!target) return;
  target.innerHTML = leaderboardRaceSvgMarkup(series, errorMessage);
}

function lastItem(items) {
  return items[items.length - 1];
}

function leaderboardRaceSvgMarkup(series, errorMessage = "") {
  const width = 1200;
  const height = 520;
  const padding = { left: 52, right: 210, top: 28, bottom: 42 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const allValues = series.flatMap((item) => item.points.map((point) => point.value)).filter(Number.isFinite);
  if (!series.length || !allValues.length) {
    return `<div class="race-empty">${escapeHtml(errorMessage || "Not enough backtest curve data yet.")}</div>`;
  }
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const span = Math.max(0.001, max - min);
  const xAt = (index, total) => padding.left + (index / Math.max(1, total - 1)) * plotWidth;
  const yAt = (value) => padding.top + (1 - (value - min) / span) * plotHeight;
  const grid = Array.from({ length: 5 }, (_, index) => {
    const y = padding.top + (index / 4) * plotHeight;
    return `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right + 24}" y2="${y}" class="race-grid-line" />`;
  }).join("");
  const paths = series.map((item) => {
    const d = item.points.map((point, index) => `${index === 0 ? "M" : "L"}${xAt(index, item.points.length).toFixed(1)},${yAt(point.value).toFixed(1)}`).join(" ");
    const className = item.rank <= 10 ? "race-path race-path-top" : "race-path race-path-pack";
    return `<path d="${d}" class="${className}" stroke="${escapeHtml(item.color)}" />`;
  }).join("");
  const finishers = series
    .map((item) => ({ ...item, point: lastItem(item.points) }))
    .sort((a, b) => b.point.value - a.point.value)
    .slice(0, 10);
  const labels = finishers.map((item, index) => {
    const y = padding.top + index * 24 + 8;
    return `
      <g>
        <circle cx="${width - padding.right + 28}" cy="${y - 4}" r="${index < 3 ? 4.5 : 3.5}" fill="${escapeHtml(item.color)}" />
        <text x="${width - padding.right + 40}" y="${y}" class="${index < 3 ? "race-label top" : "race-label"}">#${item.rank} ${escapeHtml(item.oracleName.slice(0, 22))}</text>
        <text x="${width - 58}" y="${y}" class="${item.point.value >= 1 ? "race-return positive-fill" : "race-return negative-fill"}">${fmtPct(item.point.value - 1, 0)}</text>
      </g>
    `;
  }).join("");
  const firstSeriesPoints = series[0]?.points || [];
  const lastDate = lastItem(firstSeriesPoints)?.date || "";
  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Backtest race chart with 100 oracle equity curves">
      <rect x="0" y="0" width="${width}" height="${height}" rx="8" class="race-bg" />
      ${grid}
      <text x="8" y="${yAt(max) + 4}" class="race-axis">${fmtPct(max - 1, 0)}</text>
      <text x="8" y="${yAt(min) + 4}" class="race-axis">${fmtPct(min - 1, 0)}</text>
      ${paths}
      ${labels}
      <text x="${padding.left}" y="${height - 16}" class="race-date">${escapeHtml(lastDate)}</text>
      <text x="${width - padding.right + 40}" y="${height - 16}" class="race-axis">${series.length} oracles</text>
    </svg>
  `;
}

function easeOutCubic(value) {
  return 1 - (1 - value) ** 3;
}

function drawRaceFrame(canvas, series, progress) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, rect.width, rect.height);

  const padding = { left: 52, right: 188, top: 28, bottom: 42 };
  const plotWidth = Math.max(1, rect.width - padding.left - padding.right);
  const plotHeight = Math.max(1, rect.height - padding.top - padding.bottom);
  const allValues = series.flatMap((item) => item.points.map((point) => point.value)).filter(Number.isFinite);
  if (!series.length || !allValues.length) {
    ctx.fillStyle = "#d9d1c6";
    ctx.font = "13px system-ui";
    ctx.fillText("Not enough backtest curve data", 18, rect.height / 2);
    return;
  }

  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const span = Math.max(0.001, max - min);
  const longest = Math.max(...series.map((item) => item.points.length));
  const visiblePoints = Math.max(2, Math.floor((longest - 1) * progress) + 1);
  const xAt = (index, total) => padding.left + (index / Math.max(1, total - 1)) * plotWidth;
  const yAt = (value) => padding.top + (1 - (value - min) / span) * plotHeight;

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + (i / 4) * plotHeight;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(rect.width - padding.right + 24, y);
    ctx.stroke();
  }

  ctx.fillStyle = "#a9a39a";
  ctx.font = "12px system-ui";
  ctx.fillText(fmtPct(min - 1, 0), 8, yAt(min) + 4);
  ctx.fillText(fmtPct(max - 1, 0), 8, yAt(max) + 4);

  series.forEach((item) => {
    const count = Math.min(item.points.length, visiblePoints);
    if (count < 2) return;
    ctx.globalAlpha = item.rank <= 10 ? 0.98 : 0.34;
    ctx.strokeStyle = item.rank <= 10 ? item.color : "rgba(217,209,198,0.48)";
    ctx.lineWidth = item.rank <= 10 ? 2.8 : 1.2;
    ctx.beginPath();
    for (let i = 0; i < count; i += 1) {
      const point = item.points[i];
      const x = xAt(i, item.points.length);
      const y = yAt(point.value);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  });
  ctx.globalAlpha = 1;

  const finishers = series
    .map((item) => {
      const index = Math.min(item.points.length - 1, visiblePoints - 1);
      return { ...item, point: item.points[index] };
    })
    .sort((a, b) => b.point.value - a.point.value)
    .slice(0, 10);

  finishers.forEach((item, index) => {
    const pointIndex = Math.min(item.points.length - 1, visiblePoints - 1);
    const x = xAt(pointIndex, item.points.length);
    const y = yAt(item.point.value);
    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.arc(x, y, item.rank <= 3 ? 4.5 : 3.5, 0, Math.PI * 2);
    ctx.fill();
    const labelY = padding.top + index * 24 + 8;
    ctx.fillStyle = index < 3 ? "#f5f1e8" : "#d9d1c6";
    ctx.font = `${index < 3 ? 700 : 500} 12px system-ui`;
    ctx.fillText(`#${item.rank} ${item.oracleName.slice(0, 20)}`, rect.width - padding.right + 38, labelY);
    ctx.fillStyle = item.point.value >= 1 ? "#7ccf91" : "#ee7e78";
    ctx.fillText(fmtPct(item.point.value - 1, 0), rect.width - 56, labelY);
  });

  const dateSeries = series[0]?.points || [];
  const dateIndex = Math.min(dateSeries.length - 1, visiblePoints - 1);
  ctx.fillStyle = "#d6ad55";
  ctx.font = "700 13px system-ui";
  ctx.fillText(dateSeries[dateIndex]?.date || "", padding.left, rect.height - 16);
  ctx.fillStyle = "#a9a39a";
  ctx.font = "12px system-ui";
  ctx.fillText(`${series.length} oracles`, rect.width - padding.right + 38, rect.height - 16);
}

function drawLines(canvas, series) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, rect.width, rect.height);
  const cleanSeries = (series || [])
    .map((s) => ({
      ...s,
      points: (s.points || []).filter((p) => p && Number.isFinite(p.value)),
    }))
    .filter((s) => s.points.length >= 2);
  ctx.strokeStyle = "rgba(255,255,255,0.09)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i += 1) {
    const y = 18 + i * ((rect.height - 44) / 4);
    ctx.beginPath();
    ctx.moveTo(16, y);
    ctx.lineTo(rect.width - 16, y);
    ctx.stroke();
  }

  if (!cleanSeries.length) {
    ctx.fillStyle = "#d9d1c6";
    ctx.font = "13px system-ui";
    ctx.fillText("Not enough data", 18, rect.height / 2);
    return;
  }

  const allValues = cleanSeries.flatMap((s) => s.points.map((p) => p.value));
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const span = Math.max(0.001, max - min);
  cleanSeries.forEach((s) => {
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    s.points.forEach((point, index) => {
      const x = 16 + (index / (s.points.length - 1)) * (rect.width - 32);
      const y = rect.height - 24 - ((point.value - min) / span) * (rect.height - 48);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  });

  cleanSeries.forEach((s, index) => {
    ctx.fillStyle = s.color;
    ctx.fillRect(18 + index * 128, rect.height - 16, 10, 3);
    ctx.fillStyle = "#d9d1c6";
    ctx.font = "12px system-ui";
    ctx.fillText(s.label.slice(0, 15), 34 + index * 128, rect.height - 11);
  });
}

function animateBackground() {
  const canvas = document.getElementById("arena-canvas");
  const ctx = canvas.getContext("2d");
  let t = 0;
  function frame() {
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w * 0.62, h * 0.42);
    ctx.rotate(t * 0.00025);
    for (let r = 90; r < Math.max(w, h); r += 96) {
      ctx.strokeStyle = r % 192 === 0 ? "rgba(214,173,85,0.12)" : "rgba(113,183,216,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let i = 0; i < 36; i += 1) {
      const a = (i / 36) * Math.PI * 2;
      ctx.strokeStyle = "rgba(255,255,255,0.045)";
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * 80, Math.sin(a) * 80);
      ctx.lineTo(Math.cos(a) * Math.max(w, h), Math.sin(a) * Math.max(w, h));
      ctx.stroke();
    }
    ctx.restore();
    t += 16;
    requestAnimationFrame(frame);
  }
  frame();
}

async function initApp() {
  renderLoading();
  oracles = makeOracles();
  const environment = await loadPriceEnvironment();
  days = environment.days;
  prices = environment.prices;
  dataStatus = environment.status;
  const allTime = computePerformance(oracles, days, 20, "All-time", true);
  const yearly = computePerformance(oracles, days, Math.max(20, days.length - 253), "Yearly", false);
  const monthly = computePerformance(oracles, days, Math.max(20, days.length - 22), "Monthly", false);
  perf = { ...allTime, periods: { "All-time": allTime, Yearly: yearly, Monthly: monthly } };
  forwardLog = loadForwardLog();
  document.querySelectorAll(".nav-item").forEach((btn) => btn.addEventListener("click", () => setView(btn.dataset.view)));
  bindProfileRows();
  animateBackground();
  render();
}

function renderLoading() {
  document.getElementById("home-view").innerHTML = `
    <div class="data-panel">
      <h2>Loading Oracle Arena</h2>
      <p class="muted">Checking real CSV data first. If files are missing or invalid, the app will use deterministic synthetic prices.</p>
    </div>
  `;
}

initApp();
