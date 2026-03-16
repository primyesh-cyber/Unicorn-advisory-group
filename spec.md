# Unicorn Advisory Group

## Current State
The Markets page shows hardcoded static prices with a simulated random-walk interval to fake price movement. The TickerTape also uses fully static hardcoded prices. Neither fetches real market data.

## Requested Changes (Diff)

### Add
- Real-time crypto price fetching from CoinGecko public API (BTC, ETH, SOL, BNB) -- no API key needed
- Real-time forex fetching from Frankfurter public API (EUR/USD, GBP/USD, USD/JPY, AUD/USD, USD/CAD)
- TradingView symbol-info embed for metals and oil cards (XAUUSD, XAGUSD, USOIL) to show live prices inline
- Polling every 30 seconds to refresh all live prices
- Loading skeleton state while initial fetch is in progress
- Error fallback: if API call fails, show last known price with a stale indicator

### Modify
- Markets.tsx: replace hardcoded `initialMarkets` prices with live API data; retain card UI, flash animations, and category filter
- TickerTape.tsx: fetch live crypto and forex prices from the same APIs and update the ticker every 30 seconds
- The `change` (24h % change) and `high`/`low` values should also come from API where available

### Remove
- The fake random interval price simulation in PriceCard
- Hardcoded static price values that were being displayed as "live"

## Implementation Plan
1. Create a `useMarketPrices` hook that:
   - Fetches CoinGecko `/simple/price` for bitcoin, ethereum, solana, binancecoin with `include_24hr_change=true&include_24hr_high_24h=true&include_24hr_low_24h=true&include_24hr_vol=true`
   - Fetches Frankfurter `/latest?from=USD&to=EUR,GBP,JPY,AUD,CAD` and inverts rates to get USD-base pairs
   - Merges into a price map keyed by symbol
   - Polls every 30 seconds
2. Markets.tsx: use the hook to hydrate card prices; for XAUUSD/XAGUSD/USOIL cards embed a TradingView mini symbol-info widget (iframe) to show live price -- retain card wrapper styling
3. TickerTape.tsx: use the same hook (or a lightweight version) to show live prices for crypto and forex symbols; metals/oil remain from TradingView embed data or last refreshed value
4. Show a small pulsing green "LIVE" dot only when data is successfully fetched; show "DELAYED" label if API failed
