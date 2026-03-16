import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  Bitcoin,
  ChevronRight,
  DollarSign,
  Globe,
  Shield,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({
  target,
  suffix = "",
}: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function TradingViewChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "OANDA:XAUUSD",
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });

    container.appendChild(script);

    return () => {
      if (container.firstChild) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  }, []);

  return (
    <div
      className="h-[500px] overflow-hidden rounded-2xl"
      style={{
        background: "oklch(0.10 0.025 265)",
        border: "1px solid oklch(0.18 0.03 265)",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <div
        ref={containerRef}
        className="tradingview-widget-container"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

const floatingIcons = [
  {
    Icon: BarChart2,
    delay: 0,
    x: "15%",
    y: "25%",
    color: "oklch(0.82 0.22 155)",
  },
  {
    Icon: Bitcoin,
    delay: 1.5,
    x: "80%",
    y: "15%",
    color: "oklch(0.68 0.22 245)",
  },
  {
    Icon: DollarSign,
    delay: 3,
    x: "70%",
    y: "70%",
    color: "oklch(0.82 0.22 155)",
  },
  {
    Icon: TrendingUp,
    delay: 2,
    x: "10%",
    y: "65%",
    color: "oklch(0.65 0.26 20)",
  },
  {
    Icon: Globe,
    delay: 1,
    x: "88%",
    y: "50%",
    color: "oklch(0.68 0.22 245)",
    name: "globe",
  },
];

const features = [
  {
    icon: Shield,
    title: "Risk Management",
    desc: "Advanced portfolio risk assessment with real-time market monitoring to protect and grow your capital.",
    color: "oklch(0.82 0.22 155)",
  },
  {
    icon: Users,
    title: "Dedicated Advisor",
    desc: "One-on-one dedicated financial advisor assigned to every client for personalized portfolio strategy.",
    color: "oklch(0.68 0.22 245)",
  },
  {
    icon: TrendingUp,
    title: "Multi-Market Access",
    desc: "Trade and invest across Forex, Commodities (XAUUSD, XAGUSD, USOIL) and Crypto markets.",
    color: "oklch(0.65 0.26 20)",
  },
];

const stats = [
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 1200, suffix: "+", label: "Active Clients" },
  { value: 3, suffix: "", label: "Market Segments" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

const testimonials = [
  {
    name: "James Whitfield",
    role: "Institutional Investor",
    text: "Unicorn Advisory transformed my portfolio. Their XAUUSD signals alone have returned 34% this year.",
    rating: 5,
  },
  {
    name: "Priya Mehta",
    role: "Crypto Trader",
    text: "The dedicated advisor model is exceptional. My advisor understood my risk tolerance and built a solid crypto strategy.",
    rating: 5,
  },
  {
    name: "Carlos Rivera",
    role: "Commodity Investor",
    text: "Their USOIL and precious metals analysis is unmatched. I've doubled my commodity portfolio in 18 months.",
    rating: 5,
  },
  {
    name: "Ravi Nair",
    role: "Forex Trader",
    text: "Their EUR/USD analysis is spot on every week. I've grown my account by 27% following Unicorn's guidance.",
    rating: 5,
  },
  {
    name: "Sophie Beaumont",
    role: "Wealth Manager",
    text: "Unicorn Advisory's risk management framework is exactly what my clients needed. Professional, transparent, and results-driven.",
    rating: 5,
  },
  {
    name: "Ahmed Al-Farsi",
    role: "Commodity Investor",
    text: "XAGUSD calls have been incredibly accurate. My silver position is up 40% since I joined the platform.",
    rating: 5,
  },
  {
    name: "Liu Wei",
    role: "Crypto Investor",
    text: "The algo copy trading feature on the $499 plan is a game changer. My BTC and ETH positions are managed automatically with great returns.",
    rating: 5,
  },
  {
    name: "Natasha Volkov",
    role: "Private Investor",
    text: "I was skeptical at first, but after 6 months with Unicorn Advisory my USOIL trades have never been more consistent.",
    rating: 5,
  },
];

function Home() {
  return (
    <div className="relative" style={{ zIndex: 1 }}>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        {/* Floating icons */}
        {floatingIcons.map(({ Icon, delay, x, y, color, name }) => (
          <motion.div
            key={name}
            className="absolute opacity-20 hidden lg:block"
            style={{ left: x, top: y }}
            animate={{ y: ["-12px", "12px", "-12px"] }}
            transition={{
              duration: 6 + delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay,
            }}
          >
            <Icon size={32} style={{ color }} />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
            style={{
              background: "oklch(0.82 0.22 155 / 0.1)",
              border: "1px solid oklch(0.82 0.22 155 / 0.3)",
              color: "oklch(0.82 0.22 155)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-bull animate-pulse" />
            LIVE MARKETS — FOREX · COMMODITIES · CRYPTO
          </div>

          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6">
            <span style={{ color: "oklch(0.92 0.02 265)" }}>Unicorn</span>{" "}
            <span className="gradient-text-bull">Advisory</span>
            <br />
            <span style={{ color: "oklch(0.92 0.02 265)" }}>Group</span>
          </h1>

          <p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.65 0.04 265)" }}
          >
            Your Trusted Partner in Forex, Commodity & Crypto Markets. Expert
            advisors with 8–10 years of experience, dedicated to growing your
            wealth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              data-ocid="hero.primary_button"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300"
              style={{
                background: "oklch(0.82 0.22 155)",
                color: "oklch(0.07 0.02 265)",
                boxShadow: "0 0 30px oklch(0.82 0.22 155 / 0.3)",
              }}
            >
              Get Started
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              to="/advisors"
              data-ocid="hero.secondary_button"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300"
              style={{
                background: "oklch(0.12 0.02 265)",
                border: "1px solid oklch(0.25 0.03 265)",
                color: "oklch(0.82 0.04 265)",
              }}
            >
              Meet Our Advisors
              <ChevronRight size={18} />
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div
            className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
            style={{ borderColor: "oklch(0.82 0.22 155 / 0.4)" }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{ background: "oklch(0.82 0.22 155)" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Live Chart */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              <span style={{ color: "oklch(0.92 0.02 265)" }}>Live </span>
              <span className="gradient-text-bull">Market Chart</span>
            </h2>
            <p className="text-base" style={{ color: "oklch(0.6 0.04 265)" }}>
              Real-time price action across major instruments
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            data-ocid="chart.canvas_target"
          >
            <TradingViewChart />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6 rounded-2xl"
              style={{
                background: "oklch(0.10 0.025 265)",
                border: "1px solid oklch(0.18 0.03 265)",
              }}
            >
              <div
                className="font-display font-bold text-4xl md:text-5xl mb-2"
                style={{ color: "oklch(0.82 0.22 155)" }}
              >
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm" style={{ color: "oklch(0.6 0.04 265)" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              <span style={{ color: "oklch(0.92 0.02 265)" }}>Why Choose </span>
              <span className="gradient-text-bull">Unicorn?</span>
            </h2>
            <p className="text-base" style={{ color: "oklch(0.6 0.04 265)" }}>
              Institutional-grade advisory for individual investors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-2xl"
                style={{
                  background: "oklch(0.10 0.025 265)",
                  border: "1px solid oklch(0.18 0.03 265)",
                  transition: "box-shadow 0.3s",
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: `${f.color.replace(")", " / 0.12)")}`,
                    border: `1px solid ${f.color.replace(")", " / 0.3)")}`,
                  }}
                >
                  <f.icon size={24} style={{ color: f.color }} />
                </div>
                <h3
                  className="font-display font-bold text-xl mb-3"
                  style={{ color: "oklch(0.9 0.02 265)" }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.6 0.04 265)" }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              <span style={{ color: "oklch(0.92 0.02 265)" }}>Client </span>
              <span className="gradient-text-bull">Testimonials</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl"
                style={{
                  background: "oklch(0.10 0.025 265)",
                  border: "1px solid oklch(0.18 0.03 265)",
                }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].slice(0, t.rating).map((n) => (
                    <Star
                      key={n}
                      size={14}
                      fill="oklch(0.82 0.22 155)"
                      style={{ color: "oklch(0.82 0.22 155)" }}
                    />
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "oklch(0.7 0.04 265)" }}
                >
                  "{t.text}"
                </p>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "oklch(0.9 0.02 265)" }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.55 0.04 265)" }}
                  >
                    {t.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-12 text-center relative overflow-hidden"
            style={{
              background: "oklch(0.10 0.025 265)",
              border: "1px solid oklch(0.82 0.22 155 / 0.25)",
              boxShadow: "0 0 60px oklch(0.82 0.22 155 / 0.08)",
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.82 0.22 155 / 0.06) 0%, transparent 70%)",
              }}
            />
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4 relative">
              <span className="gradient-text-bull">Start Growing</span>{" "}
              <span style={{ color: "oklch(0.92 0.02 265)" }}>
                Your Portfolio
              </span>
            </h2>
            <p
              className="mb-8 relative"
              style={{ color: "oklch(0.65 0.04 265)" }}
            >
              Join 1,200+ investors who trust Unicorn Advisory for their
              financial growth.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-base relative"
              style={{
                background: "oklch(0.82 0.22 155)",
                color: "oklch(0.07 0.02 265)",
                boxShadow: "0 0 30px oklch(0.82 0.22 155 / 0.4)",
              }}
            >
              Schedule a Free Consultation
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
