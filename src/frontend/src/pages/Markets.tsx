import {
  BarChart2,
  Bitcoin,
  Droplets,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { type PriceEntry, useMarketPrices } from "../hooks/useMarketPrices";

interface MarketMeta {
  symbol: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  tvSymbol?: string;
}

const MARKET_META: MarketMeta[] = [
  {
    symbol: "XAUUSD",
    name: "Gold / USD",
    category: "Commodity",
    icon: BarChart2,
    tvSymbol: "OANDA:XAUUSD",
  },
  {
    symbol: "XAGUSD",
    name: "Silver / USD",
    category: "Commodity",
    icon: BarChart2,
    tvSymbol: "OANDA:XAGUSD",
  },
  {
    symbol: "USOIL",
    name: "US Crude Oil",
    category: "Commodity",
    icon: Droplets,
    tvSymbol: "USOIL",
  },
  {
    symbol: "BTC/USD",
    name: "Bitcoin / USD",
    category: "Crypto",
    icon: Bitcoin,
  },
  {
    symbol: "ETH/USD",
    name: "Ethereum / USD",
    category: "Crypto",
    icon: Bitcoin,
  },
  {
    symbol: "SOL/USD",
    name: "Solana / USD",
    category: "Crypto",
    icon: Bitcoin,
  },
  {
    symbol: "EUR/USD",
    name: "Euro / USD",
    category: "Forex",
    icon: TrendingUp,
  },
  {
    symbol: "GBP/USD",
    name: "Pound / USD",
    category: "Forex",
    icon: TrendingUp,
  },
  {
    symbol: "USD/JPY",
    name: "USD / Yen",
    category: "Forex",
    icon: TrendingDown,
  },
];

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];
const categories = ["All", "Forex", "Commodity", "Crypto"];

function TradingViewEmbed({ tvSymbol }: { tvSymbol: string }) {
  const config = JSON.stringify({
    symbol: tvSymbol,
    dateRange: "1D",
    colorTheme: "dark",
    trendLineColor: "rgba(41, 98, 255, 1)",
    underLineColor: "rgba(41, 98, 255, 0.3)",
    isTransparent: true,
    autosize: true,
    largeChartUrl: "",
  });
  const src = `https://s.tradingview.com/embed-widget/mini-symbol-overview/?locale=en#${encodeURIComponent(config)}`;
  return (
    <div style={{ height: 120, width: "100%" }}>
      <iframe
        src={src}
        style={{ width: "100%", height: "100%", border: "none" }}
        title={`${tvSymbol} chart`}
        loading="lazy"
      />
    </div>
  );
}

function PriceCardSkeleton({ id }: { id: string }) {
  return (
    <div
      key={id}
      className="p-6 rounded-2xl animate-pulse"
      style={{
        background: "oklch(0.10 0.025 265)",
        border: "1px solid oklch(0.18 0.02 265)",
      }}
    >
      <div className="flex justify-between mb-4">
        <div>
          <div
            className="h-5 w-20 rounded"
            style={{ background: "oklch(0.16 0.02 265)" }}
          />
          <div
            className="h-3 w-28 rounded mt-1"
            style={{ background: "oklch(0.14 0.02 265)" }}
          />
        </div>
        <div
          className="h-5 w-16 rounded-full"
          style={{ background: "oklch(0.14 0.02 265)" }}
        />
      </div>
      <div
        className="h-8 w-32 rounded mb-2"
        style={{ background: "oklch(0.16 0.02 265)" }}
      />
      <div
        className="h-4 w-16 rounded mb-4"
        style={{ background: "oklch(0.14 0.02 265)" }}
      />
      <div className="grid grid-cols-3 gap-2">
        {["a", "b", "c"].map((k) => (
          <div key={k}>
            <div
              className="h-3 w-8 rounded mb-1"
              style={{ background: "oklch(0.14 0.02 265)" }}
            />
            <div
              className="h-3 w-12 rounded"
              style={{ background: "oklch(0.16 0.02 265)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PriceCard({
  meta,
  entry,
  index,
}: { meta: MarketMeta; entry: PriceEntry; index: number }) {
  const prevPrice = useRef(entry.price);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (entry.price !== prevPrice.current) {
      setFlash(entry.price > prevPrice.current ? "up" : "down");
      const t = setTimeout(() => setFlash(null), 400);
      prevPrice.current = entry.price;
      return () => clearTimeout(t);
    }
  }, [entry.price]);

  const bull = entry.change >= 0;
  const decimals = entry.price < 10 ? 4 : 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl relative overflow-hidden"
      style={{
        background:
          flash === "up"
            ? "oklch(0.82 0.22 155 / 0.08)"
            : flash === "down"
              ? "oklch(0.65 0.26 20 / 0.08)"
              : "oklch(0.10 0.025 265)",
        border: `1px solid ${bull ? "oklch(0.82 0.22 155 / 0.25)" : "oklch(0.65 0.26 20 / 0.25)"}`,
        transition: "background 0.4s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div
            className="font-display font-bold text-lg"
            style={{ color: "oklch(0.9 0.02 265)" }}
          >
            {meta.symbol}
          </div>
          <div
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.55 0.04 265)" }}
          >
            {meta.name}
          </div>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{
            background: "oklch(0.68 0.22 245 / 0.12)",
            color: "oklch(0.68 0.22 245)",
            border: "1px solid oklch(0.68 0.22 245 / 0.25)",
          }}
        >
          {meta.category}
        </span>
      </div>

      {meta.tvSymbol ? (
        <TradingViewEmbed tvSymbol={meta.tvSymbol} />
      ) : (
        <>
          <div
            className="font-mono font-bold text-2xl mb-1"
            style={{
              color:
                flash === "up"
                  ? "oklch(0.82 0.22 155)"
                  : flash === "down"
                    ? "oklch(0.65 0.26 20)"
                    : "oklch(0.92 0.02 265)",
              transition: "color 0.4s",
            }}
          >
            {entry.price.toFixed(decimals)}
          </div>
          <div className="flex items-center gap-1 mb-4">
            {bull ? (
              <TrendingUp size={14} style={{ color: "oklch(0.82 0.22 155)" }} />
            ) : (
              <TrendingDown
                size={14}
                style={{ color: "oklch(0.65 0.26 20)" }}
              />
            )}
            <span
              className="text-sm font-semibold"
              style={{
                color: bull ? "oklch(0.82 0.22 155)" : "oklch(0.65 0.26 20)",
              }}
            >
              {bull ? "+" : ""}
              {entry.change.toFixed(2)}%
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "High", value: entry.high.toFixed(decimals) },
              { label: "Low", value: entry.low.toFixed(decimals) },
              { label: "Vol", value: entry.volume },
            ].map((d) => (
              <div key={d.label}>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.45 0.03 265)" }}
                >
                  {d.label}
                </div>
                <div
                  className="font-mono text-xs font-semibold mt-0.5"
                  style={{ color: "oklch(0.7 0.04 265)" }}
                >
                  {d.value}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

function Markets() {
  const [filter, setFilter] = useState("All");
  const { prices, isLive, isLoading } = useMarketPrices();

  const filtered = MARKET_META.filter(
    (m) => filter === "All" || m.category === filter,
  );

  return (
    <div className="relative pt-28 pb-20 px-4" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
            style={{
              background: isLive
                ? "oklch(0.82 0.22 155 / 0.1)"
                : "oklch(0.75 0.18 90 / 0.1)",
              border: `1px solid ${isLive ? "oklch(0.82 0.22 155 / 0.3)" : "oklch(0.75 0.18 90 / 0.3)"}`,
              color: isLive ? "oklch(0.82 0.22 155)" : "oklch(0.75 0.18 90)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: isLive
                  ? "oklch(0.82 0.22 155)"
                  : "oklch(0.75 0.18 90)",
                animation: isLive ? "pulse 2s infinite" : "none",
              }}
            />
            {isLive ? "LIVE MARKET DATA" : "DELAYED DATA"}
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl mb-6">
            <span style={{ color: "oklch(0.92 0.02 265)" }}>Market </span>
            <span className="gradient-text-bull">Overview</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "oklch(0.6 0.04 265)" }}
          >
            Real-time pricing across Forex, Commodities and Crypto markets.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              data-ocid={`markets.${cat.toLowerCase()}.tab`}
              onClick={() => setFilter(cat)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background:
                  filter === cat
                    ? "oklch(0.82 0.22 155)"
                    : "oklch(0.12 0.02 265)",
                color:
                  filter === cat
                    ? "oklch(0.07 0.02 265)"
                    : "oklch(0.65 0.04 265)",
                border:
                  filter === cat ? "none" : "1px solid oklch(0.2 0.02 265)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? SKELETON_KEYS.map((id) => <PriceCardSkeleton key={id} id={id} />)
            : filtered.map((m, i) => {
                const entry = prices[m.symbol];
                if (!entry && !m.tvSymbol) return null;
                return (
                  <PriceCard
                    key={m.symbol}
                    meta={m}
                    entry={
                      entry ?? {
                        price: 0,
                        change: 0,
                        high: 0,
                        low: 0,
                        volume: "—",
                      }
                    }
                    index={i}
                  />
                );
              })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs mt-12"
          style={{ color: "oklch(0.4 0.03 265)" }}
        >
          * Prices are indicative. Crypto & Forex via live APIs (CoinGecko,
          Frankfurter). Commodities via TradingView. Actual trading prices may
          vary.
        </motion.p>
      </div>
    </div>
  );
}

export default Markets;
