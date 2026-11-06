import { useState } from "react";

import { education } from "../data/portfolio";
import Badge from "./Badge";
import Card from "./Card";
import Container from "./Container";
import IconTile from "./IconTile";
import Reveal from "./Reveal";
import Section from "./Section";
import {
  BookOpenIcon,
  GraduationCapIcon,
  MapPinIcon,
  SparklesIcon,
} from "./Icons";

/* Campus image placeholder */
function CampusPlaceholder() {
  return (
    <div className="relative grid size-full place-items-center bg-grid">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-purple/20 via-transparent to-blue/20"
      />

      <span className="relative grid size-14 place-items-center rounded-2xl border border-border-strong bg-surface-2/70 text-purple-light backdrop-blur">
        <GraduationCapIcon className="size-7" />
      </span>
    </div>
  );
}

/* University campus banner */
function CampusBanner({ entry }) {
  const [failed, setFailed] = useState(false);

  const showImage = Boolean(entry.image) && !failed;

  return (
    <div className="relative h-40 w-full overflow-hidden border-b border-border bg-gradient-to-br from-surface-2 to-surface sm:h-52 lg:h-60">
      {showImage ? (
        <img
          src={entry.image}
          alt={entry.imageAlt || `Campus of ${entry.institution}`}
          className="size-full object-cover object-center"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <CampusPlaceholder />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/70 to-transparent"
      />
    </div>
  );
}

/* Education timeline entry */
function EducationEntry({ entry, isLast, delay }) {
  return (
    <Reveal className="grid grid-cols-[auto_1fr] gap-5 sm:gap-6" delay={delay}>
      <div className="flex flex-col items-center">
        <IconTile tone="purple">
          <GraduationCapIcon className="size-5" />
        </IconTile>

        {!isLast && (
          <span
            aria-hidden="true"
            className="mt-2 w-px flex-1 bg-gradient-to-b from-purple/40 to-transparent"
          />
        )}
      </div>

      <div
        className={["min-w-0", isLast ? "" : "pb-10"].filter(Boolean).join(" ")}
      >
        <Card hover className="overflow-hidden p-0">
          {/* University Campus Image */}
          <CampusBanner entry={entry} />

          <div className="p-7 lg:p-8">
            {/* Degree and Period */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-[1.375rem] font-semibold">{entry.degree}</h3>

              {entry.period && <Badge tone="blue">{entry.period}</Badge>}
            </div>

            {/* University Information */}
            <ul className="mt-4 space-y-2.5 text-[1rem] text-muted">
              {/* University Logo */}
              <li className="flex items-center gap-3">
                {entry.logo ? (
                  <img
                    src={entry.logo}
                    alt={`${entry.institution} logo`}
                    className="size-12 rounded-xl border border-border object-contain bg-white p-1 shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <BookOpenIcon
                    className="size-4 shrink-0 text-purple-light"
                    aria-hidden="true"
                  />
                )}

                <span className="font-medium text-foreground leading-relaxed">
                  {entry.institution}
                </span>
              </li>

              {/* Location */}
              {entry.location && (
                <li className="flex items-center gap-2.5">
                  <MapPinIcon
                    className="size-4 shrink-0 text-blue"
                    aria-hidden="true"
                  />

                  {entry.location}
                </li>
              )}

              {/* Graduation */}
              {entry.graduation && (
                <li className="flex items-center gap-2.5">
                  <GraduationCapIcon
                    className="size-4 shrink-0 text-purple-light"
                    aria-hidden="true"
                  />

                  <span>
                    Graduation:{" "}
                    <span className="font-medium text-foreground">
                      {entry.graduation}
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {/* Description */}
            {entry.description && (
              <p className="mt-4 text-[1rem] leading-relaxed text-muted">
                {entry.description}
              </p>
            )}

            {/* Coursework */}
            {entry.coursework?.length > 0 && (
              <div className="mt-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-subtle">
                  Relevant coursework
                </p>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {entry.coursework.map((course) => (
                    <li key={course}>
                      <Badge>{course}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Certifications */}
            {entry.certifications?.length > 0 && (
              <div className="mt-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-subtle">
                  Certifications
                </p>

                <ul className="mt-3 space-y-2">
                  {entry.certifications.map((certification) => (
                    <li
                      key={certification}
                      className="flex items-start gap-2.5 text-[1rem] text-muted"
                    >
                      <SparklesIcon
                        className="mt-0.5 size-4 shrink-0 text-blue"
                        aria-hidden="true"
                      />

                      {certification}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      </div>
    </Reveal>
  );
}

/* Education Section */
export default function Education() {
  return (
    <Section
      id="education"
      aria-labelledby="education-heading"
      className="border-t border-border"
    >
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/4 size-72 rounded-full bg-blue/10 blur-[120px]"
      />

      <Container className="relative">
        {/* Section Heading */}
        <Reveal className="max-w-2xl">
          <p className="eyebrow">03 — Education</p>

          <h2 id="education-heading" className="section-heading mt-6">
            Education
          </h2>

          <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted lg:text-[1.125rem]">
            {education.intro}
          </p>
        </Reveal>

        {/* Education Timeline */}
        <div className="mt-12">
          {education.entries.map((entry, index) => (
            <EducationEntry
              key={`${entry.degree}-${index}`}
              entry={entry}
              isLast={index === education.entries.length - 1}
              delay={index * 90}
            />
          ))}
        </div>

        {/* Footnote */}
        {education.footnote && (
          <Reveal delay={80}>
            <p className="mt-8 font-mono text-xs leading-relaxed text-subtle">
              {education.footnote}
            </p>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
