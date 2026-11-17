"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FolderOpen, User, Mail } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Contact", href: "/contact", icon: Mail },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav aria-label="Main" className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="dock flex items-center space-x-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`dock-item ${isActive ? "active dock-item-with-text" : ""}`}
              title={item.name}
              aria-label={item.name}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={18} />
              {isActive && (
                <span className="dock-item-text ml-2 text-sm font-medium whitespace-nowrap">{item.name}</span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
