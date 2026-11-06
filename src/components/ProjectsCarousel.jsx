import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "../data/portfolio";
import { getTechColor } from "../data/techColors";
import Container from "./Container";
import Reveal from "./Reveal";
import Section from "./Section";
import {
  ArrowRightIcon,
  CloseIcon,
  ExternalLinkIcon,
  GithubIcon,
} from "./Icons";

/* Only real URLs become links — anything else stays a non-link so there are
   never dead or misleading buttons. */
const isHttpUrl = (url) =>
  typeof url === "string" && /^https?:\/\//i.test(url.trim());

/* Two-letter mark used when a project has no screenshot yet. */
function getInitials(title) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function getImagePath(path) {
  if (!path || typeof path !== "string") return "";

  // Keep external image URLs unchanged
  if (/^https?:\/\//i.test(path)) return path;

  // Support GitHub Pages deployment paths
  const base = import.meta.env.BASE_URL || "/";
  const cleanPath = path.replace(/^\/+/, "").replace(/^public\//, "");

  return `${base}${cleanPath}`;
}

function CardImage({ project }) {
  const [imageFailed, setImageFailed] = useState(false);

  const imageSrc = getImagePath(project.image);

  if (imageSrc && !imageFailed) {
    return (
      <img
        src={imageSrc}
        alt={`${project.title} screenshot`}
        loading="lazy"
        draggable="false"
        onError={() => setImageFailed(true)}
        className="size-full object-cover"
      />
    );
  }

  return (
    <div className="relative grid size-full place-items-center bg-grid">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-purple/20 via-transparent to-blue/20"
      />
      <span className="text-gradient relative text-3xl font-extrabold">
        {getInitials(project.title)}
      </span>
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
        screenshot placeholder
      </span>
    </div>
  );
}

/* Shortest signed distance from `current` to `index`, so the ring wraps in
   both directions instead of everything shifting one way. */
function ringOffset(index, current, total) {
  let offset = index - current;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

export default function ProjectsCarousel() {
  const items = useMemo(
    () => projects.filter((project) => project && project.title),
    [],
  );

  const [current, setCurrent] = useState(0);
  const [active, setActive] = useState(null); // project open in the modal
  const [compact, setCompact] = useState(false);
  const trackRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastTriggerRef = useRef(null);

  /* Watch the viewport so the coverflow tightens up on small screens. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(max-width: 640px)");
    const sync = () => setCompact(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const total = items.length;
  const move = useCallback(
    (step) => {
      if (total < 2) return;
      setCurrent((value) => (value + step + total) % total);
    },
    [total],
  );

  /* Arrow keys move the carousel while it has focus. */
  const onKeyDown = (event) => {
    if (active) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  };

  /* Modal: Escape to close, focus lands on the close button, and focus
     returns to the card that opened it. */
  useEffect(() => {
    if (!active) return;
    const onEscape = (event) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onEscape);
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = previousOverflow;
      lastTriggerRef.current?.focus?.();
    };
  }, [active]);

  if (!total) return null;

  /* Coverflow geometry — the active card sits centre-stage and its
     neighbours fan out behind it, scaled down and rotated on the Y axis. */
  const spacing = compact ? 145 : 250;
const visibleRange = 1;

  return (
    <Section id="made" aria-labelledby="made-heading">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 size-80 -translate-x-1/2 rounded-full bg-blue/10 blur-[130px]"
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">05 — Projects Made</p>
          <h2 id="made-heading" className="section-heading mt-6">
            Projects <span className="text-gradient">Made</span>
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted lg:text-[1.125rem]">
            A closer look at the projects I have built. Use the arrows to browse
            and select a card to see the full details.
          </p>
        </Reveal>

        {/* ---------------- Carousel ---------------- */}
        <Reveal delay={120}>
          <div
            className="relative mx-auto mt-14 w-full"
            style={{ perspective: "120rem" }}
            role="group"
            aria-roledescription="carousel"
            aria-label="Projects Made"
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            <div
              ref={trackRef}
              className="relative h-[30rem] w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {items.map((project, index) => {
                const offset = ringOffset(index, current, total);
                const distance = Math.abs(offset);
                const isActive = distance === 0;
                const isVisible = distance <= visibleRange;
                const scale = isActive
                  ? 1
                  : distance === 1
                    ? compact
                      ? 0.78
                      : 0.86
                    : 0.72;

                return (
                  <article
                    key={project.title}
                    tabIndex={isActive ? 0 : -1}
                    aria-label={`${project.title} project`}
                    aria-hidden={!isVisible}
                    onClick={(event) => {
                      if (!isVisible) return;
                      if (isActive) {
                        lastTriggerRef.current = event.currentTarget;
                        setActive(project);
                      } else {
                        setCurrent(index);
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key !== "Enter" && event.key !== " ") return;
                      event.preventDefault();
                      if (isActive) {
                        lastTriggerRef.current = event.currentTarget;
                        setActive(project);
                      } else {
                        setCurrent(index);
                      }
                    }}
                    className={[
                      "absolute left-1/2 top-1/2 flex w-[24rem] max-w-[80vw] flex-col overflow-hidden rounded-2xl border bg-surface/95 shadow-card backdrop-blur transition-all duration-500 ease-out-expo",
                      isActive
                        ? "cursor-pointer border-purple/50 hover:shadow-glow-purple"
                        : "cursor-pointer border-border",
                      isVisible ? "focus-visible:outline-none" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{
                      height: "30rem",
                      transform: `translate(-50%, -50%) translateX(${offset * spacing}px) scale(${scale}) rotateY(${offset * -8}deg)`,
                      opacity: isActive ? 1 : distance === 1 ? 0.84 : 0,
                      zIndex: 20 - distance,
                      pointerEvents: isVisible ? "auto" : "none",
                      visibility: isVisible ? "visible" : "hidden",
                    }}
                  >
                    <div className="h-40 shrink-0 overflow-hidden bg-surface-2">
                      <CardImage project={project} />
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col p-5">
                      <h3 className="text-[1.25rem] font-semibold">
                        {project.title}
                      </h3>
                      {project.type ? (
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                          {project.type}
                        </p>
                      ) : null}

                      <p className="mt-3 line-clamp-3 text-[1rem] leading-relaxed text-muted">
                        {project.description}
                      </p>

                      {project.tech?.length ? (
                        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                          {project.tech.map((tech) => (
                            <li key={tech}>
                              <span
                                className="badge chip"
                                style={{ "--chip": getTechColor(tech) }}
                              >
                                <span
                                  aria-hidden="true"
                                  className="size-1.5 shrink-0 rounded-full"
                                  style={{
                                    backgroundColor: getTechColor(tech),
                                  }}
                                />
                                {tech}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* ---------------- Controls ---------------- */}
            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => move(-1)}
                disabled={total < 2}
                aria-label="Previous project"
                className="btn btn-secondary size-11 shrink-0 rounded-full p-0 disabled:opacity-40"
              >
                <ArrowRightIcon className="size-5 rotate-180" />
              </button>

              <ul
                className="flex items-center gap-2"
                role="tablist"
                aria-label="Choose a project"
              >
                {items.map((project, index) => {
                  const isActive = index === current;
                  return (
                    <li key={project.title}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Show ${project.title}`}
                        onClick={() => setCurrent(index)}
                        className={[
                          "block rounded-full transition-all duration-300",
                          isActive
                            ? "h-2.5 w-6 bg-purple shadow-glow-purple"
                            : "size-2.5 bg-border-strong hover:bg-muted",
                        ].join(" ")}
                      />
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                onClick={() => move(1)}
                disabled={total < 2}
                aria-label="Next project"
                className="btn btn-secondary size-11 shrink-0 rounded-full p-0 disabled:opacity-40"
              >
                <ArrowRightIcon className="size-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* ---------------- Details modal ---------------- */}
      {active ? (
        <div
          className="fixed inset-0 z-[60] grid place-items-center p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <button
            type="button"
            aria-label="Close project details"
            onClick={() => setActive(null)}
            className="absolute inset-0 size-full cursor-default bg-background/70 backdrop-blur-sm"
          />

          <div className="card relative z-10 max-h-[85vh] w-full max-w-xl overflow-auto p-7">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close project details"
              className="icon-btn absolute right-4 top-4"
            >
              <CloseIcon className="size-4" />
            </button>

            <div className="h-44 overflow-hidden rounded-xl border border-border bg-surface-2">
              <CardImage project={active} />
            </div>

            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-purple-light">
              Project details
            </p>
            <h2
              id="project-modal-title"
              className="mt-2 text-[1.75rem] font-bold"
            >
              {active.title}
            </h2>
            <p className="mt-3 text-[1rem] leading-relaxed text-muted">
              {active.description}
            </p>

            {active.tech?.length ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {active.tech.map((tech) => (
                  <li key={tech}>
                    <span
                      className="badge chip"
                      style={{ "--chip": getTechColor(tech) }}
                    >
                      <span
                        aria-hidden="true"
                        className="size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: getTechColor(tech) }}
                      />
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            {active.architecture ? (
              <p className="mt-4 text-[1rem] text-foreground">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                  Architecture ·{" "}
                </span>
                {active.architecture}
              </p>
            ) : null}

            {isHttpUrl(active.repo) || isHttpUrl(active.demo) ? (
              <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-border/70 pt-5">
                {isHttpUrl(active.repo) ? (
                  <a
                    href={active.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <GithubIcon className="size-4" />
                    Code
                  </a>
                ) : null}
                {isHttpUrl(active.demo) ? (
                  <a
                    href={active.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Live Demo
                    <ExternalLinkIcon className="size-4" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </Section>
  );
}
