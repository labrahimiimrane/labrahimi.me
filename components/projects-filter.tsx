"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Github, Briefcase, User, Filter, Code, Sparkles } from "lucide-react"

type FilterType = "all" | "agency" | "freelance" | "sideprojects" | "vibecoding"

interface Project {
  id: number
  title: string
  description: string
  image: string
  category: string
  year: string
  type: "agency" | "freelance" | "sideprojects" | "vibecoding"
  technologies: string[]
  featured: boolean
  live: string
  github: string
}

interface ProjectsFilterProps {
  projects: Project[]
}

export function ProjectsFilter({ projects }: ProjectsFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")

  // Sort projects by year (newest to oldest)
  const sortedProjects = [...projects].sort((a, b) => {
    const yearA = Number.parseInt(a.year) || 0
    const yearB = Number.parseInt(b.year) || 0
    return yearB - yearA
  })

  const filteredProjects = sortedProjects.filter((project) => {
    if (activeFilter === "all") return true
    return project.type === activeFilter
  })

  const agencyCount = projects.filter((p) => p.type === "agency").length
  const freelanceCount = projects.filter((p) => p.type === "freelance").length
  const sideProjectsCount = projects.filter((p) => p.type === "sideprojects").length
  const vibeCodingCount = projects.filter((p) => p.type === "vibecoding").length

  const ProjectCard = ({ project }: { project: Project }) => {
    const typeStyles: Record<string, string> = {
      agency: "bg-blue-600 text-white border border-blue-500",
      freelance: "bg-green-600 text-white border border-green-500",
      sideprojects: "bg-purple-600 text-white border border-purple-500",
      vibecoding: "bg-rose-600 text-white border border-rose-500",
    }
    const typeLabels: Record<string, string> = {
      agency: "Agency",
      freelance: "Freelance",
      sideprojects: "Side Project",
      vibecoding: "Vibe Coding",
    }

    return (
      <div className="minimal-card overflow-hidden group">
        <div className="relative h-48 bg-gray-900 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Project Type Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold shadow-lg ${
                typeStyles[project.type] || "bg-white/10 text-white border border-white/20"
              }`}
            >
              {typeLabels[project.type] || project.type}
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
          <p className="text-sm text-muted mb-4 leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <span key={tech} className="px-2 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-subtle">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Filter Controls */}
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

          {/* Only show Agency filter if there are agency projects */}
          {agencyCount > 0 && (
            <button
              onClick={() => setActiveFilter("agency")}
              className={`px-4 py-2 text-sm rounded-lg border transition-all duration-200 flex items-center space-x-2 ${
                activeFilter === "agency"
                  ? "bg-blue-500/20 border-blue-500/30 text-blue-200"
                  : "bg-white/5 border-white/10 text-muted hover:bg-blue-500/10 hover:border-blue-500/20"
              }`}
            >
              <Briefcase size={14} />
              <span>Agency ({agencyCount})</span>
            </button>
          )}

          {/* Only show Freelance filter if there are freelance projects */}
          {freelanceCount > 0 && (
            <button
              onClick={() => setActiveFilter("freelance")}
              className={`px-4 py-2 text-sm rounded-lg border transition-all duration-200 flex items-center space-x-2 ${
                activeFilter === "freelance"
                  ? "bg-green-500/20 border-green-500/30 text-green-200"
                  : "bg-white/5 border-white/10 text-muted hover:bg-green-500/10 hover:border-green-500/20"
              }`}
            >
              <User size={14} />
              <span>Freelance ({freelanceCount})</span>
            </button>
          )}

          {/* Only show Side Projects filter if there are side projects */}
          {sideProjectsCount > 0 && (
            <button
              onClick={() => setActiveFilter("sideprojects")}
              className={`px-4 py-2 text-sm rounded-lg border transition-all duration-200 flex items-center space-x-2 ${
                activeFilter === "sideprojects"
                  ? "bg-purple-500/20 border-purple-500/30 text-purple-200"
                  : "bg-white/5 border-white/10 text-muted hover:bg-purple-500/10 hover:border-purple-500/20"
              }`}
            >
              <Code size={14} />
              <span>Side Projects ({sideProjectsCount})</span>
            </button>
          )}

          {/* Only show Vibe Coding filter if there are vibe coding projects */}
          {vibeCodingCount > 0 && (
            <button
              onClick={() => setActiveFilter("vibecoding")}
              className={`px-4 py-2 text-sm rounded-lg border transition-all duration-200 flex items-center space-x-2 ${
                activeFilter === "vibecoding"
                  ? "bg-rose-500/20 border-rose-500/30 text-rose-200"
                  : "bg-white/5 border-white/10 text-muted hover:bg-rose-500/10 hover:border-rose-500/20"
              }`}
            >
              <Sparkles size={14} />
              <span>Vibe Coding ({vibeCodingCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted mb-4">No projects found for the selected filter.</p>
          <p className="text-subtle text-sm">Try selecting a different filter option.</p>
        </div>
      )}
    </>
  )
}
