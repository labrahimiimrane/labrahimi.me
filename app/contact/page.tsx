import type { Metadata } from "next"
import { Mail, MapPin, Phone, Clock, Briefcase, Globe, Download } from "lucide-react"
import { contactInfo, personalInfo } from "@/lib/data"
import { pageMetadata } from "@/lib/site"
import { SocialLinks } from "@/components/social-links"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Labrahimi Imrane about a freelance website project or a full-time full-stack developer role. Available remotely or on-site in Casablanca, Morocco.",
  path: "/contact",
})

export default function Contact() {
  return (
    <div className="min-h-screen dot-grid">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-32">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
            Let&apos;s Work Together
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted leading-relaxed">
            Whether you need a custom website for your business or you&apos;re hiring a full-stack web developer,
            I&apos;d like to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <Briefcase size={18} className="text-muted mt-1" aria-hidden="true" />
                <div>
                  <p className="text-sm text-subtle mb-1">Open to</p>
                  <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                    Freelance projects &amp; full-time roles
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Globe size={18} className="text-muted mt-1" aria-hidden="true" />
                <div>
                  <p className="text-sm text-subtle mb-1">Work setup</p>
                  <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                    {personalInfo.availability}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail size={18} className="text-muted mt-1" />
                <div>
                  <p className="text-sm text-subtle mb-1">Email</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm hover:opacity-80 transition-opacity"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone size={18} className="text-muted mt-1" />
                <div>
                  <p className="text-sm text-subtle mb-1">Phone</p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-sm hover:opacity-80 transition-opacity"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-muted mt-1" />
                <div>
                  <p className="text-sm text-subtle mb-1">Location</p>
                  <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                    {contactInfo.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock size={18} className="text-muted mt-1" />
                <div>
                  <p className="text-sm text-subtle mb-1">Timezone</p>
                  <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                    {contactInfo.timezone}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-sm text-subtle mb-3">Where to find me</p>
              <div className="flex space-x-4">
                <SocialLinks />
              </div>
            </div>

            <a
              href={personalInfo.resume}
              download
              className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 text-sm bg-white/5 border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <Download size={16} aria-hidden="true" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
