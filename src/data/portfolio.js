/**
 * ============================================================================
 *  PORTFOLIO CONFIGURATION
 *  Edit your personal information in THIS ONE FILE.
 * ============================================================================
 *
 *  Everything the website shows about you lives here, so you never have to
 *  touch a component file to personalise the portfolio.
 *
 *  HOW TO EDIT
 *  -----------
 *  1. Change any value below to your own details.
 *  2. Where noted, leave a value as "" (empty string) to hide that element.
 *     For example, `avatar`, `cv` and the project `image` / `repo` / `demo`.
 *     An empty `linkedin` hides every LinkedIn link on the site.
 *  3. Save — the site updates automatically (Vite hot-reloads while
 *     `npm run dev` is running).
 *
 *  WHAT LIVES WHERE
 *  ----------------
 *  profile     name, title, short intro, location, photo, CV, email + links
 *  navItems    the links in the top navigation bar
 *  hero        the greeting, name and role lines at the top of the page
 *  about       the "About Me" text, quick facts and info cards
 *  skills      the "Skills & Abilities" grid
 *  education   the "Education" timeline entries
 *  projects    the "Featured Projects" cards
 *  contact     the "Contact" section copy
 *
 *  Brand colours for technology chips live in src/data/techColors.js.
 */

/* ============================================================================
   PROFILE  —  your identity and contact details
   ============================================================================ */

/** Your full name. Shown in the navbar, hero, footer and across the site. */
const fullName = "Htet Nandar Winn";

/** Builds "HN" from "Htet Nandar Winn" so the logo mark never goes stale. */
function deriveInitials(value) {
  const initials = String(value)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return initials || "HN";
}

export const profile = {
  /** Full name (see `fullName` above). */
  name: fullName,

  /** Logo mark, max 2–3 characters. Derived from your name automatically —
      replace with your own string (e.g. "HW") to override. */
  initials: deriveInitials(fullName),

  /** Short introduction — the paragraph next to the headline in the hero.
      Keep it to 1–3 friendly sentences. */
  intro:
    "I'm an IT student developing my skills in web development and modern application technologies. I'm looking for an internship or junior developer opportunity to gain practical experience while working toward becoming a Full-Stack Developer.",

  /** Where you're based. Shown in the hero, the About section and the footer. */
  location: "Yangon, Myanmar",

  /** Profile photo. Place your image in public/images/ and reference it with a
      path that starts with "/", e.g. avatar: "/images/profile.jpg".
      If the file can't be loaded, the built-in initials placeholder is shown
      automatically, so there is never a broken image. */
  avatar: `${import.meta.env.BASE_URL}images/profile.jpg`,

  /** Your CV / résumé. Put the file in the /public folder and use a path that
      starts with "/", e.g. cv: "/cv.pdf".
      Left empty for now, so the "Download CV" button stays hidden. */
  cv: "", // e.g. "/cv.pdf"

  /** Email address. Powers every "email me" link. */
  email: "htetnandarwinn8@gmail.com",

  /** Phone number. Shown in the Contact section, above the email.
      Leave "" to hide it. */
  phone: "+959 752491443",

  /** Full GitHub profile URL. */
  github: "https://github.com/htet-nandar-winn",

  /** Full LinkedIn profile URL.
      Not provided yet — leave "" and every LinkedIn link disappears
      automatically. Add the URL (e.g. "https://www.linkedin.com/in/you")
      once you have a profile. */
  linkedin: "",
};

/* ============================================================================
   NAVIGATION  —  the top navigation links
   `href` must match the `id` of a section (home, about, skills, education,
   experience, projects, contact). Reorder or remove items freely.
   ============================================================================ */
export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#made" },
  { label: "Contact", href: "#contact" },
];

/* ============================================================================
   HERO  —  the top of the page
   The hero leads with three lines:
     1. greeting   fades in
     2. name       fades in and drifts up
     3. role       typed out letter by letter, then loops through `typed`
   Each static line also takes an optional `delay`, in seconds.
   ============================================================================ */
export const hero = {
  /** Line 1 — small greeting above your name. */
  greeting: "Hi There,",

  /** Line 2 — your name. Set `nameHighlight` to the part to paint with the
      gradient, or "" for a solid colour. */
  name: fullName,
  nameHighlight: fullName,

  /** Line 3 — your main role. This is the line that types itself out; it is
      also the stable name announced by screen readers, and the loop always
      begins with `typed[0]`, which should match this value. */
  role: "Full Stack Developer",

  /** The typing loop: each phrase is typed letter by letter, held, deleted,
      then the next one starts — forever. Add or remove at will; the first
      entry should stay equal to `role`, since it is where the loop begins. */
  typed: ["Full Stack Developer"],
};

/* ============================================================================
   ABOUT  —  the "About Me" section
   ============================================================================ */
export const about = {
  /** Lead line — the largest text. Rendered with `**bold**` support. */
  lead: "I'm **Htet Nandar Winn**",

  /** Your professional title, shown just under the lead line. */
  role: "Full Stack Developer",

  /** Supporting paragraphs. Add or remove entries freely.
      Wrap any phrase in **double asterisks** to render it bold. */
  paragraphs: [
    "I'm a **Full Stack Developer** with approximately **1 year of experience** in web development. I enjoy building **responsive web applications** and writing **clean, maintainable code**.",
    "My technical skills include **PHP**, **Laravel**, **React**, **JavaScript**, **HTML5**, **CSS3**, **Tailwind CSS**, and **MySQL**. I also use **Git**, **GitHub**, **Vite**, **Postman**, and **Figma** in my development workflow.",
    "Currently, I work at **ITVisionHub Co., Ltd.** in **Yangon, Myanmar**, where I continue developing my technical skills and gaining practical experience in software development.",
  ],

  /** Quick facts. `icon` is one of: "pin", "code", "book", "spark".
      Add or remove rows freely. */
  facts: [
    { icon: "pin", label: "Location", value: profile.location },
    { icon: "code", label: "Focus", value: "Full Stack Development" },
    { icon: "book", label: "Currently", value: "ITVisionHub Co., Ltd." },
    { icon: "spark", label: "Experience", value: "Approximately 1 year" },
  ],
};

/* ============================================================================
   SKILLS  —  the "Skills & Abilities" grid
   One unified list of the technologies you actually use. Each card shows a
   brand logo above the skill name — no percentages, no expert-level claims.

   `icon` matches a slug in src/components/TechIcons.jsx:
     php, laravel, react, javascript, html5, css3, tailwindcss, mysql, github,
     vite, postman, figma, git
   Add, remove, or reorder items freely — the grid renders itself.
   ============================================================================ */
export const skills = {
  eyebrow: "02 — Skills",

  /** The single section heading, centred above the grid. */
  heading: "Skills & Abilities",

  intro:
    "The technologies I am learning and using in my studies and personal projects. This is a learning record rather than a rating — I am always growing in each of these.",

  /** Shown under the grid. */
  footnote: "",

  /* `icon` matches a slug in src/components/TechIcons.jsx. */
  items: [
    { name: "PHP", icon: "php" },
    { name: "Laravel", icon: "laravel" },
    { name: "React.js", icon: "react" },
    { name: "JavaScript", icon: "javascript" },
    { name: "HTML5", icon: "html5" },
    { name: "CSS3", icon: "css3" },
    { name: "Tailwind CSS", icon: "tailwindcss" },
    { name: "MySQL", icon: "mysql" },
    { name: "GitHub", icon: "github" },
    { name: "Vite", icon: "vite" },
    { name: "Postman", icon: "postman" },
    { name: "Figma", icon: "figma" },
    { name: "Git", icon: "git" },
  ],
};

/* ============================================================================
   EDUCATION  —  the "Education" timeline
   Replace or add entries as your studies progress.
   `coursework` and `certifications` only render when the arrays contain items,
   so clear them ([]) if you have none.
   ============================================================================ */
export const education = {
  intro: "My academic background.",

  entries: [
    {
      degree: "B.C.Sc (Computer Science)",
      institution: "University of Computer Studies, Meiktila, Myanmar",
      period: "2019 – 2026",
      graduation: "2026",
      location: "",
      description:
        "I studied Computer Science from 2019 to 2026, building foundations in programming, web development, and databases, with a growing interest in software development.",
      /* Optional campus photo shown across the top of the Education card. Drop
         a real photo at public/images/university.jpg and it appears
         automatically; if the file is missing, a neutral banner is used. */
      image: "/images/ucsmtlaMeiktila.jpg",
      imageAlt: "University of Computer Studies, Meiktila campus",
      logo: "/images/ucsmtlaLogo.png",
      coursework: [],
      certifications: [],
    },
    // Add more entries like the one above for earlier study.
  ],

  footnote: "",
};

/* ============================================================================
   EXPERIENCE  —  the "My Experience" section
   One card per role. The first entry is marked `current: true` and gets the
   "Current Role" badge.
   ----------------------------------------------------------------------------
   Fields
     company     (string)  Employer name.
     role        (string)  Your job title.
     period      (string)  Date range exactly as you want it shown.
     datetime    (string)  Machine-readable start date for the <time> element,
                           e.g. "2025-01".
     summary     (string)  One or two sentences describing the role.
     tech        (array)   Technologies used, shown as chips ([] = none).
     current     (bool)    true  -> shows the "Current Role" badge.
   `highlights` (array) is rendered as a bullet list; leave it empty ([]) to
   omit the list entirely.
   ============================================================================ */
export const experience = {
  eyebrow: "04 — Experience",

  heading: "My Experience",

  intro: "Where I am putting my skills to work.",

  entries: [
    {
      company: "ITVisionHub Co., Ltd.",
      role: "Full Stack Developer",
      period: "2025 – Present",
      datetime: "2025-01",
      summary:
        "Working as a Full Stack Developer, building and maintaining web applications across both frontend and backend.",
      tech: [
        "PHP",
        "Laravel",
        "React.js",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "MySQL",
        "Git",
        "GitHub",
        "Vite",
        "Postman",
        "Figma",
      ],
      highlights: [],
      current: true,
    },
    // Add more roles like the one above — newest first.
  ],
};

/* ============================================================================
   CONTACT  —  the "Contact" section
   The email / GitHub / LinkedIn links come from `profile` above. LinkedIn is
   hidden automatically while `profile.linkedin` is empty.
   There is no contact form and no backend on this site.
   ============================================================================ */
export const contact = {
  availability: "",

  /* EmailJS — powers the contact form in src/components/Contact.jsx.
     Create an Email service + template in your EmailJS dashboard, then paste
     the IDs below. The public key is safe to expose (it is required by EmailJS). */
  emailjs: {
    serviceId: "", // e.g. "service_xxxxxxxxx"
    templateId: "", // e.g. "template_xxxxxxxxx"
    publicKey: "", // e.g. "public_xxxxxxxxx"
  },
};

/* ============================================================================
   PROJECTS  —  the "Featured Projects" cards
   Add, remove, or reorder the objects below and the section updates itself.
   No component changes are needed.
   ----------------------------------------------------------------------------
   Fields
     title        (string)  Project name.
     type         (string)  Short label shown under the title, e.g.
                            "Web application". "" hides it.
     description  (string)  One or two sentences about the project.
     tech         (array)   Technology names shown as chips ([] = none).
     architecture (string)  Architecture label, e.g.
                            "Domain-Driven Design (DDD)". "" hides it.
     image        (string)  Screenshot path in /public, e.g. "/projects/foo.png".
                            Leave "" to show the built-in placeholder.
     repo         (string)  GitHub URL. Leave "" to hide the Code button.
     demo         (string)  Live demo URL. Leave "" to hide the Live Demo button.
     isExample    (boolean) true shows an "Example" badge. Keep false for your
                            own projects.

   NOTE: Only the details you actually provide are shown — nothing here is
   invented. The Code / Live Demo buttons stay hidden until you paste a real
   URL into `repo` or `demo`.
   ============================================================================ */

export const projects = [
  {
    title: "MediaLibrary",
    type: "Web application",
    description:
      "A media library web application built with PHP and Laravel, using Domain-Driven Design (DDD) architecture to organize application logic into structured modules.",
    tech: ["PHP", "Laravel"],
    architecture: "Domain-Driven Design (DDD)",
    image: "/images/mediaLibrary.png",
    repo: "",
    demo: "",
    isExample: false,
  },
  {
    title: "BloodConnect System",
    type: "Web application",
    description:
      "A blood donation system web application built with PHP and Laravel, using Domain-Driven Design (DDD) architecture to organize application logic into structured modules.",
    tech: ["PHP", "Laravel"],
    architecture: "Domain-Driven Design (DDD)",
    image: "/images/bloodconnect.png",
    repo: "https://github.com/htet-nandar-winn/BloodConnect",
    demo: "",
    isExample: false,
  },
  {
    title: "Banking",
    type: "Web application",
    description:
      "A modern banking platform built with Next.js, React and TypeScript. It covers user authentication, bank account management, account overview, transaction history and money transfers.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    architecture: "",
    image: "/images/bank.png",
    repo: "https://github.com/htet-nandar-winn/Banking",
    demo: "",
    isExample: false,
  },
  {
    title: "Campus Food Ordering System",
    type: "Web application",
    description:
      "A web-based food ordering and canteen management system for university students, built with PHP, MySQL and Domain-Driven Design (DDD) principles, covering food browsing, shopping carts, orders, payments and refunds.",
    tech: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    architecture: "Domain-Driven Design (DDD)",
    image: "/images/food.png",
    repo: "https://github.com/htet-nandar-winn/Campus-Food-Ordering-System",
    demo: "",
    isExample: false,
  },
  {
    title: "Movie Discovery",
    type: "Web application",
    description:
      "A movie discovery application that allows users to explore movies and discover films through an interactive interface.",
    tech: ["React", "JavaScript"],
    architecture: "",
    image: "/images/movieDiscovery.png",
    repo: "",
    demo: "",
    isExample: false,
  },
];
