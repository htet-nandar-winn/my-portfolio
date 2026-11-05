import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { contact, profile } from "../data/portfolio";
import Badge from "./Badge";
import Button from "./Button";
import Container from "./Container";
import Reveal from "./Reveal";
import Section from "./Section";
import { GithubIcon, MailIcon } from "./Icons";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    phone: "",
    subject: `Portfolio contact`,
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState({});
  const dismissTimer = useRef(null);

  const dismissNotification = () => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    setStatus("idle");
  };

  /* Auto-hide success notification after 5 seconds */
  useEffect(() => {
    if (status !== "sent") return;
    dismissTimer.current = setTimeout(() => setStatus("idle"), 5000);
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.from_name.trim()) nextErrors.from_name = "Name is required";
    if (!form.from_email.trim()) nextErrors.from_email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.from_email)) {
      nextErrors.from_email = "Enter a valid email address";
    }
    if (!form.message.trim()) nextErrors.message = "Message is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    if (!validate()) return;

    // Auto-generate subject with sender name
    setForm((prev) => ({ ...prev, subject: `Portfolio contact from ${prev.from_name}` }));

    setStatus("sending");

    /* When EmailJS is configured, send via EmailJS. Otherwise fall back to
       opening the user's default email app (mailto:) so the form always works. */
    if (isConfigured) {
      try {
        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, event.target, PUBLIC_KEY);
        setStatus("sent");
        setForm({
          from_name: "",
          from_email: "",
          phone: "",
          subject: `Portfolio contact`,
          message: "",
        });
        setErrors({});
      } catch (error) {
        console.error("EmailJS send failed:", error);
        setStatus("error");
      }
    } else {
      const body =
        `Name: ${form.from_name}\n` +
        `Email: ${form.from_email}\n` +
        `Phone: ${form.phone || "—"}\n\n` +
        `Message:\n${form.message}`;
      const mailtoUrl =
        `mailto:${profile.email}?` +
        `subject=${encodeURIComponent(`Portfolio contact from ${form.from_name}`)}&` +
        `body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
      setStatus("sent");
      setForm({
        from_name: "",
        from_email: "",
        phone: "",
        subject: `Portfolio contact`,
        message: "",
      });
      setErrors({});
    }
  };

  const isPlaceholder = (value) =>
    !value || value.includes("_here") || value.includes("your_") || value.includes("placeholder");

  const isConfigured = Boolean(
    SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY &&
    !isPlaceholder(SERVICE_ID) &&
    !isPlaceholder(TEMPLATE_ID) &&
    !isPlaceholder(PUBLIC_KEY),
  );

  return (
    <Section
      id="contact"
      aria-labelledby="contact-heading"
      className="overflow-hidden border-t border-border"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-purple/10 blur-[130px]"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---------------- Invitation ---------------- */}
          <div className="min-w-0">
            <Reveal>
              <p className="eyebrow">06 — Contact</p>
              <h2 id="contact-heading" className="section-heading mt-6">
                Let&apos;s Connect Together
              </h2>
              <div className="mt-5">
                {contact.availability && (
                  <Badge tone="blue">{contact.availability}</Badge>
                )}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  as="a"
                  href={`mailto:${profile.email}`}
                  size="lg"
                  className="group"
                >
                  <MailIcon className="size-[1.15rem]" />
                  Email me
                </Button>
                <Button
                  as="a"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  size="lg"
                >
                  <GithubIcon className="size-[1.15rem]" />
                  View GitHub
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ---------------- Contact form ---------------- */}
          <Reveal delay={120} className="min-w-0">
            <form
              onSubmit={handleSubmit}
              className="mt-4 space-y-3 rounded-xl border border-border bg-surface/50 p-4"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-[0.875rem] font-medium uppercase tracking-wide text-muted">
                    Name
                  </span>
                  <input
                    name="from_name"
                    type="text"
                    required
                    value={form.from_name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`w-full rounded-xl border px-4 py-3 text-[1rem] text-foreground placeholder:text-subtle focus:border-purple/60 focus:outline-none ${
                      errors.from_name ? "border-red-500 bg-red-500/10" : "border-border bg-surface/50"
                    }`}
                  />
                  {errors.from_name && (
                    <p className="mt-1 text-[0.75rem] text-red-500">{errors.from_name}</p>
                  )}
                </label>
                <label className="block">
                  <span className="mb-1 block text-[0.875rem] font-medium uppercase tracking-wide text-muted">
                    Email
                  </span>
                  <input
                    name="from_email"
                    type="email"
                    required
                    value={form.from_email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full rounded-xl border px-4 py-3 text-[1rem] text-foreground placeholder:text-subtle focus:border-purple/60 focus:outline-none ${
                      errors.from_email ? "border-red-500 bg-red-500/10" : "border-border bg-surface/50"
                    }`}
                  />
                  {errors.from_email && (
                    <p className="mt-1 text-[0.75rem] text-red-500">{errors.from_email}</p>
                  )}
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-[0.875rem] font-medium uppercase tracking-wide text-muted">
                    Phone
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+959 xxx xxx xxx"
                    className="w-full rounded-xl border border-border bg-surface/50 px-4 py-3 text-[1rem] text-foreground placeholder:text-subtle focus:border-purple/60 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[0.875rem] font-medium uppercase tracking-wide text-muted">
                    Message
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project…"
                    className={`w-full resize-y rounded-xl border px-4 py-3 text-[1rem] text-foreground placeholder:text-subtle focus:border-purple/60 focus:outline-none ${
                      errors.message ? "border-red-500 bg-red-500/10" : "border-border bg-surface/50"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[0.75rem] text-red-500">{errors.message}</p>
                  )}
                </label>
              </div>

              {/* Hidden subject field for EmailJS template */}
              <input
                name="subject"
                type="hidden"
                value={form.subject}
              />

              <Button
                type="submit"
                size="sm"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Submit"}
              </Button>

              {status === "sent" && (
                <div
                  className="mt-4 rounded-xl border border-green-100 bg-green-50 p-4 text-[0.875rem] text-green-800 flex items-start gap-3 animate-fade-in"
                >
                  <div className="shrink-0 mt-0.5 flex size-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">
                      Message Sent Successfully!
                    </p>
                    <p className="mt-1 text-green-700 leading-relaxed">
                      Thank you for reaching out. I&apos;ll get back to you as
                      soon as possible.
                    </p>
                  </div>
                  <button
                    onClick={dismissNotification}
                    className="shrink-0 mt-0.5 text-green-400 hover:text-green-600 transition-colors"
                    aria-label="Dismiss notification"
                  >
                    ×
                  </button>
                </div>
              )}

              {status === "error" && (
                <div
                  className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4 text-[0.875rem] text-red-800 flex items-start gap-3 animate-fade-in"
                >
                  <div className="shrink-0 mt-0.5 flex size-6 items-center justify-center rounded-full bg-red-100 text-red-600">
                    ✕
                  </div>
                  <div>
                    <p className="font-semibold text-red-900">
                      Message Failed!
                    </p>
                    <p className="mt-1 text-red-700 leading-relaxed">
                      Something went wrong. Please try again later.
                    </p>
                  </div>
                  <button
                    onClick={dismissNotification}
                    className="shrink-0 mt-0.5 text-red-400 hover:text-red-600 transition-colors"
                    aria-label="Dismiss notification"
                  >
                    ×
                  </button>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
