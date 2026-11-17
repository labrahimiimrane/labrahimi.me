import type { Metadata } from "next"
import { projects } from "@/lib/data"
import { ProjectsFilter } from "@/components/projects-filter"
import { pageMetadata } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Websites built by Labrahimi Imrane for law firms, consultancies, and businesses, plus personal projects, using WordPress, PHP, GSAP, React, and Next.js.",
  path: "/projects",
})

export default function Projects() {
  return (
    <div className="min-h-screen bg-black dot-grid py-20">
      {/* Header */}
      <div className="mb-16 text-center px-6">
        <h1 className="text-3xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
          Projects
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">
          Explore a selection of websites I’ve built across agency and personal projects, using WordPress and modern web technologies.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <ProjectsFilter projects={projects} />
      </div>
    </div>
  )
}
