import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home", ocid: "nav.home.link" },
  { to: "/services", label: "Services", ocid: "nav.services.link" },
  { to: "/markets", label: "Markets", ocid: "nav.markets.link" },
  { to: "/advisors", label: "Advisors", ocid: "nav.advisors.link" },
  { to: "/pricing", label: "Pricing", ocid: "nav.pricing.link" },
  { to: "/contact", label: "Contact", ocid: "nav.contact.link" },
  { to: "/admin", label: "Admin", ocid: "nav.admin.link" },
];

function UnicornLogo() {
  return (
    <motion.div
      className="relative flex-shrink-0"
      style={{ height: 48, width: "auto" }}
      animate={{
        filter: [
          "drop-shadow(0 0 6px oklch(0.55 0.18 260 / 0.5))",
          "drop-shadow(0 0 14px oklch(0.55 0.18 260 / 0.85))",
          "drop-shadow(0 0 6px oklch(0.55 0.18 260 / 0.5))",
        ],
      }}
      transition={{
        duration: 2.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <motion.img
        src="/assets/uploads/file_000000000fa472089b79781760bf5b31-1.png"
        alt="Unicorn Advisory Logo"
        style={{ height: 48, width: "auto", objectFit: "contain" }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0"
      style={{
        zIndex: 100,
        background: scrolled
          ? "oklch(0.06 0.02 265 / 0.95)"
          : "oklch(0.06 0.02 265 / 0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid oklch(0.82 0.22 155 / 0.15)",
        transition: "all 0.3s ease",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <UnicornLogo />
            <span className="font-display font-bold text-lg">
              <span style={{ color: "oklch(0.82 0.22 155)" }}>Unicorn</span>
              <span style={{ color: "oklch(0.92 0.02 265)" }}> Advisory</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  data-ocid={l.ocid}
                  className={`nav-link-underline px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${active ? "active" : ""}`}
                  style={{
                    color: active
                      ? "oklch(0.82 0.22 155)"
                      : "oklch(0.75 0.04 265)",
                    background: active
                      ? "oklch(0.82 0.22 155 / 0.08)"
                      : "transparent",
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden md:block px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{
                background: "oklch(0.82 0.22 155)",
                color: "oklch(0.07 0.02 265)",
              }}
            >
              Get Started
            </Link>
            <button
              type="button"
              className="md:hidden p-2 rounded-md"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: "oklch(0.75 0.04 265)" }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "oklch(0.06 0.02 265 / 0.98)",
              borderBottom: "1px solid oklch(0.82 0.22 155 / 0.15)",
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  data-ocid={l.ocid}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium rounded-lg"
                  style={{ color: "oklch(0.85 0.04 265)" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
