import type { Project, ProjectType } from "@/lib/data"

/** Project type names, used for the card icon tooltip, screen readers and filters. */
export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  agency: "Agency",
  freelance: "Freelance",
  sideprojects: "Side Project",
  "ai-assisted-sdd": "AI-Assisted (SDD)",
}

/** What I built, per project type. A project's own `role` field overrides it. */
const PROJECT_TYPE_ROLES: Record<ProjectType, string> = {
  agency: "Custom WordPress theme, developed from supplied designs",
  freelance: "Custom WordPress theme, developed from supplied designs",
  sideprojects: "Personal web application",
  "ai-assisted-sdd": "Built using AI-assisted Spec-Driven Development",
}

export function getProjectRole(project: Project) {
  return project.role ?? PROJECT_TYPE_ROLES[project.type]
}

/** Baseline technologies every site uses; hidden on cards when more specific ones are listed. */
const BASELINE_TECHNOLOGIES = new Set(["HTML5", "CSS3", "JavaScript"])

export function getDisplayTechnologies(project: Project) {
  const specific = project.technologies.filter((tech) => !BASELINE_TECHNOLOGIES.has(tech))
  return specific.length > 0 ? specific : project.technologies
}
