import { about } from "../data/portfolio";
import Card from "./Card";
import Container from "./Container";
import Reveal from "./Reveal";
import Section from "./Section";
import {
  BookOpenIcon,
  CodeIcon,
  MapPinIcon,
  SparklesIcon,
} from "./Icons";
import IconTile from "./IconTile";

/* Icon used for each quick-fact row (keyed in src/data/portfolio.js). */
const FACT_ICONS = {
  pin: MapPinIcon,
  code: CodeIcon,
  book: BookOpenIcon,
  spark: SparklesIcon,
};

/* Renders the About copy with **bold** emphasis. The text still comes from
   plain strings in src/data/portfolio.js — nothing is parsed as HTML, so the
   only thing the marker can ever produce is a <strong> element. */
function withEmphasis(text) {
  return String(text)
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      ),
    );
}

export default function About() {
  return (
    <Section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-border"
    >
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/4 size-72 rounded-full bg-purple/10 blur-[120px]"
      />

      <Container className="relative">
        {/* Two balanced columns on desktop, aligned at the top; stacked with
            the narrative first on mobile. */}
        <div className="grid items-start gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          {/* ---------------- Narrative ---------------- */}
          <div className="min-w-0 max-w-3xl">
            <Reveal>
              <p className="eyebrow">01 — About</p>
              <h2
                id="about-heading"
                className="section-heading mt-6"
              >
                About Me
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-6 text-[1.3125rem] leading-relaxed text-foreground/90 lg:text-[1.375rem]">
                {withEmphasis(about.lead)}
              </p>
            </Reveal>

            {about.role ? (
              <Reveal delay={110}>
                <p className="mt-2 text-[1.1875rem] font-semibold tracking-tight text-purple-light sm:text-xl lg:text-[1.25rem]">
                  {about.role}
                </p>
              </Reveal>
            ) : null}

            <div className="mt-7 space-y-5">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={140 + index * 60}>
                  <p className="text-[1.125rem] leading-[1.75] text-muted">
                    {withEmphasis(paragraph)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ---------------- Quick facts ---------------- */}
          <Reveal delay={160} className="w-full lg:max-w-md">
            <Card shade className="p-6 lg:p-7">
              <p className="font-mono text-[0.875rem] uppercase tracking-[0.18em] text-subtle">
                Quick facts
              </p>
              <dl className="mt-5 divide-y divide-border/60">
                {about.facts.map((fact, index) => {
                  const FactIcon = FACT_ICONS[fact.icon] ?? SparklesIcon;
                  return (
                    <div
                      key={fact.label}
                      className="fact-row flex items-center gap-3.5 py-4 first:pt-0 last:pb-0"
                      style={{ "--fact-delay": `${150 + index * 110}ms` }}
                    >
                      <IconTile tone="blue" className="size-10 rounded-lg">
                        <FactIcon className="size-[1.15rem]" />
                      </IconTile>
                      <div className="min-w-0 flex-1">
                        <dt className="text-[0.875rem] uppercase tracking-wide text-subtle">
                          {fact.label}
                        </dt>
                        <dd className="mt-0.5 truncate text-[1.0625rem] font-medium text-foreground">
                          {fact.value}
                        </dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
