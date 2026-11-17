import type { Metadata } from "next"
import { Mail, MapPin, Phone, Clock, Briefcase, Globe, Download } from "lucide-react"
import { contactInfo, personalInfo } from "@/lib/data"
import { pageMetadata } from "@/lib/site"
import { SocialLinks } from "@/components/social-links"
import { ContactForm } from "@/components/contact-form"
import { LocalTime } from "@/components/local-time"

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Labrahimi Imrane about a freelance website project or a full-time full-stack developer role. Available remotely or on-site in Casablanca, Morocco.",
  path: "/contact",
})

// `order` pairs items neatly in the 2-column grid below 1024px; from 1024px they follow this list's order.
// `wide` items take the full row on phones.
const contactDetails = [
  { icon: Briefcase, label: "Open to", value: "Freelance projects & full-time roles", wide: true, order: "order-1" },
  { icon: Globe, label: "Work setup", value: personalInfo.availability, order: "order-2" },
  { icon: Mail, label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}`, wide: true, order: "order-4" },
  { icon: Phone, label: "Phone", value: contactInfo.phone, href: `tel:${contactInfo.phone}`, order: "order-5" },
  { icon: MapPin, label: "Location", value: contactInfo.location, order: "order-3" },
  {
    icon: Clock,
    label: "Timezone",
    value: <LocalTime timeZone={contactInfo.timezone.id} city={contactInfo.timezone.city} />,
    order: "order-6",
  },
]

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
          {/* Contact Form: first on small screens, right column on large screens */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Info: compact grid card below 1024px, single column on the left from 1024px */}
          <div className="lg:col-span-1 lg:order-first">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
              <dl className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 sm:gap-x-6 gap-y-6">
                {contactDetails.map(({ icon: Icon, label, value, href, wide, order }) => (
                  <div
                    key={label}
                    className={`flex items-start gap-3 min-w-0 ${order} lg:order-none ${wide ? "col-span-2 sm:col-span-1" : ""}`}
                  >
                    <Icon size={18} className="text-muted mt-1 shrink-0 hidden sm:block lg:block" aria-hidden="true" />
                    <div className="min-w-0">
                      <dt className="text-sm text-subtle mb-1">{label}</dt>
                      <dd className="text-sm" style={{ color: "var(--text-primary)" }}>
                        {href ? (
                          <a href={href} className="hover:opacity-80 transition-opacity">
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>

              {/* Social Links and CV: side by side below 1024px, stacked from 1024px */}
              <div className="flex flex-wrap items-end justify-between gap-6 mt-6 pt-6 border-t border-white/10 lg:block lg:border-0 lg:pt-0">
                <div>
                  <p className="text-sm text-subtle mb-3">Where to find me</p>
                  <div className="flex space-x-4">
                    <SocialLinks />
                  </div>
                </div>

                <a
                  href={personalInfo.resume}
                  download
                  className="inline-flex items-center gap-2 lg:mt-8 px-5 py-2.5 text-sm bg-white/5 border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <Download size={16} aria-hidden="true" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
