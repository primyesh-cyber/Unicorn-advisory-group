import {
  BarChart2,
  Bitcoin,
  Clock,
  Droplets,
  Shield,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    category: "Forex Advisory",
    icon: TrendingUp,
    color: "oklch(0.82 0.22 155)",
    bgColor: "oklch(0.82 0.22 155 / 0.08)",
    borderColor: "oklch(0.82 0.22 155 / 0.25)",
    glowColor: "oklch(0.82 0.22 155 / 0.12)",
    description:
      "Navigate the world's largest financial market with precision. Our Forex advisory covers major, minor, and exotic currency pairs with real-time signal delivery.",
    instruments: [
      "EUR/USD",
      "GBP/USD",
      "USD/JPY",
      "AUD/USD",
      "USD/CAD",
      "USD/CHF",
    ],
    features: [
      "Real-time entry/exit signals",
      "Risk-reward analysis",
      "Economic calendar alerts",
      "24/5 market coverage",
    ],
  },
  {
    category: "Commodity Advisory",
    icon: BarChart2,
    color: "oklch(0.78 0.18 65)",
    bgColor: "oklch(0.78 0.18 65 / 0.08)",
    borderColor: "oklch(0.78 0.18 65 / 0.25)",
    glowColor: "oklch(0.78 0.18 65 / 0.12)",
    description:
      "Capitalize on precious metals and energy markets. Specialized coverage of gold, silver, and crude oil with macro-driven insights and technical precision.",
    instruments: ["XAUUSD (Gold)", "XAGUSD (Silver)", "USOIL (Crude)"],
    features: [
      "Precious metals positioning",
      "Energy market analysis",
      "Seasonal trend tracking",
      "Geopolitical risk alerts",
    ],
  },
  {
    category: "Crypto Advisory",
    icon: Bitcoin,
    color: "oklch(0.68 0.22 245)",
    bgColor: "oklch(0.68 0.22 245 / 0.08)",
    borderColor: "oklch(0.68 0.22 245 / 0.25)",
    glowColor: "oklch(0.68 0.22 245 / 0.12)",
    description:
      "Ride the digital asset revolution with confidence. From BTC and ETH to altcoin portfolio construction, we deliver data-driven crypto advisory.",
    instruments: ["BTC/USD", "ETH/USD", "BNB/USD", "SOL/USD", "XRP/USD"],
    features: [
      "On-chain analytics",
      "DeFi opportunity alerts",
      "Portfolio rebalancing",
      "Market cycle timing",
    ],
  },
];

const additionalFeatures = [
  {
    icon: Shield,
    title: "Risk Management",
    desc: "Stop-loss and take-profit levels with every signal",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Round-the-clock advisory team for urgent queries",
  },
  {
    icon: Target,
    title: "Precision Signals",
    desc: "High-accuracy entry and exit points",
  },
  {
    icon: Zap,
    title: "Instant Alerts",
    desc: "SMS, email, and app push notifications",
  },
];

function Services() {
  return (
    <div className="relative pt-28 pb-20 px-4" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "oklch(0.82 0.22 155 / 0.1)",
              border: "1px solid oklch(0.82 0.22 155 / 0.3)",
              color: "oklch(0.82 0.22 155)",
            }}
          >
            EXPERT ADVISORY SERVICES
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl mb-6">
            <span style={{ color: "oklch(0.92 0.02 265)" }}>Our </span>
            <span className="gradient-text-bull">Services</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "oklch(0.6 0.04 265)" }}
          >
            Comprehensive financial advisory across three major asset classes,
            powered by institutional-grade analysis.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {services.map((s) => (
            <motion.div
              key={s.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
              whileHover={{ y: -8, boxShadow: `0 30px 60px ${s.glowColor}` }}
              className="rounded-2xl p-8 flex flex-col"
              style={{
                background: "oklch(0.10 0.025 265)",
                border: `1px solid ${s.borderColor}`,
                transition: "all 0.3s ease",
              }}
            >
              {/* Icon */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 1,
                }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  background: s.bgColor,
                  border: `1px solid ${s.borderColor}`,
                }}
              >
                <s.icon size={28} style={{ color: s.color }} />
              </motion.div>

              <h2
                className="font-display font-bold text-2xl mb-3"
                style={{ color: "oklch(0.9 0.02 265)" }}
              >
                {s.category}
              </h2>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "oklch(0.6 0.04 265)" }}
              >
                {s.description}
              </p>

              {/* Instruments */}
              <div className="mb-6">
                <div
                  className="text-xs font-semibold mb-3 uppercase tracking-wider"
                  style={{ color: s.color }}
                >
                  Instruments
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.instruments.map((inst) => (
                    <span
                      key={inst}
                      className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
                      style={{
                        background: s.bgColor,
                        border: `1px solid ${s.borderColor}`,
                        color: s.color,
                      }}
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mt-auto">
                <div
                  className="text-xs font-semibold mb-3 uppercase tracking-wider"
                  style={{ color: s.color }}
                >
                  What You Get
                </div>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "oklch(0.7 0.04 265)" }}
                    >
                      <TrendingUp
                        size={12}
                        style={{ color: s.color, flexShrink: 0 }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {additionalFeatures.map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-xl text-center"
              style={{
                background: "oklch(0.10 0.025 265)",
                border: "1px solid oklch(0.18 0.03 265)",
              }}
            >
              <f.icon
                size={24}
                className="mx-auto mb-3"
                style={{ color: "oklch(0.82 0.22 155)" }}
              />
              <div
                className="font-semibold text-sm mb-1"
                style={{ color: "oklch(0.9 0.02 265)" }}
              >
                {f.title}
              </div>
              <div
                className="text-xs"
                style={{ color: "oklch(0.55 0.04 265)" }}
              >
                {f.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Services;
