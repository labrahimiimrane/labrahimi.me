import { Github, Linkedin } from "lucide-react"
import { XIcon } from "@/components/icons/x-icon"
import { socialLinks } from "@/lib/data"

const linkClassName =
  "w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-primary hover:bg-white/10 transition-all duration-300"

const links = [
  { href: socialLinks.github, title: "GitHub", icon: <Github size={16} /> },
  { href: socialLinks.linkedin, title: "LinkedIn", icon: <Linkedin size={16} /> },
  { href: socialLinks.x, title: "X", icon: <XIcon size={16} /> },
]

/** Round icon links to the social profiles in lib/data.ts. The parent provides the layout wrapper. */
export function SocialLinks() {
  return (
    <>
      {links.map(
        ({ href, title, icon }) =>
          href && (
            <a key={title} href={href} target="_blank" rel="noopener noreferrer" className={linkClassName} title={title}>
              {icon}
            </a>
          ),
      )}
    </>
  )
}
