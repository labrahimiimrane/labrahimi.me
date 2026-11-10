import { Mail, MapPin, Phone, Clock, Github, Linkedin } from "lucide-react"
import { contactInfo, socialLinks } from "@/lib/data"
import { XIcon } from "@/components/icons/x-icon"
import { ContactForm } from "@/components/contact-form"

export default function Contact() {
  return (
    <div className="min-h-screen dot-grid pb-20" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-3xl font-light mb-4" style={{ color: "var(--text-primary)" }}>
            Contact
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Have a project in mind? I’d be happy to hear about it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
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
                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-primary transition-colors"
                    title="GitHub"
                  >
                    <Github size={20} />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-primary transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {socialLinks.x && (
                  <a
                    href={socialLinks.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-primary transition-colors"
                    title="X"
                  >
                    <XIcon size={20} />
                  </a>
                )}
              </div>
            </div>
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
