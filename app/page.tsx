import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, Phone, MapPin, ExternalLink, Github } from "lucide-react"
import type { Metadata } from "next"
import { personalInfo, contactInfo, projects, socialLinks } from "@/lib/data"
import { PROJECT_TYPE_LABELS, PROJECT_TYPE_STYLES } from "@/lib/project-types"
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

              <div className="max-w-2xl mb-8">
                <p className="text-lg text-muted leading-relaxed mb-8">{personalInfo.homeIntro}</p>

                <div className="flex flex-col md:flex-row items-start md:items-center space-y-1 md:space-y-0 md:space-x-6 text-sm text-subtle mb-8">
                  <span>{personalInfo.location}</span>
                  <span className="hidden md:inline">•</span>
                  <span className="text-green-400">{personalInfo.status}</span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail size={16} className="text-muted" />
                  <a href={`mailto:${contactInfo.email}`} className="text-muted hover:text-primary transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone size={16} className="text-muted" />
                  <a href={`tel:${contactInfo.phone}`} className="text-muted hover:text-primary transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin size={16} className="text-muted" />
                  <span className="text-muted">{contactInfo.location}</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105"
                >
                  <span>Let’s work together</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
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
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 mb-12">
            <h2 className="text-2xl font-light text-white">Featured Projects</h2>
            <Link
              href="/projects"
              className="flex items-center space-x-2 text-sm text-muted whitespace-nowrap hover:opacity-80 transition-opacity group"
            >
              <span>Explore all projects</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="group">
                <div className="minimal-card overflow-hidden hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-40 overflow-hidden bg-gray-900">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute bottom-3 right-3">
                      <span
                        className={`px-3 py-1.5 text-xs rounded-lg font-semibold shadow-lg ${PROJECT_TYPE_STYLES[project.type]}`}
                      >
                        {PROJECT_TYPE_LABELS[project.type]}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex space-x-2 transition-opacity [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 group-focus-within:opacity-100">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit the ${project.title} website (opens in a new tab)`}
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
                          aria-label={`View the ${project.title} source code on GitHub (opens in a new tab)`}
                          className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
                        >
                          <Github size={14} className="text-white" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium group-hover:translate-x-1 transition-transform duration-300 text-white">
                        {project.title}
                      </h3>
                      <span className="text-xs text-subtle">{project.year}</span>
                    </div>

                    <p className="text-sm text-muted mb-2">{project.category}</p>
                    <p className="text-sm text-muted mb-4 leading-relaxed">{project.description}</p>

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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
