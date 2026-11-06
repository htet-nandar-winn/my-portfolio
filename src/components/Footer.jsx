import { navItems, profile } from "../data/portfolio";
import Container from "./Container";
import { ArrowRightIcon, GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

const CURRENT_YEAR = new Date().getFullYear();

const TAGLINE =
  "Thank you for visiting my portfolio website. Let's connect on socials — or message me anytime.";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-10 sm:py-12 lg:py-16">
        {/* Three-column layout */}
        <div className="grid gap-10 md:gap-16 lg:grid-cols-3 lg:gap-20">
          {/* ---------------- Column 1: Personal Introduction ---------------- */}
          <div className="min-w-0">
            <div className="flex items-center gap-3 group">
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-purple to-blue-deep text-sm font-bold text-white shadow-glow-purple transition-transform duration-300 group-hover:scale-105"
              >
                {profile.initials}
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-foreground tracking-tight">
                  {profile.name}
                </span>
              </span>
            </div>

            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-muted">
              {TAGLINE}
            </p>

            <ul className="mt-6 flex items-center gap-3">
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-btn hover:text-purple-light transition-colors duration-200"
                  aria-label="GitHub profile"
                >
                  <GithubIcon className="size-[1.1rem]" />
                </a>
              </li>
              {profile.linkedin ? (
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="icon-btn hover:text-blue-light transition-colors duration-200"
                    aria-label="LinkedIn profile"
                  >
                    <LinkedinIcon className="size-[1.1rem]" />
                  </a>
                </li>
              ) : null}
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="icon-btn hover:text-red-400 transition-colors duration-200"
                  aria-label="Email me"
                >
                  <MailIcon className="size-[1.1rem]" />
                </a>
              </li>
            </ul>
          </div>

          {/* ---------------- Column 2: Navigation Links ---------------- */}
          <nav aria-label="Footer navigation">
            <h2 className="mb-4 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-muted">
              Navigate
            </h2>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2 text-[0.95rem] text-muted transition-all duration-200 hover:text-purple-light hover:pl-1"
                  >
                    {item.label}
                    <ArrowRightIcon className="size-3.5 shrink-0 opacity-0 transition-opacity duration-200 hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------------- Column 3: Contact Information ---------------- */}
          <div className="min-w-0">
            <h2 className="mb-4 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-muted">
              Get in touch
            </h2>
            <ul className="space-y-3 text-[0.95rem]">
              {profile.phone ? (
                <li className="flex items-start gap-3">
                  <a
                    href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
                    className="flex items-center gap-2 text-muted transition-colors duration-200 hover:text-foreground"
                  >
                    <span className="shrink-0 text-muted/60">📞</span>
                    <span className="leading-relaxed">{profile.phone}</span>
                  </a>
                </li>
              ) : null}
              <li className="flex items-start gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 text-muted transition-colors duration-200 hover:text-foreground"
                >
                  <span className="shrink-0 text-muted/60">✉️</span>
                  <span className="leading-relaxed">{profile.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center gap-2">
                  <span className="shrink-0 text-muted/60">📍</span>
                  <span className="leading-relaxed text-muted">{profile.location}</span>
                </span>
              </li>
              <li>
                <a
                  href="#contact"
                  className="flex items-center gap-2 text-purple-light transition-colors duration-200 hover:text-purple hover:pl-1"
                >
                  Contact me
                  <ArrowRightIcon className="size-3.5 shrink-0" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------------- Bottom Copyright Section ---------------- */}
        <div className="mt-12 border-t border-border pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[0.75rem] font-mono uppercase tracking-wider text-subtle">
            Designed with 🤍 by {profile.name}
          </p>
          <p className="text-[0.75rem] font-mono uppercase tracking-wider text-subtle">
            &copy; {CURRENT_YEAR} {profile.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
