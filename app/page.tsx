import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download, MapPin } from "lucide-react"
import type { Metadata } from "next"
import { personalInfo, projects, proofPoints, socialLinks } from "@/lib/data"
import { ProjectCard } from "@/components/project-card"
import { defaultDescription, pageMetadata, siteUrl } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  description: defaultDescription,
  path: "/",
})

// Structured data describing the portfolio owner, for search engines
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  jobTitle: personalInfo.title,
  url: siteUrl,
  image: `${siteUrl}${personalInfo.avatar}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Casablanca",
    addressCountry: "MA",
  },
  sameAs: Object.values(socialLinks).filter(Boolean),
}

export default function Home() {
  // Get featured projects and sort by year
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => {
      const yearA = Number.parseInt(a.year, 10) || 0
      const yearB = Number.parseInt(b.year, 10) || 0
      return yearB - yearA
    })

  return (
    <div className="min-h-screen dot-grid">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="order-2 lg:order-1">
              <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-tight text-white">{personalInfo.name}</h1>
                <p className="text-xl md:text-2xl text-muted font-light">{personalInfo.title}</p>
              </div>

              <div className="lg:max-w-2xl mb-8 space-y-4">
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">{personalInfo.homeIntro}</p>
                <p className="text-base text-muted leading-relaxed">{personalInfo.homeSummary}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-6 gap-y-2 text-sm text-subtle mb-8">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={14} aria-hidden="true" />
                  {personalInfo.location} · {personalInfo.availability}
                </span>
                <span className="inline-flex items-center gap-2 text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
                  {personalInfo.status}
                </span>
              </div>

              {/* Calls to action */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105"
                >
                  <span>Start a Project</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <span>View My Work</span>
                </Link>
                <a
                  href={personalInfo.resume}
                  download
                  className="inline-flex items-center gap-2 px-2 py-3 text-sm text-muted hover:text-primary transition-colors"
                >
                  <Download size={16} aria-hidden="true" />
                  <span>Download CV</span>
                </a>
              </div>

              {/* Proof points */}
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6 mt-10 pt-8 border-t border-white/10 lg:max-w-xl">
                {proofPoints.map((point) => (
                  <div key={point.label} className="flex flex-col-reverse">
                    <dt className="text-xs text-subtle mt-1">{point.label}</dt>
                    <dd className="text-2xl font-light text-white">{point.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right side - Large profile image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-full max-w-80 md:max-w-96">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500 bg-gray-900">
                  <Image
                    src={personalInfo.avatar || "/placeholder.svg"}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>

                <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/10 rounded-full backdrop-blur-sm border border-white/20" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/10 rounded-full backdrop-blur-sm border border-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Work */}
        <div className="mb-20">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-white mb-2">Selected Work</h2>
              <p className="text-muted">A selection of projects across agency, freelance, and personal work.</p>
            </div>
            <Link
              href="/projects"
              className="flex items-center space-x-2 text-sm text-muted whitespace-nowrap hover:text-primary transition-colors group"
            >
              <span>View all {projects.length} projects</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
