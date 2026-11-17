import Image from "next/image"
import { ArrowUpRight, Code } from "lucide-react"
import type { Project } from "@/lib/data"
import { ProjectTypeBadge } from "@/components/project-type-badge"
import { getDisplayTechnologies, getProjectRole } from "@/lib/project-types"

interface ProjectCardProps {
  project: Project
  /** Heading level for the title, so each page keeps a correct heading hierarchy. */
  headingLevel?: "h2" | "h3"
}

const linkClassName =
  "inline-flex items-center gap-1.5 text-muted hover:text-primary transition-colors"

/** Project card shared by the home page (featured work) and the projects page. */
export function ProjectCard({ project, headingLevel = "h3" }: ProjectCardProps) {
  const Heading = headingLevel

  return (
    <article className="minimal-card overflow-hidden group h-full flex flex-col">
      <div className="relative h-48 bg-gray-900 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-3 right-3">
          <ProjectTypeBadge type={project.type} />
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-baseline gap-4 mb-1">
          <Heading className="font-medium text-white">{project.title}</Heading>
          <span className="text-xs text-subtle shrink-0">{project.year}</span>
        </div>
        <p className="text-sm text-subtle mb-3">{project.category}</p>
        <p className="text-sm text-muted leading-relaxed mb-5">{project.description}</p>

        <div className="mt-auto">
          <p className="flex items-start gap-2 text-sm text-primary mb-4">
            <Code size={14} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" />
            <span>{getProjectRole(project)}</span>
          </p>

          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {getDisplayTechnologies(project).map((tech) => (
              <li key={tech} className="px-2 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-subtle">
                {tech}
              </li>
            ))}
          </ul>

          {(project.live || project.github) && (
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 pt-4 border-t border-white/10 text-sm">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit website: ${project.title} (opens in a new tab)`}
                  className={linkClassName}
                >
                  Visit website
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View code: ${project.title} on GitHub (opens in a new tab)`}
                  className={linkClassName}
                >
                  View code
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
