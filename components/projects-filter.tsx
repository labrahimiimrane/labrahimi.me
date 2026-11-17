"use client"

import { useState } from "react"
import Image from "next/image"
import type { Project, ProjectType } from "@/lib/data"
import { PROJECT_TYPE_LABELS, PROJECT_TYPE_STYLES } from "@/lib/project-types"
import { ExternalLink, Github, Briefcase, User, Filter, Code, Sparkles } from "lucide-react"

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
    type: "vibecoding",
    label: "Vibe Coding",
    icon: Sparkles,
    activeClass: "bg-rose-500/20 border-rose-500/30 text-rose-200",
  },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="minimal-card overflow-hidden group">
      <div className="relative h-48 bg-gray-900 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute bottom-3 right-3">
          <span
            className={`px-3 py-1.5 text-xs rounded-lg font-semibold shadow-lg ${
              PROJECT_TYPE_STYLES[project.type]
            }`}
          >
            {PROJECT_TYPE_LABELS[project.type]}
          </span>
        </div>

        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
            >
              <ExternalLink size={14} className="text-white" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
            >
              <Github size={14} className="text-white" />
            </a>
          )}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">{project.title}</h3>
          <span className="text-xs text-subtle">{project.year}</span>
        </div>

        <p className="text-sm text-muted mb-2">{project.category}</p>
        <p className="text-sm text-muted mb-4 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-subtle"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

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
      vibecoding: 0,
    },
  )

  return (
    <>
      <div className="mb-12">
        <div className="flex items-center space-x-4 mb-6">
          <Filter size={18} className="text-muted" />
          <span className="text-sm text-muted">Filter by type:</span>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
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
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

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
