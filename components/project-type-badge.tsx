import { Code, Sparkles, User } from "lucide-react"
import type { ProjectType } from "@/lib/data"
import { PROJECT_TYPE_LABELS } from "@/lib/project-types"

/** Agency mark: white "em" monogram on a black circle (nested transforms from the source SVG flattened). */
function AgencyMark() {
  return (
    <svg viewBox="0 0 1128 1128" width="40" height="40" aria-hidden="true">
      <circle cx="564" cy="564" r="564" fill="#000" />
      <path
        transform="translate(131.18 370.222)"
        fill="#fff"
        d="M702.208,27.409c-43.12,0-78.169,15.943-100.806,41.144-28.155-25.2-63.792-41.144-106.324-41.144-28.155,0-53.945,9.837-71.075,22.637L360.6,35.869V343.616h68.91V161.877c0-48.039,30.13-65.169,65.568-65.169,41.155,0,70.686,32.485,70.686,68.122V343.616h68.122V159.323c0-35.637,32.684-62.615,68.322-62.615,34.849,0,68.122,32.485,68.122,68.122V343.616h69.309V159.323C839.639,81.354,781.354,27.409,702.208,27.409ZM164.6,360.147c42.332,0,83.487-12.4,121.489-41.155l-28.165-52.169c-28.344,13.978-58.275,23.825-90.959,23.825-70.487,0-101.794-70.487-90.77-70.487H300.254c3.153-13,3.153-22.847,3.153-32.684,0-87.817-55.322-155.939-146.291-155.939C65.169,31.539,0,103.991,0,192.985,0,289.461,70.686,360.147,164.6,360.147ZM154.162,97.3c51.591,0,75.415,39.179,75.415,67.533H73.639C73.639,132.345,113.607,97.3,154.162,97.3Z"
      />
    </svg>
  )
}

/** White glyphs on the same black circle as the agency mark (they match the projects filter icons). */
const GLYPHS: Record<Exclude<ProjectType, "agency">, typeof User> = {
  freelance: User,
  sideprojects: Code,
  "ai-assisted-sdd": Sparkles,
}

/** 40×40 circular icon identifying a project's type; the label is exposed as a tooltip and to screen readers. */
export function ProjectTypeBadge({ type }: { type: ProjectType }) {
  const label = PROJECT_TYPE_LABELS[type]

  return (
    <span
      role="img"
      aria-label={`${label} project`}
      title={label}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black text-white ring-1 ring-white/20 shadow-lg"
    >
      {type === "agency" ? (
        <AgencyMark />
      ) : (
        (() => {
          const Glyph = GLYPHS[type]
          return <Glyph size={20} strokeWidth={2.25} aria-hidden="true" />
        })()
      )}
    </span>
  )
}
