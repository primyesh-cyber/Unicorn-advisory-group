import { Check } from "lucide-react";
import { motion } from "motion/react";

const plans = [
  {
    id: 1,
    price: "$299",
    label: "Essential Plan",
    features: [
      "Personal advisory access",
      "Forex, Commodity & Crypto signals",
      "XAUUSD, XAGUSD, USOIL coverage",
      "Daily market briefings",
      "Dedicated advisor (8-10 yrs exp)",
    ],
    highlight: false,
    cta: "Get Started",
  },
  {
    id: 2,
    price: "$499",
    label: "Pro Plan",
    features: [
      "Everything in Essential",
      "Priority advisor access",
      "Advanced portfolio management",
      "Real-time trade alerts",
      "Algo Copy Trading included",
    ],
    highlight: true,
    cta: "Go Pro",
    badge: "Best Value",
  },
];

export default function Pricing() {
  return (
    <section className="min-h-screen pt-28 pb-20 px-4" data-ocid="pricing.page">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.82 0.22 155)" }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
          >
            Zero Risk to Start
          </motion.p>
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ color: "oklch(0.96 0.01 265)" }}
          >
            Payment Only When You{" "}
            <span style={{ color: "oklch(0.82 0.22 155)" }}>
              Make Your First $200
            </span>
          </h1>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "oklch(0.65 0.04 265)" }}
          >
            No upfront risk. Your subscription begins only after your portfolio
            hits its first $200 in gains.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              data-ocid={`pricing.plan.${plan.id}.card`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="relative rounded-2xl p-8 flex flex-col"
              style={{
                background: plan.highlight
                  ? "oklch(0.11 0.025 265)"
                  : "oklch(0.09 0.02 265)",
                border: plan.highlight
                  ? "1.5px solid oklch(0.82 0.22 155 / 0.6)"
                  : "1px solid oklch(0.82 0.22 155 / 0.15)",
                boxShadow: plan.highlight
                  ? "0 0 40px oklch(0.82 0.22 155 / 0.12)"
                  : "none",
              }}
            >
              {plan.badge && (
                <span
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: "oklch(0.82 0.22 155)",
                    color: "oklch(0.07 0.02 265)",
                  }}
                >
                  {plan.badge}
                </span>
              )}

              <p
                className="text-sm font-semibold uppercase tracking-widest mb-2"
                style={{ color: "oklch(0.82 0.22 155)" }}
              >
                {plan.label}
              </p>

              <div className="flex items-end gap-1 mb-6">
                <span
                  className="text-5xl font-extrabold"
                  style={{ color: "oklch(0.96 0.01 265)" }}
                >
                  {plan.price}
                </span>
                <span
                  className="mb-2 text-sm"
                  style={{ color: "oklch(0.55 0.04 265)" }}
                >
                  / month
                </span>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "oklch(0.82 0.22 155)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "oklch(0.78 0.03 265)" }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="/contact"
                data-ocid={`pricing.plan.${plan.id}.primary_button`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="block text-center py-3 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background: plan.highlight
                    ? "oklch(0.82 0.22 155)"
                    : "transparent",
                  color: plan.highlight
                    ? "oklch(0.07 0.02 265)"
                    : "oklch(0.82 0.22 155)",
                  border: plan.highlight
                    ? "none"
                    : "1.5px solid oklch(0.82 0.22 155 / 0.5)",
                }}
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm mt-12"
          style={{ color: "oklch(0.5 0.03 265)" }}
        >
          Your payment is triggered only after your account records its first
          $200 in profit. No hidden fees, no lock-in contracts.
        </motion.p>
      </div>
    </section>
  );
}
