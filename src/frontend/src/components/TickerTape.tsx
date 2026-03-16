import { useMarketPrices } from "../hooks/useMarketPrices";

const STATIC_METALS = [
  { symbol: "XAUUSD", price: "2,341.50", change: "+1.2%", bull: true },
  { symbol: "XAGUSD", price: "27.84", change: "-0.4%", bull: false },
  { symbol: "USOIL", price: "82.34", change: "+2.1%", bull: true },
];

const CRYPTO_SYMBOLS = ["BTC/USD", "ETH/USD", "SOL/USD", "BNB/USD"];
const FOREX_SYMBOLS = ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "USD/CAD"];

function formatPrice(symbol: string, price: number): string {
  if (symbol.includes("JPY") || price > 999) {
    return price.toFixed(2);
  }
  if (price < 10) return price.toFixed(4);
  return price.toFixed(2);
}

function TickerTape() {
  const { prices } = useMarketPrices();

  const liveTickers = [...CRYPTO_SYMBOLS, ...FOREX_SYMBOLS]
    .map((sym) => {
      const entry = prices[sym];
      if (!entry) return null;
      const bull = entry.change >= 0;
      return {
        symbol: sym,
        price: formatPrice(sym, entry.price),
        change: `${bull ? "+" : ""}${entry.change.toFixed(2)}%`,
        bull,
      };
    })
    .filter(Boolean) as {
    symbol: string;
    price: string;
    change: string;
    bull: boolean;
  }[];

  const tickers = [...STATIC_METALS, ...liveTickers];
  const doubled = [...tickers, ...tickers];

  return (
    <div
      className="w-full overflow-hidden border-b"
      style={{
        background: "oklch(0.06 0.02 265)",
        borderColor: "oklch(0.82 0.22 155 / 0.2)",
        position: "relative",
        zIndex: 50,
      }}
    >
      <div className="ticker-animate flex items-center gap-0 py-2">
        {doubled.map((t, i) => (
          <span
            key={`${t.symbol}-${i}`}
            className="flex items-center gap-1.5 px-4 shrink-0"
          >
            <span
              className="font-mono text-xs font-semibold"
              style={{ color: "oklch(0.75 0.08 265)" }}
            >
              {t.symbol}
            </span>
            <span
              className="font-mono text-xs"
              style={{ color: "oklch(0.85 0.05 265)" }}
            >
              {t.price}
            </span>
            <span
              className="font-mono text-xs font-bold"
              style={{
                color: t.bull ? "oklch(0.82 0.22 155)" : "oklch(0.65 0.26 20)",
              }}
            >
              {t.change}
            </span>
            <span style={{ color: "oklch(0.4 0.02 265)", marginLeft: "8px" }}>
              ||
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default TickerTape;
