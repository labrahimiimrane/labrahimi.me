import { projects } from "@/lib/data"
import { ProjectsFilter } from "@/components/projects-filter"

export default function Projects() {
  return (
    <div className="min-h-screen bg-black dot-grid py-20">
      {/* Header */}
      <div className="mb-16 text-center px-6">
        <h1 className="text-3xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
          Projects
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">
          A showcase of my work agency projects, freelance collaborations, and personal side projects. Each project
          represents a unique challenge and creative solution.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <ProjectsFilter projects={projects} />
      </div>
    </div>
  )
}
