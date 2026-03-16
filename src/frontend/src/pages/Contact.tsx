import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { IndustryType } from "../backend.d";
import { useActor } from "../hooks/useActor";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "One Financial Plaza, New York, NY 10005",
  },
  { icon: Phone, label: "Phone", value: "+1 (212) 555-0182" },
  { icon: Mail, label: "Email", value: "advisory@unicorngroup.com" },
  { icon: Clock, label: "Hours", value: "Mon–Fri: 7AM–8PM EST" },
];

function Contact() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    market: "" as IndustryType | "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Invalid email address";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.market) e.market = "Please select a market interest";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.submitContactInquiry(
        form.name,
        form.email,
        form.phone,
        form.market as IndustryType,
        form.message,
      );
    },
    onSuccess: () => {
      toast.success(
        "Your inquiry has been submitted! We'll reach out within 24 hours.",
      );
      setForm({ name: "", email: "", phone: "", market: "", message: "" });
      setErrors({});
    },
    onError: () => {
      toast.error(
        "Submission failed. Please try again or contact us directly.",
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate();
  };

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
              background: "oklch(0.68 0.22 245 / 0.1)",
              border: "1px solid oklch(0.68 0.22 245 / 0.3)",
              color: "oklch(0.68 0.22 245)",
            }}
          >
            GET IN TOUCH
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl mb-6">
            <span style={{ color: "oklch(0.92 0.02 265)" }}>Start Your </span>
            <span className="gradient-text-bull">Journey</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "oklch(0.6 0.04 265)" }}
          >
            Speak to a dedicated advisor within 24 hours. Free initial
            consultation, no commitment required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((c) => (
              <div
                key={c.label}
                className="flex items-start gap-4 p-5 rounded-xl"
                style={{
                  background: "oklch(0.10 0.025 265)",
                  border: "1px solid oklch(0.18 0.03 265)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: "oklch(0.82 0.22 155 / 0.1)",
                    border: "1px solid oklch(0.82 0.22 155 / 0.25)",
                  }}
                >
                  <c.icon size={16} style={{ color: "oklch(0.82 0.22 155)" }} />
                </div>
                <div>
                  <div
                    className="text-xs font-semibold mb-0.5"
                    style={{ color: "oklch(0.55 0.04 265)" }}
                  >
                    {c.label}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "oklch(0.85 0.03 265)" }}
                  >
                    {c.value}
                  </div>
                </div>
              </div>
            ))}

            <div
              className="p-6 rounded-xl mt-6"
              style={{
                background: "oklch(0.10 0.025 265)",
                border: "1px solid oklch(0.82 0.22 155 / 0.2)",
              }}
            >
              <h3
                className="font-display font-bold text-lg mb-3"
                style={{ color: "oklch(0.9 0.02 265)" }}
              >
                Free Consultation
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.6 0.04 265)" }}
              >
                Book a 30-minute free consultation with one of our expert
                advisors. No commitment, no fees — just expert guidance.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div
              className="p-8 rounded-2xl"
              style={{
                background: "oklch(0.10 0.025 265)",
                border: "1px solid oklch(0.18 0.03 265)",
              }}
            >
              {/* Success state */}
              {mutation.isSuccess && (
                <div
                  data-ocid="contact.success_state"
                  className="flex items-center gap-3 p-4 rounded-xl mb-6"
                  style={{
                    background: "oklch(0.82 0.22 155 / 0.08)",
                    border: "1px solid oklch(0.82 0.22 155 / 0.3)",
                  }}
                >
                  <CheckCircle
                    size={18}
                    style={{ color: "oklch(0.82 0.22 155)" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "oklch(0.82 0.22 155)" }}
                  >
                    Inquiry submitted! We'll contact you within 24 hours.
                  </span>
                </div>
              )}

              {/* Error state */}
              {mutation.isError && (
                <div
                  data-ocid="contact.error_state"
                  className="flex items-center gap-3 p-4 rounded-xl mb-6"
                  style={{
                    background: "oklch(0.65 0.26 20 / 0.08)",
                    border: "1px solid oklch(0.65 0.26 20 / 0.3)",
                  }}
                >
                  <AlertCircle
                    size={18}
                    style={{ color: "oklch(0.65 0.26 20)" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "oklch(0.65 0.26 20)" }}
                  >
                    Submission failed. Please try again.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <Label
                      className="text-sm font-medium mb-2 block"
                      style={{ color: "oklch(0.75 0.04 265)" }}
                    >
                      Full Name *
                    </Label>
                    <Input
                      data-ocid="contact.name.input"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="James Whitfield"
                      className="h-11"
                      style={{
                        background: "oklch(0.08 0.02 265)",
                        border: errors.name
                          ? "1px solid oklch(0.65 0.26 20)"
                          : "1px solid oklch(0.2 0.02 265)",
                        color: "oklch(0.9 0.02 265)",
                      }}
                    />
                    {errors.name && (
                      <p
                        className="text-xs mt-1"
                        style={{ color: "oklch(0.65 0.26 20)" }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label
                      className="text-sm font-medium mb-2 block"
                      style={{ color: "oklch(0.75 0.04 265)" }}
                    >
                      Email Address *
                    </Label>
                    <Input
                      data-ocid="contact.email.input"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="james@example.com"
                      className="h-11"
                      style={{
                        background: "oklch(0.08 0.02 265)",
                        border: errors.email
                          ? "1px solid oklch(0.65 0.26 20)"
                          : "1px solid oklch(0.2 0.02 265)",
                        color: "oklch(0.9 0.02 265)",
                      }}
                    />
                    {errors.email && (
                      <p
                        className="text-xs mt-1"
                        style={{ color: "oklch(0.65 0.26 20)" }}
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <Label
                    className="text-sm font-medium mb-2 block"
                    style={{ color: "oklch(0.75 0.04 265)" }}
                  >
                    Phone Number *
                  </Label>
                  <Input
                    data-ocid="contact.phone.input"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="+1 (212) 555-0100"
                    className="h-11"
                    style={{
                      background: "oklch(0.08 0.02 265)",
                      border: errors.phone
                        ? "1px solid oklch(0.65 0.26 20)"
                        : "1px solid oklch(0.2 0.02 265)",
                      color: "oklch(0.9 0.02 265)",
                    }}
                  />
                  {errors.phone && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: "oklch(0.65 0.26 20)" }}
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Market Interest */}
                <div>
                  <Label
                    className="text-sm font-medium mb-2 block"
                    style={{ color: "oklch(0.75 0.04 265)" }}
                  >
                    Market Interest *
                  </Label>
                  <Select
                    value={form.market}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, market: v as IndustryType }))
                    }
                  >
                    <SelectTrigger
                      data-ocid="contact.market.select"
                      className="h-11"
                      style={{
                        background: "oklch(0.08 0.02 265)",
                        border: errors.market
                          ? "1px solid oklch(0.65 0.26 20)"
                          : "1px solid oklch(0.2 0.02 265)",
                        color: form.market
                          ? "oklch(0.9 0.02 265)"
                          : "oklch(0.45 0.03 265)",
                      }}
                    >
                      <SelectValue placeholder="Select your primary interest" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        background: "oklch(0.1 0.025 265)",
                        border: "1px solid oklch(0.2 0.02 265)",
                      }}
                    >
                      <SelectItem value={IndustryType.forex}>Forex</SelectItem>
                      <SelectItem value={IndustryType.commodity}>
                        Commodity (Gold, Silver, Oil)
                      </SelectItem>
                      <SelectItem value={IndustryType.crypto}>
                        Cryptocurrency
                      </SelectItem>
                      <SelectItem value={IndustryType.all}>
                        All Markets
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.market && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: "oklch(0.65 0.26 20)" }}
                    >
                      {errors.market}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <Label
                    className="text-sm font-medium mb-2 block"
                    style={{ color: "oklch(0.75 0.04 265)" }}
                  >
                    Message *
                  </Label>
                  <Textarea
                    data-ocid="contact.message.textarea"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell us about your investment goals, current portfolio size, and what kind of advisory you're looking for..."
                    rows={5}
                    style={{
                      background: "oklch(0.08 0.02 265)",
                      border: errors.message
                        ? "1px solid oklch(0.65 0.26 20)"
                        : "1px solid oklch(0.2 0.02 265)",
                      color: "oklch(0.9 0.02 265)",
                      resize: "none",
                    }}
                  />
                  {errors.message && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: "oklch(0.65 0.26 20)" }}
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={mutation.isPending}
                  className="w-full h-12 font-semibold text-base rounded-xl"
                  style={{
                    background: mutation.isPending
                      ? "oklch(0.5 0.1 155)"
                      : "oklch(0.82 0.22 155)",
                    color: "oklch(0.07 0.02 265)",
                    boxShadow: mutation.isPending
                      ? "none"
                      : "0 0 20px oklch(0.82 0.22 155 / 0.3)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {mutation.isPending ? (
                    <span
                      data-ocid="contact.loading_state"
                      className="flex items-center gap-2"
                    >
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    "Submit Inquiry"
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
