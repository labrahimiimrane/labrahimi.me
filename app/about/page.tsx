import Image from "next/image"
import Link from "next/link"
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Download,
  Calendar,
  Code,
  User,
} from "lucide-react"
import { SocialLinks } from "@/components/social-links"
import type { Metadata } from "next"
import { personalInfo, experience, education, skills, contactInfo } from "@/lib/data"
import { pageMetadata } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "About Labrahimi Imrane, a full-stack web developer in Casablanca, Morocco, with 6+ years of experience in WordPress, PHP, React, and Next.js: skills, professional experience, and education.",
  path: "/about",
})

const skillLabels: Record<keyof typeof skills, string> = {
  frontend: "Frontend Development",
  backend: "Backend Development",
  database: "Databases",
  cms: "CMS & Headless CMS",
}

export default function About() {
  return (
    <div className="min-h-screen dot-grid">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h1 className="text-3xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
              About Me
            </h1>
            <p className="max-w-2xl text-lg text-muted leading-relaxed m-auto">
              Full-stack developer with 6+ years of experience building responsive
              websites with WordPress, Next.js, and other modern technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start md:sticky md:top-[30px]">
              <div className="relative w-full max-w-80">
                <div
                  className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500"
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                >
                  <Image
                    src={personalInfo.avatar || "/placeholder.svg"}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/10 rounded-full backdrop-blur-sm border border-white/20" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/10 rounded-full backdrop-blur-sm border border-white/20" />
              </div>
            </div>

            {/* Bio & Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Info Card */}
              <div className="minimal-card p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <User size={20} className="text-muted" />
                  <h2 className="text-2xl font-light" style={{ color: "var(--text-primary)" }}>
                    {personalInfo.name}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text-primary)" }}>
                      {personalInfo.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-subtle mb-6">
                      <div className="flex items-center space-x-2">
                        <MapPin size={14} />
                        <span>{personalInfo.location}</span>
                      </div>
                      <span className="hidden md:inline">•</span>
                      <span className="text-green-400">{personalInfo.status}</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-muted leading-relaxed">
                    {personalInfo.aboutBio.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                    <div className="flex items-center space-x-3">
                      <Mail size={16} className="text-muted" />
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-sm text-muted hover:text-primary transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone size={16} className="text-muted" />
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-sm text-muted hover:text-primary transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center flex-wrap gap-4 justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center space-x-4">
                      <SocialLinks />
                    </div>

                    <a
                      href={personalInfo.resume}
                      className="inline-flex items-center whitespace-nowrap space-x-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105"
                      download
                    >
                      <span>Download Resume</span>
                      <Download size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Code size={20} className="text-muted" />
              <h2 className="text-3xl font-light" style={{ color: "var(--text-primary)" }}>
                Technical Skills
              </h2>
            </div>
            <p className="text-muted max-w-2xl mx-auto">Tools and technologies I use to build responsive, engaging web experiences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="minimal-card p-6 hover:scale-[1.02] transition-all duration-300 group">
                <h3
                  className="text-lg font-medium mb-4 text-center"
                  style={{ color: "var(--text-primary)" }}
                >
                  {skillLabels[category as keyof typeof skillLabels] ?? category}
                </h3>
                <div className="space-y-3">
                  {skillList.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center justify-center px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-muted hover:bg-white/10 hover:border-white/20 hover:text-primary transition-all duration-300"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Briefcase size={20} className="text-muted" />
              <h2 className="text-3xl font-light" style={{ color: "var(--text-primary)" }}>
                Professional Experience
              </h2>
            </div>
            <p className="text-muted max-w-2xl mx-auto">An overview of my professional background.</p>
          </div>

          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={`${exp.company}-${exp.period}`} className="minimal-card p-8 hover:scale-[1.01] transition-all duration-300 group">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors duration-300">
                        <Briefcase size={18} className="text-muted" />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-1" style={{ color: "var(--text-primary)" }}>
                          {exp.role}
                        </h3>
                        <p className="text-lg text-muted mb-2">{exp.company}</p>
                        <div className="flex items-center space-x-2 text-sm text-subtle">
                          <Calendar size={14} />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted leading-relaxed mb-6 ml-16">{exp.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 ml-16">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-subtle hover:bg-white/10 hover:text-muted transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <GraduationCap size={20} className="text-muted" />
              <h2 className="text-3xl font-light" style={{ color: "var(--text-primary)" }}>
                Education
              </h2>
            </div>
            <p className="text-muted max-w-2xl mx-auto">Academic background and continuous learning journey</p>
          </div>

          <div className="space-y-6">
            {education.map((edu) => (
              <div key={`${edu.school}-${edu.period}`} className="minimal-card p-8 hover:scale-[1.01] transition-all duration-300 group">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors duration-300">
                        <GraduationCap size={18} className="text-muted" />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-1" style={{ color: "var(--text-primary)" }}>
                          {edu.degree}
                        </h3>
                        <p className="text-lg text-muted mb-2">{edu.school}</p>
                        <div className="flex items-center space-x-2 text-sm text-subtle">
                          <Calendar size={14} />
                          <span>{edu.period}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted leading-relaxed ml-16">{edu.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="minimal-card p-12">
            <h2 className="text-2xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
              Let&apos;s Work Together
            </h2>
            <p className="text-muted mb-8 max-w-2xl mx-auto">
              Have a website or digital project in mind? Let’s talk about how I can help bring it to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105"
              >
                <span>Get in touch</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <span>Explore my work</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
