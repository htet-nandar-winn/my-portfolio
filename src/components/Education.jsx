import { useState } from "react";

import { education } from "../data/portfolio";
import Container from "./Container";
import Reveal from "./Reveal";
import Section from "./Section";
import { GraduationCapIcon } from "./Icons";

/* Convert public image paths to GitHub Pages-compatible paths */
function getImagePath(path) {
  if (!path) return "";
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

/* Education Card */
function EducationCard({ entry, delay }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const imagePath = getImagePath(entry.image);
  const logoPath = getImagePath(entry.logo);

  return (
    <Reveal delay={delay} className="w-full">
      <article className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl bg-white text-center shadow-xl ring-1 ring-slate-200">
        {/* Campus Image */}
        {/* Campus Image Header */}
        <div className="relative h-56 w-full overflow-hidden sm:h-72 lg:h-80">
          {imagePath && !imageFailed ? (
            <img
              src={imagePath}
              alt={entry.imageAlt || `Campus of ${entry.institution}`}
              className="h-full w-full object-cover object-center"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-slate-200">
              <GraduationCapIcon className="size-16 text-slate-500" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* University Logo */}
        <div className="relative z-10 -mt-14 flex justify-center">
          <div className="flex size-28 items-center justify-center rounded-full border-4 border-blue-500 bg-white p-2 shadow-lg sm:size-32">
            {logoPath && !logoFailed ? (
              <img
                src={logoPath}
                alt={`${entry.institution} logo`}
                className="h-full w-full rounded-full object-contain"
                loading="lazy"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <GraduationCapIcon className="size-12 text-blue-600" />
            )}
          </div>
        </div>

        {/* Education Details */}
        <div className="px-5 pb-9 pt-7 sm:px-10 sm:pb-12">
          <h3 className="text-2xl font-bold leading-tight text-slate-800 sm:text-3xl">
            {entry.degree}
          </h3>

          <p className="mt-2 text-base text-slate-600 sm:text-lg">
            {entry.institution}
          </p>

          {entry.period && (
            <p className="mt-2 text-lg font-bold text-green-600">
              period: "2019 – 2026", graduation: "Completed",
            </p>
          )}

          {entry.location && (
            <p className="mt-2 text-sm text-slate-500">{entry.location}</p>
          )}

          {entry.description && (
            <p className="mt-5 text-base leading-relaxed text-slate-500">
              {entry.description}
            </p>
          )}

          {/* Relevant Coursework */}
          {entry.coursework?.length > 0 && (
            <div className="mt-7">
              <h4 className="mb-3 font-semibold text-slate-800">
                Relevant Coursework
              </h4>
              <div className="flex flex-wrap justify-center gap-2">
                {entry.coursework.map((course) => (
                  <span
                    key={course}
                    className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {entry.certifications?.length > 0 && (
            <div className="mt-7">
              <h4 className="mb-3 font-semibold text-slate-800">
                Certifications
              </h4>
              <ul className="space-y-2 text-slate-600">
                {entry.certifications.map((certification) => (
                  <li key={certification}>{certification}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
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
      <Container className="relative">
        {/* Heading */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2
            id="education-heading"
            className="flex flex-wrap items-center justify-center gap-3 text-3xl font-bold sm:text-4xl"
          >
            <GraduationCapIcon className="size-10 text-orange-500" />

            <span className="text-purple-800">MY</span>
            <span className="-ml-3 text-orange-500">Education</span>
          </h2>

          <p className="mt-8 text-base leading-relaxed text-slate-500 sm:text-lg">
            {education.intro ||
              "Education is not the learning of facts, but the training of the mind to think."}
          </p>
        </Reveal>

        {/* Education Cards */}
        <div className="mt-14 space-y-12">
          {education.entries.map((entry, index) => (
            <EducationCard
              key={`${entry.degree}-${index}`}
              entry={entry}
              delay={index * 100}
            />
          ))}
        </div>

        {education.footnote && (
          <p className="mt-8 text-center text-sm text-slate-500">
            {education.footnote}
          </p>
        )}
      </Container>
    </Section>
  );
}
