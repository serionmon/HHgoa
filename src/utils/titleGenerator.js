export const BUILDER_TITLES = [
  "AI Engineer",
  "Builder",
  "Full Stack Developer",
  "Frontend Engineer",
  "Backend Engineer",
  "Data Engineer",
  "ML Engineer",
  "UI/UX Designer",
  "Open Source Builder",
  "Product Engineer",
  "Code Architect",
  "Indie Hacker",
  "Creative Technologist",
  "Problem Solver",
  "All Rounder"
];

export function getRandomBuilderTitle() {
  const index = Math.floor(Math.random() * BUILDER_TITLES.length);
  return BUILDER_TITLES[index];
}

export function generateBuilderId() {
  const num = Math.floor(100 + Math.random() * 900);
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `HHG-${num}-${suffix}`;
}
