import {
  Award,
  BarChart2,
  Bitcoin,
  Globe,
  Linkedin,
  Star,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

const advisors = [
  {
    name: "Alex Morgan",
    role: "Senior Forex Strategist",
    experience: 10,
    specialization: "Forex",
    markets: ["EUR/USD", "GBP/USD", "USD/JPY"],
    bio: "Former Goldman Sachs FX desk analyst. Alex specializes in G10 currency pairs with a focus on macroeconomic-driven strategies and central bank policy interpretation.",
    stats: { clients: 210, winRate: "74%", avgReturn: "+28%" },
    icon: TrendingUp,
    color: "oklch(0.82 0.22 155)",
    certifications: ["CFA", "CMT"],
  },
  {
    name: "Priyesh Kumar",
    role: "Commodities Specialist",
    experience: 9,
    specialization: "Commodities",
    markets: ["XAUUSD", "XAGUSD", "USOIL"],
    bio: "Ex-Bloomberg commodity analyst with deep expertise in precious metals and energy markets. Sarah's geopolitical analysis framework has guided clients through major market events.",
    stats: { clients: 185, winRate: "71%", avgReturn: "+34%" },
    icon: BarChart2,
    color: "oklch(0.78 0.18 65)",
    certifications: ["CFA", "FRM"],
  },
  {
    name: "Shubham Chaudhary",
    role: "Crypto Portfolio Director",
    experience: 8,
    specialization: "Crypto",
    markets: ["BTC", "ETH", "SOL", "BNB"],
    bio: "Early blockchain adopter and former Coinbase institutional advisor. Marcus builds diversified crypto portfolios aligned with market cycle timing and on-chain data.",
    stats: { clients: 245, winRate: "68%", avgReturn: "+62%" },
    icon: Bitcoin,
    color: "oklch(0.68 0.22 245)",
    certifications: ["CFA", "Blockchain Cert"],
  },
  {
    name: "Priya Sharma",
    role: "Multi-Asset Strategist",
    experience: 9,
    specialization: "Multi-Market",
    markets: ["Forex", "Commodities", "Crypto"],
    bio: "Former JPMorgan cross-asset strategist with a quantitative background. Priya designs holistic multi-asset portfolios that balance growth and risk across all three market segments.",
    stats: { clients: 178, winRate: "76%", avgReturn: "+31%" },
    icon: Globe,
    color: "oklch(0.72 0.2 310)",
    certifications: ["CFA", "CMT", "FRM"],
  },
  {
    name: "David Okonkwo",
    role: "Energy & Metals Analyst",
    experience: 10,
    specialization: "Commodities",
    markets: ["USOIL", "XAUUSD", "Natural Gas"],
    bio: "Fifteen years of energy market experience at Shell Trading before joining Unicorn. David's OPEC and supply-demand modeling is the backbone of our commodity signals.",
    stats: { clients: 156, winRate: "73%", avgReturn: "+39%" },
    icon: BarChart2,
    color: "oklch(0.65 0.26 20)",
    certifications: ["CFA", "Energy Risk"],
  },
  {
    name: "Yuki Tanaka",
    role: "Asian Markets Specialist",
    experience: 8,
    specialization: "Forex",
    markets: ["USD/JPY", "AUD/USD", "NZD/USD"],
    bio: "Former Bank of Japan analyst with unparalleled insight into Asian monetary policy. Yuki's USD/JPY calls have an 80% directional accuracy over the past three years.",
    stats: { clients: 167, winRate: "79%", avgReturn: "+24%" },
    icon: TrendingUp,
    color: "oklch(0.82 0.22 155)",
    certifications: ["CFA", "CMT"],
  },
];

function Advisors() {
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
              background: "oklch(0.72 0.2 310 / 0.1)",
              border: "1px solid oklch(0.72 0.2 310 / 0.3)",
              color: "oklch(0.72 0.2 310)",
            }}
          >
            <Award size={12} />
            CERTIFIED FINANCIAL EXPERTS
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl mb-6">
            <span style={{ color: "oklch(0.92 0.02 265)" }}>Meet Your </span>
            <span className="gradient-text-bull">Advisors</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "oklch(0.6 0.04 265)" }}
          >
            8–10 years of market expertise. Each client gets a dedicated advisor
            matched to their investment goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advisors.map((a) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "oklch(0.10 0.025 265)",
                border: `1px solid ${a.color.replace(")", " / 0.25)")}`,
                transition: "all 0.3s ease",
              }}
            >
              {/* Header */}
              <div
                className="h-3 w-full"
                style={{
                  background: `linear-gradient(90deg, ${a.color}, transparent)`,
                }}
              />

              <div className="p-6">
                {/* Avatar + info */}
                <div className="flex items-start gap-4 mb-5">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0.5,
                    }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      background: a.color.replace(")", " / 0.12)"),
                      border: `1px solid ${a.color.replace(")", " / 0.3)")}`,
                    }}
                  >
                    <a.icon size={26} style={{ color: a.color }} />
                  </motion.div>
                  <div className="flex-1">
                    <h3
                      className="font-display font-bold text-lg"
                      style={{ color: "oklch(0.9 0.02 265)" }}
                    >
                      {a.name}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: a.color }}>
                      {a.role}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      {a.certifications.map((c) => (
                        <span
                          key={c}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: a.color.replace(")", " / 0.08)"),
                            color: a.color,
                            border: `1px solid ${a.color.replace(")", " / 0.2)")}`,
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Experience badge */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg mb-4 text-xs font-semibold"
                  style={{
                    background: "oklch(0.82 0.22 155 / 0.08)",
                    border: "1px solid oklch(0.82 0.22 155 / 0.2)",
                    color: "oklch(0.82 0.22 155)",
                  }}
                >
                  <Award size={11} />
                  {a.experience} Years Experience
                </div>

                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "oklch(0.6 0.04 265)" }}
                >
                  {a.bio}
                </p>

                {/* Markets */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {a.markets.map((m) => (
                    <span
                      key={m}
                      className="text-xs px-2 py-1 rounded-md font-mono"
                      style={{
                        background: "oklch(0.14 0.02 265)",
                        color: "oklch(0.65 0.04 265)",
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div
                  className="grid grid-cols-3 gap-3 pt-4"
                  style={{ borderTop: "1px solid oklch(0.17 0.02 265)" }}
                >
                  {[
                    { label: "Clients", value: a.stats.clients },
                    { label: "Win Rate", value: a.stats.winRate },
                    { label: "Avg Return", value: a.stats.avgReturn },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div
                        className="font-mono font-bold text-sm"
                        style={{ color: a.color }}
                      >
                        {s.value}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "oklch(0.45 0.03 265)" }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-10 rounded-2xl"
          style={{
            background: "oklch(0.10 0.025 265)",
            border: "1px solid oklch(0.82 0.22 155 / 0.2)",
          }}
        >
          <h3
            className="font-display font-bold text-2xl mb-3"
            style={{ color: "oklch(0.9 0.02 265)" }}
          >
            Get Matched With Your Advisor
          </h3>
          <p className="text-sm mb-6" style={{ color: "oklch(0.6 0.04 265)" }}>
            Tell us your investment goals and we'll pair you with the perfect
            advisor.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm"
            style={{
              background: "oklch(0.82 0.22 155)",
              color: "oklch(0.07 0.02 265)",
              boxShadow: "0 0 20px oklch(0.82 0.22 155 / 0.3)",
            }}
          >
            Find My Advisor
            <TrendingUp size={16} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default Advisors;
