/**
 * Brand colours for technology chips.
 * Used to tint the dot and hover ring on each tech badge.
 * Add a new technology here (lowercase) if it isn't listed yet.
 */
export const TECH_COLORS = {
  html: "#e34f26",
  html5: "#e34f26",
  css: "#1572b6",
  css3: "#1572b6",
  javascript: "#f7df1e",
  js: "#f7df1e",
  react: "#61dafb",
  "react.js": "#61dafb",
  reactjs: "#61dafb",
  tailwind: "#38bdf8",
  "tailwind css": "#38bdf8",
  vite: "#646cff",
  postman: "#ff6c37",
  figma: "#f24e1e",
  php: "#777bb4",
  laravel: "#ff2d20",
  mysql: "#4479a1",
  git: "#f05032",
  github: "#ffffff",
  "vs code": "#007acc",
  "node.js": "#3c873a",
  node: "#3c873a",
  "react native": "#61dafb",
  csharp: "#239120",
  "c#": "#239120",
  bootstrap: "#7952b3",
  typescript: "#3178c6",
  python: "#3776ab",
  nextjs: "#000000",
  nestjs: "#E0234E",
  postgresql: "#4169E1",
};

/** Returns a brand colour for a technology name, or a neutral accent. */
export function getTechColor(name) {
  return TECH_COLORS[String(name).trim().toLowerCase()] ?? "#8b5cf6";
}
