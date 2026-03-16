import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Inbox, LogOut, ShieldCheck, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { ContactInquiry } from "../backend.d.ts";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const marketBadgeStyle: Record<string, { bg: string; color: string }> = {
  forex: { bg: "oklch(0.55 0.18 260 / 0.2)", color: "oklch(0.75 0.18 260)" },
  crypto: { bg: "oklch(0.82 0.22 155 / 0.15)", color: "oklch(0.82 0.22 155)" },
  commodity: { bg: "oklch(0.75 0.18 60 / 0.2)", color: "oklch(0.82 0.18 70)" },
  all: { bg: "oklch(0.65 0.2 330 / 0.2)", color: "oklch(0.78 0.2 330)" },
};

const STAT_LABELS = [
  "Total Enquiries",
  "Unique Markets",
  "Admin Session",
] as const;

function MarketBadge({ market }: { market: string }) {
  const style = marketBadgeStyle[market] ?? marketBadgeStyle.all;
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold capitalize"
      style={{ background: style.bg, color: style.color }}
    >
      {market}
    </span>
  );
}

function LoginGate({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          className="w-full max-w-md border-0"
          style={{
            background: "oklch(0.10 0.025 265)",
            border: "1px solid oklch(0.82 0.22 155 / 0.2)",
            boxShadow: "0 0 60px oklch(0.82 0.22 155 / 0.08)",
          }}
        >
          <CardHeader className="items-center text-center pb-4">
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 8px oklch(0.82 0.22 155 / 0.4))",
                  "drop-shadow(0 0 20px oklch(0.82 0.22 155 / 0.8))",
                  "drop-shadow(0 0 8px oklch(0.82 0.22 155 / 0.4))",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="mb-4"
            >
              <ShieldCheck
                size={48}
                style={{ color: "oklch(0.82 0.22 155)" }}
              />
            </motion.div>
            <CardTitle
              className="text-2xl font-display font-bold"
              style={{ color: "oklch(0.92 0.02 265)" }}
            >
              Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-sm" style={{ color: "oklch(0.6 0.04 265)" }}>
              Authenticate with Internet Identity to access the enquiries
              dashboard for Unicorn Advisory Group.
            </p>
            <Button
              data-ocid="admin.login_button"
              onClick={onLogin}
              className="w-full font-semibold py-6 text-base"
              style={{
                background: "oklch(0.82 0.22 155)",
                color: "oklch(0.07 0.02 265)",
              }}
            >
              <ShieldCheck className="mr-2" size={18} />
              Login with Internet Identity
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function AdminDashboard() {
  const { login, clear, identity } = useInternetIdentity();
  const { actor, isFetching: actorLoading } = useActor();
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!identity;

  useEffect(() => {
    if (!isAuthenticated || !actor || actorLoading) return;
    setLoading(true);
    setError(null);
    actor
      .getAllContacts()
      .then((data) => setContacts(data))
      .catch(() => setError("Failed to load enquiries. Please try again."))
      .finally(() => setLoading(false));
  }, [isAuthenticated, actor, actorLoading]);

  if (!isAuthenticated) {
    return <LoginGate onLogin={login} />;
  }

  const statsData = [
    {
      icon: <Inbox size={22} />,
      label: STAT_LABELS[0],
      value: loading ? "—" : contacts.length,
      color: "oklch(0.82 0.22 155)",
    },
    {
      icon: <Users size={22} />,
      label: STAT_LABELS[1],
      value: loading
        ? "—"
        : new Set(contacts.map((c) => c.marketInterest)).size,
      color: "oklch(0.75 0.18 260)",
    },
    {
      icon: <ShieldCheck size={22} />,
      label: STAT_LABELS[2],
      value: "Active",
      color: "oklch(0.82 0.22 155)",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1
              className="text-3xl font-display font-bold"
              style={{ color: "oklch(0.92 0.02 265)" }}
            >
              <span style={{ color: "oklch(0.82 0.22 155)" }}>Enquiry</span>{" "}
              Dashboard
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "oklch(0.55 0.04 265)" }}
            >
              All contact form submissions from Unicorn Advisory Group
            </p>
          </div>
          <Button
            data-ocid="admin.logout_button"
            variant="outline"
            onClick={clear}
            className="flex items-center gap-2 font-medium"
            style={{
              borderColor: "oklch(0.82 0.18 15 / 0.5)",
              color: "oklch(0.75 0.18 15)",
              background: "oklch(0.82 0.18 15 / 0.08)",
            }}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {statsData.map((stat) => (
            <Card
              key={stat.label}
              className="border-0"
              style={{
                background: "oklch(0.10 0.025 265)",
                border: "1px solid oklch(0.82 0.22 155 / 0.12)",
              }}
            >
              <CardContent className="flex items-center gap-4 pt-5 pb-5">
                <span style={{ color: stat.color }}>{stat.icon}</span>
                <div>
                  <p
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.55 0.04 265)" }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="text-2xl font-bold font-display"
                    style={{ color: "oklch(0.92 0.02 265)" }}
                  >
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card
            className="border-0 overflow-hidden"
            style={{
              background: "oklch(0.10 0.025 265)",
              border: "1px solid oklch(0.82 0.22 155 / 0.12)",
            }}
          >
            <CardHeader>
              <CardTitle
                className="text-lg font-display"
                style={{ color: "oklch(0.82 0.22 155)" }}
              >
                Contact Enquiries
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading && (
                <div data-ocid="admin.loading_state" className="p-6 space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton
                      key={i}
                      className="h-10 w-full rounded-md"
                      style={{ background: "oklch(0.14 0.025 265)" }}
                    />
                  ))}
                </div>
              )}

              {!loading && error && (
                <div
                  data-ocid="admin.error_state"
                  className="p-10 text-center"
                  style={{ color: "oklch(0.75 0.18 15)" }}
                >
                  <p className="font-semibold">{error}</p>
                </div>
              )}

              {!loading && !error && contacts.length === 0 && (
                <div
                  data-ocid="admin.empty_state"
                  className="p-16 text-center flex flex-col items-center gap-3"
                >
                  <Inbox size={40} style={{ color: "oklch(0.35 0.04 265)" }} />
                  <p
                    className="font-medium"
                    style={{ color: "oklch(0.55 0.04 265)" }}
                  >
                    No enquiries yet
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "oklch(0.4 0.04 265)" }}
                  >
                    Submitted contact forms will appear here.
                  </p>
                </div>
              )}

              {!loading && !error && contacts.length > 0 && (
                <div className="overflow-x-auto">
                  <Table data-ocid="admin.table">
                    <TableHeader>
                      <TableRow
                        style={{
                          borderBottomColor: "oklch(0.82 0.22 155 / 0.12)",
                        }}
                      >
                        {[
                          "Name",
                          "Email",
                          "Phone",
                          "Market Interest",
                          "Message",
                        ].map((h) => (
                          <TableHead
                            key={h}
                            className="text-xs font-semibold uppercase tracking-wider"
                            style={{ color: "oklch(0.55 0.04 265)" }}
                          >
                            {h}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact, idx) => (
                        <TableRow
                          key={`${contact.email}-${contact.name}-${idx}`}
                          data-ocid={`admin.row.${idx + 1}`}
                          className="transition-colors duration-150"
                          style={{
                            borderBottomColor: "oklch(0.15 0.025 265)",
                          }}
                        >
                          <TableCell
                            className="font-medium"
                            style={{ color: "oklch(0.9 0.02 265)" }}
                          >
                            {contact.name}
                          </TableCell>
                          <TableCell
                            className="text-sm"
                            style={{ color: "oklch(0.7 0.04 265)" }}
                          >
                            <a
                              href={`mailto:${contact.email}`}
                              style={{ color: "oklch(0.82 0.22 155)" }}
                              className="hover:underline"
                            >
                              {contact.email}
                            </a>
                          </TableCell>
                          <TableCell
                            className="text-sm"
                            style={{ color: "oklch(0.7 0.04 265)" }}
                          >
                            {contact.phone || "—"}
                          </TableCell>
                          <TableCell>
                            <MarketBadge market={contact.marketInterest} />
                          </TableCell>
                          <TableCell
                            className="text-sm max-w-xs"
                            style={{ color: "oklch(0.65 0.04 265)" }}
                          >
                            <span
                              className="line-clamp-2"
                              title={contact.message}
                            >
                              {contact.message}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
