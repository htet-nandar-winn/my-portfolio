import { useEffect, useState } from "react";

import { hero, profile } from "../data/portfolio";
import Button from "./Button";
import Container from "./Container";
import Reveal from "./Reveal";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
} from "./Icons";

const TECH_CHIPS = [
  { label: "React", dot: "bg-blue", position: "left-[-1.1rem] top-16", delay: "0s" },
  { label: "Vite", dot: "bg-purple", position: "right-[-1.4rem] top-1/3", delay: "1.2s" },
  { label: "Tailwind", dot: "bg-blue-light", position: "left-[-1.4rem] bottom-28", delay: "2.1s" },
];

/* The animated introduction, in order. Each entry carries its own stagger.
   The last entry is static text that fades in; the typed, looping role line
   is rendered after it by `TypedLine`, using the same `role` tone. */
const INTRO_LINES = [
  { id: "greeting", text: hero.greeting, kind: "eyebrow", animation: "animate-hero-blur", delay: 0.1 },
  { id: "name", text: hero.name, kind: "name", animation: "animate-hero-in", delay: 0.5 },
].filter((line) => Boolean(line.text));

const TONE = {
  eyebrow: "text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]",
  name: "mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4rem]",
  role: "relative text-[1.625rem] font-bold tracking-tight text-muted sm:text-4xl lg:text-[2.75rem] xl:text-[2.875rem]",
};

/* Split a line so `highlight` gets the gradient while the rest stays solid. */
function splitHighlight(text, highlight) {
  if (!highlight || !text.includes(highlight)) return [text, ""];
  return text.split(highlight);
}

/* ============================================================================
   INTRO LINE
   One animated intro line. The moving parts sit on inner elements so a line
   can never overlap the next one while it drifts up.
   ============================================================================ */
function IntroLine({ line }) {
  const [before, after] = splitHighlight(line.text, hero.nameHighlight);
  const highlight =
    line.kind === "name" && before !== line.text ? hero.nameHighlight : "";

  return (
    <p
      className={`hero-line ${line.animation} ${TONE[line.kind]}`}
      style={{ "--hero-delay": `${line.delay}s` }}
    >
      <span className="inline-block">
        {before}
        {highlight ? <span className="text-gradient">{highlight}</span> : null}
        {after}
      </span>
    </p>
  );
}

/* Types the role phrases out one letter at a time, holds, deletes and moves
   on — the loop the reference site uses for its hero.

   Details that keep it usable rather than annoying:
   - the caret is a plain CSS blink, nothing per-frame in JS;
   - every duration is a single timer that is cleared on unmount, so there is
     no leaked interval and no state update after the component goes away;
   - with `prefers-reduced-motion` the loop never starts: the first phrase is
     simply shown, static;
   - the caret is `aria-hidden` and the changing text is hidden from the
     accessibility tree, so the heading's `aria-label` (set in Hero) is what
     screen readers announce — a stable name, not a half-typed word. */
function TypedLine({ phrases, delay, label }) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  /* Wait for the other hero lines to finish before typing begins. */
  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setStarted(true), delay * 1000);
    return () => window.clearTimeout(id);
  }, [delay, reduced]);

  useEffect(() => {
    if (reduced || !started) return;

    const phrase = phrases[index % phrases.length];
    let wait;

    if (!deleting && shown === phrase) {
      wait = 1400; // hold the finished word
    } else if (deleting && shown === "") {
      wait = 260; // pause on empty, then type the next one
    } else {
      wait = deleting ? 45 : 85;
    }

    const id = window.setTimeout(() => {
      if (!deleting && shown === phrase) {
        setDeleting(true);
      } else if (deleting && shown === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else {
        setShown(phrase.slice(0, shown.length + (deleting ? -1 : 1)));
      }
    }, wait);

    return () => window.clearTimeout(id);
  }, [phrases, index, shown, deleting, started, reduced]);

  const text = reduced ? phrases[0] : shown;

  return (
    <p
      className={`hero-line ${TONE.role}`}
      style={{ "--hero-delay": `${delay}s` }}
    >
      {/* The visible copy is decorative; `label` carries the stable name. */}
      <span aria-hidden="true" className="relative inline-block">
        <span className="text-gradient">{text}</span>
        {reduced ? null : (
          <span
            aria-hidden="true"
            className="typed-caret typed-caret-blink ml-0.5 inline-block w-[0.08em] bg-blue align-baseline"
          />
        )}
      </span>
      {/* Keeps the line's real, unchanging text in the DOM for screen readers. */}
      <span className="sr-only">{label}</span>
    </p>
  );
}

function FloatingChip({ label, dot, position, delay }) {
  return (
    <span
      style={{ animationDelay: delay }}
      className={`absolute hidden items-center gap-2 rounded-xl border border-border bg-surface-2/90 px-3 py-2 text-xs font-medium text-foreground shadow-card backdrop-blur animate-float sm:inline-flex ${position}`}
    >
      <span className={`size-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function AvatarPlaceholder({ initials }) {
  return (
    <div className="grid aspect-[4/5] w-full place-items-center bg-grid">
      <div className="relative grid size-40 place-items-center rounded-full border border-border-strong bg-surface-2/50 backdrop-blur-sm sm:size-44">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple/25 to-blue/25 blur-lg" />
        <span className="relative text-gradient text-5xl font-extrabold tracking-tight">
          {initials}
        </span>
        <span className="absolute -bottom-3 rounded-full border border-border bg-background/85 px-3 py-1 font-mono text-[10px] text-subtle backdrop-blur">
          add your photo
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  /* If the profile photo is missing, fall back to the initials placeholder. */
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section
      id="home"
      className="relative overflow-hidden lg:flex lg:min-h-[calc(100svh-4.5rem)] lg:items-center"
    >
      {/* Ambient background — the shade stays visible at every scroll
          position; the grid sits on top of it and only softens at the very
          edges, so the hero never goes flat. */}
      <div aria-hidden="true" className="hero-shade absolute inset-0" />
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 opacity-[0.4] [mask-image:linear-gradient(to_bottom,#000_0%,#000_62%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-24 -top-32 size-80 rounded-full bg-purple/20 blur-[120px] animate-pulse-glow"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 right-0 size-96 rounded-full bg-blue/15 blur-[130px] animate-pulse-glow"
      />

      <Container className="relative py-12 sm:py-14 lg:py-18">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 xl:gap-20">
          {/* ---------------- Left: copy ---------------- */}
          <div className="min-w-0 max-w-3xl">
            <h1
              aria-label={[...INTRO_LINES.map((line) => line.text), hero.role]
                .filter(Boolean)
                .join(" ")}
            >
              {INTRO_LINES.map((line) => (
                <IntroLine key={line.id} line={line} />
              ))}
              {hero.typed?.length ? (
                <TypedLine phrases={hero.typed} delay={1.25} label={hero.role} />
              ) : null}
            </h1>

            <Reveal delay={200}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button as="a" href="#made" size="lg" className="group">
                  View My Projects
                  <ArrowRightIcon className="size-[1.15rem] transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button as="a" href="#contact" variant="secondary" size="lg">
                  Contact Me
                </Button>
                {profile.cv ? (
                  <Button
                    as="a"
                    href={profile.cv}
                    download
                    variant="secondary"
                    size="lg"
                  >
                    <DownloadIcon className="size-[1.15rem]" />
                    Download CV
                  </Button>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4">
                <div className="flex items-center gap-2.5">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="icon-btn"
                    aria-label="GitHub profile"
                  >
                    <GithubIcon className="size-[1.05rem]" />
                  </a>
                  {profile.linkedin ? (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="icon-btn"
                      aria-label="LinkedIn profile"
                    >
                      <LinkedinIcon className="size-[1.05rem]" />
                    </a>
                  ) : null}
                </div>

                <span aria-hidden="true" className="hidden h-6 w-px bg-border sm:block" />

                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-2 text-[1rem] text-muted transition-colors hover:text-foreground"
                >
                  <MailIcon className="size-4 text-purple-light" />
                  {profile.email}
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-[1rem] text-muted transition-colors hover:text-foreground"
                >
                  <MapPinIcon className="size-4 text-blue" />
                  {profile.location}
                </a>
              </div>
            </Reveal>
          </div>

          {/* ---------------- Right: profile ---------------- */}
          <Reveal
            delay={180}
            className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:max-w-[24rem] lg:justify-self-end"
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[2.25rem] bg-gradient-to-br from-purple/25 via-transparent to-blue/25 blur-2xl"
              />

              <div className="relative rounded-[1.75rem] border border-border-strong bg-surface/80 p-3 shadow-card backdrop-blur">
                <div className="relative overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-surface-2 to-surface">
                  {profile.avatar && !photoFailed ? (
                    <img
                      src={profile.avatar}
                      alt={`Portrait of ${profile.name}`}
                      className="block h-auto w-full object-cover"
                      onError={() => setPhotoFailed(true)}
                    />
                  ) : (
                    <AvatarPlaceholder initials={profile.initials} />
                  )}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent"
                  />

                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/70 px-4 py-3 backdrop-blur">
                    <div className="min-w-0">
                      <p className="truncate text-[1rem] font-semibold">
                        {profile.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {TECH_CHIPS.map((chip) => (
                <FloatingChip key={chip.label} {...chip} />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:inline-flex"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle transition-colors group-hover:text-muted">
          Scroll
        </span>
        <span className="grid size-8 place-items-center rounded-full border border-border text-subtle transition-colors group-hover:border-purple/60 group-hover:text-foreground">
          <ArrowDownIcon className="size-4 animate-float" />
        </span>
      </a>
    </section>
  );
}
