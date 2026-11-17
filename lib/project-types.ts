import type { ProjectType } from "@/lib/data"

/** Badge styles shown on project cards, keyed by project type. */
export const PROJECT_TYPE_STYLES: Record<ProjectType, string> = {
  agency: "bg-blue-600 text-white border border-blue-500",
  freelance: "bg-green-600 text-white border border-green-500",
  sideprojects: "bg-purple-600 text-white border border-purple-500",
  vibecoding: "bg-rose-600 text-white border border-rose-500",
}

/** Badge labels shown on project cards, keyed by project type. */
export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  agency: "Agency",
  freelance: "Freelance",
  sideprojects: "Side Project",
  vibecoding: "Vibe Coding",
}
