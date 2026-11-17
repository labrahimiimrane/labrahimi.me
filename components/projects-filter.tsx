"use client"

import { useState } from "react"
import type { Project, ProjectType } from "@/lib/data"
import { ProjectCard } from "@/components/project-card"
import { Briefcase, User, Filter, Code, Sparkles } from "lucide-react"

type FilterType = "all" | ProjectType

interface ProjectsFilterProps {
  projects: Project[]
}

const FILTERS: {
  type: ProjectType
  label: string
  icon: typeof Briefcase
  activeClass: string
}[] = [
  {
    type: "agency",
    label: "Agency",
    icon: Briefcase,
    activeClass: "bg-blue-500/20 border-blue-500/30 text-blue-200",
  },
  {
    type: "freelance",
    label: "Freelance",
    icon: User,
    activeClass: "bg-green-500/20 border-green-500/30 text-green-200",
  },
  {
    type: "sideprojects",
    label: "Side Projects",
    icon: Code,
    activeClass: "bg-purple-500/20 border-purple-500/30 text-purple-200",
  },
  {
    type: "ai-assisted-sdd",
    label: "AI-Assisted (SDD)",
    icon: Sparkles,
    activeClass: "bg-rose-500/20 border-rose-500/30 text-rose-200",
  },
]

export function ProjectsFilter({ projects }: ProjectsFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")

  const sortedProjects = [...projects].sort((a, b) => {
    const yearA = Number.parseInt(a.year, 10) || 0
    const yearB = Number.parseInt(b.year, 10) || 0
    return yearB - yearA
  })

  const filteredProjects = sortedProjects.filter(
    (project) => activeFilter === "all" || project.type === activeFilter,
  )

  const projectCounts = projects.reduce<Record<ProjectType, number>>(
    (counts, project) => {
      counts[project.type] += 1
      return counts
    },
    {
      agency: 0,
      freelance: 0,
      sideprojects: 0,
      "ai-assisted-sdd": 0,
    },
  )

  return (
    <>
      <div className="mb-12">
        <div className="flex items-center space-x-4 mb-6">
          <Filter size={18} className="text-muted" />
          <span id="project-filter-label" className="text-sm text-muted">
            Filter by type:
          </span>
        </div>

        <div role="group" aria-labelledby="project-filter-label" className="flex flex-wrap gap-3">
          <button
            type="button"
            aria-pressed={activeFilter === "all"}
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 text-sm rounded-lg border transition-all duration-200 ${
              activeFilter === "all"
                ? "bg-white/10 border-white/20 text-white"
                : "bg-white/5 border-white/10 text-muted hover:bg-white/10 hover:border-white/20"
            }`}
          >
            All Projects ({projects.length})
          </button>

          {FILTERS.map(({ type, label, icon: Icon, activeClass }) => {
            const count = projectCounts[type]

            if (count === 0) return null

            return (
              <button
                key={type}
                type="button"
                aria-pressed={activeFilter === type}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-2 text-sm rounded-lg border transition-all duration-200 flex items-center space-x-2 ${
                  activeFilter === type
                    ? activeClass
                    : "bg-white/5 border-white/10 text-muted hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <Icon size={14} />
                <span>
                  {label} ({count})
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} headingLevel="h2" />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {`Showing ${filteredProjects.length} ${filteredProjects.length === 1 ? "project" : "projects"}`}
      </p>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted mb-4">
            No projects found for the selected filter.
          </p>
          <p className="text-subtle text-sm">
            Try selecting a different filter option.
          </p>
        </div>
      )}
    </>
  )
}
