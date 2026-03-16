import { useCallback, useEffect, useRef, useState } from "react";

export interface PriceEntry {
  price: number;
  change: number;
  high: number;
  low: number;
  volume: string;
}

export interface MarketPricesResult {
  prices: Record<string, PriceEntry>;
  isLive: boolean;
  isLoading: boolean;
}

function fmt(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(0)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  return `$${n.toFixed(0)}`;
}

const FALLBACK: Record<string, PriceEntry> = {
  "BTC/USD": {
    price: 67420,
    change: 3.4,
    high: 68200,
    low: 65100,
    volume: "$42B",
  },
  "ETH/USD": {
    price: 3521,
    change: 1.8,
    high: 3580,
    low: 3440,
    volume: "$18B",
  },
  "SOL/USD": {
    price: 182.3,
    change: 4.2,
    high: 188.0,
    low: 175.4,
    volume: "$6B",
  },
  "BNB/USD": { price: 594.2, change: 2.6, high: 610, low: 580, volume: "$4B" },
  "EUR/USD": {
    price: 1.0842,
    change: -0.2,
    high: 1.0884,
    low: 1.081,
    volume: "$94B",
  },
  "GBP/USD": {
    price: 1.2615,
    change: 0.5,
    high: 1.266,
    low: 1.254,
    volume: "$32B",
  },
  "USD/JPY": {
    price: 151.24,
    change: -0.3,
    high: 151.9,
    low: 150.6,
    volume: "$78B",
  },
  "AUD/USD": {
    price: 0.6534,
    change: -0.1,
    high: 0.658,
    low: 0.649,
    volume: "$20B",
  },
  "USD/CAD": {
    price: 1.3621,
    change: 0.2,
    high: 1.368,
    low: 1.356,
    volume: "$25B",
  },
};

async function fetchCrypto(): Promise<Record<string, PriceEntry>> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true&include_24h_high=true&include_24h_low=true&include_24h_vol=true",
  );
  const data = await res.json();
  const map: Record<string, PriceEntry> = {};

  const pairs: [string, string][] = [
    ["bitcoin", "BTC/USD"],
    ["ethereum", "ETH/USD"],
    ["solana", "SOL/USD"],
    ["binancecoin", "BNB/USD"],
  ];

  for (const [id, sym] of pairs) {
    const d = data[id];
    if (!d) continue;
    const price: number = d.usd ?? 0;
    const change: number = d.usd_24h_change ?? 0;
    const high: number = d.usd_24h_high ?? price * 1.01;
    const low: number = d.usd_24h_low ?? price * 0.99;
    const vol: number = d.usd_24h_vol ?? 0;
    map[sym] = {
      price,
      change: Number(change.toFixed(2)),
      high,
      low,
      volume: fmt(vol),
    };
  }
  return map;
}

async function fetchForex(): Promise<Record<string, PriceEntry>> {
  const res = await fetch(
    "https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,JPY,AUD,CAD",
  );
  const data = await res.json();
  const rates = data.rates as Record<string, number>;
  const map: Record<string, PriceEntry> = {};

  const calcChange = (fallbackSym: string) =>
    FALLBACK[fallbackSym]?.change ?? 0;

  if (rates.EUR) {
    const p = 1 / rates.EUR;
    map["EUR/USD"] = {
      price: p,
      change: calcChange("EUR/USD"),
      high: p * 1.003,
      low: p * 0.997,
      volume: "$94B",
    };
  }
  if (rates.GBP) {
    const p = 1 / rates.GBP;
    map["GBP/USD"] = {
      price: p,
      change: calcChange("GBP/USD"),
      high: p * 1.003,
      low: p * 0.997,
      volume: "$32B",
    };
  }
  if (rates.JPY) {
    const p = rates.JPY;
    map["USD/JPY"] = {
      price: p,
      change: calcChange("USD/JPY"),
      high: p * 1.003,
      low: p * 0.997,
      volume: "$78B",
    };
  }
  if (rates.AUD) {
    const p = 1 / rates.AUD;
    map["AUD/USD"] = {
      price: p,
      change: calcChange("AUD/USD"),
      high: p * 1.003,
      low: p * 0.997,
      volume: "$20B",
    };
  }
  if (rates.CAD) {
    const p = rates.CAD;
    map["USD/CAD"] = {
      price: p,
      change: calcChange("USD/CAD"),
      high: p * 1.003,
      low: p * 0.997,
      volume: "$25B",
    };
  }

  return map;
}

export function useMarketPrices(): MarketPricesResult {
  const [prices, setPrices] = useState<Record<string, PriceEntry>>(FALLBACK);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const lastPricesRef = useRef<Record<string, PriceEntry>>(FALLBACK);

  const fetchAll = useCallback(async (initial = false) => {
    try {
      const [crypto, forex] = await Promise.all([fetchCrypto(), fetchForex()]);
      const merged = { ...lastPricesRef.current, ...crypto, ...forex };
      lastPricesRef.current = merged;
      setPrices(merged);
      setIsLive(true);
    } catch {
      setIsLive(false);
    } finally {
      if (initial) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll(true);
    const id = setInterval(() => fetchAll(false), 30000);
    return () => clearInterval(id);
  }, [fetchAll]);

  return { prices, isLive, isLoading };
}
