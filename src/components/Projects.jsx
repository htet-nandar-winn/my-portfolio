import { profile, projects } from "../data/portfolio";
import { getTechColor } from "../data/techColors";
import Badge from "./Badge";
import Button from "./Button";
import Card from "./Card";
import Container from "./Container";
import Reveal from "./Reveal";
import Section from "./Section";
import { ExternalLinkIcon, GithubIcon } from "./Icons";

/* Only real URLs become links — anything else is shown as a
   clearly-marked placeholder so there are no dead links. */
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

function ScreenshotPlaceholder({ title }) {
  return (
    <div className="relative grid size-full place-items-center bg-grid">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-purple/15 via-transparent to-blue/15"
      />
      <div className="relative grid size-16 place-items-center rounded-2xl border border-border-strong bg-surface/70 backdrop-blur">
        <span className="text-gradient text-xl font-extrabold">
          {getInitials(title)}
        </span>
      </div>
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
        screenshot placeholder
      </span>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const hasRepo = isHttpUrl(project.repo);
  const hasDemo = isHttpUrl(project.demo);

  return (
    <Card hover className="group flex h-full flex-col">
      {/* Screenshot */}
      <div className="relative m-3 overflow-hidden rounded-xl border border-border bg-surface-2">
        <div className="aspect-video">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
            />
          ) : (
            <ScreenshotPlaceholder title={project.title} />
          )}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"
        />
        {project.isExample ? (
          <Badge tone="accent" className="absolute left-3 top-3">
            Example
          </Badge>
        ) : null}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-6 pt-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[1.375rem] font-semibold">{project.title}</h3>
          <span className="mt-0.5 font-mono text-[0.8125rem] text-subtle">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {project.type ? (
          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
            {project.type}
          </p>
        ) : null}

        <p className="mt-3 text-[1rem] leading-relaxed text-muted">
          {project.description}
        </p>

        {/* Tech stack + architecture */}
        <div className="mt-5 space-y-3">
          {project.tech?.length ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                Tech stack
              </span>
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
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
            </div>
          ) : null}

          {project.architecture ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                Architecture
              </span>
              <span className="text-[1rem] font-medium text-foreground">
                {project.architecture}
              </span>
            </div>
          ) : null}
        </div>

        {/* Links — only shown once a real URL is provided */}
        {hasRepo || hasDemo ? (
          <div className="mt-auto flex flex-wrap items-center gap-2.5 border-t border-border/70 pt-6">
            {hasRepo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <GithubIcon className="size-4" />
                Code
              </a>
            ) : null}

            {hasDemo ? (
              <a
                href={project.demo}
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
    </Card>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-border"
    >
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/4 size-72 rounded-full bg-purple/10 blur-[120px]"
      />

      <Container className="relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">05 — Projects</p>
          <h2
            id="projects-heading"
            className="section-heading mt-6"
          >
            Featured Projects
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted lg:text-[1.125rem]">
            Projects I&apos;m building while learning. The list includes web
            applications built with PHP and Laravel and organised using
            Domain-Driven Design (DDD) — a way of structuring the code around
            the project&apos;s business domain and its core concepts — as well
            as modern Next.js and React applications such as a banking
            platform.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 90}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mt-8 flex justify-center sm:justify-end">
            <Button
              as="a"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              size="sm"
              className="group"
            >
              <GithubIcon className="size-4" />
              More on GitHub
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
