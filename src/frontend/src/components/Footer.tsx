import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Youtube } from "lucide-react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "oklch(0.05 0.02 265)",
        borderTop: "1px solid oklch(0.82 0.22 155 / 0.15)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/uploads/file_000000000fa472089b79781760bf5b31-1-1.png"
                alt="Unicorn Advisory Group Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="font-display font-bold text-lg">
                <span style={{ color: "oklch(0.82 0.22 155)" }}>Unicorn</span>
                <span style={{ color: "oklch(0.92 0.02 265)" }}>
                  {" "}
                  Advisory Group
                </span>
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "oklch(0.6 0.04 265)" }}
            >
              Your trusted partner in Forex, Commodity & Crypto markets. We
              provide dedicated financial advisory services backed by 8-10 years
              of market expertise.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Twitter, name: "twitter" },
                { Icon: Linkedin, name: "linkedin" },
                { Icon: Youtube, name: "youtube" },
              ].map(({ Icon, name }) => (
                <a
                  key={name}
                  href="https://unicornadvisory.com"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "oklch(0.12 0.02 265)",
                    border: "1px solid oklch(0.2 0.02 265)",
                    color: "oklch(0.6 0.04 265)",
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Markets */}
          <div>
            <h4
              className="font-display font-bold text-sm mb-4"
              style={{ color: "oklch(0.82 0.22 155)" }}
            >
              Markets
            </h4>
            <ul className="space-y-2">
              {[
                "Forex Trading",
                "XAUUSD (Gold)",
                "XAGUSD (Silver)",
                "USOIL (Crude)",
                "Crypto Assets",
              ].map((m) => (
                <li key={m}>
                  <span
                    className="text-sm transition-colors cursor-default"
                    style={{ color: "oklch(0.6 0.04 265)" }}
                  >
                    {m}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4
              className="font-display font-bold text-sm mb-4"
              style={{ color: "oklch(0.82 0.22 155)" }}
            >
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/services", label: "Services" },
                { to: "/advisors", label: "Our Advisors" },
                { to: "/contact", label: "Contact Us" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm hover:text-bull transition-colors"
                    style={{ color: "oklch(0.6 0.04 265)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6"
          style={{ borderTop: "1px solid oklch(0.15 0.02 265)" }}
        >
          <p className="text-xs" style={{ color: "oklch(0.45 0.03 265)" }}>
            © {year} Unicorn Advisory Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
