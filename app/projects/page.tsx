import type { Metadata } from "next"
import { projects } from "@/lib/data"
import { ProjectsFilter } from "@/components/projects-filter"
import { pageMetadata } from "@/lib/site"

const agencyCount = projects.filter((project) => project.type === "agency").length

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: `${projects.length} projects by Labrahimi Imrane, including ${agencyCount} custom WordPress websites for law firms, consultancies, and businesses, plus web apps built with React and Next.js.`,
  path: "/projects",
})

export default function Projects() {
  return (
    <div className="min-h-screen dot-grid">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-32">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
            Projects
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            A selection of custom websites and web applications, from WordPress sites developed for agency clients to
            freelance work and modern apps built with React and Next.js.
          </p>
        </div>

        <ProjectsFilter projects={projects} />
      </div>
    </div>
  )
}
