import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { personalInfo } from "@/lib/data"
import { siteUrl } from "@/lib/site"

// Social share card, generated once at build time in the site's style (black background, Geist, avatar)
export const alt = `${personalInfo.name}, ${personalInfo.title}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans")

export default async function OpengraphImage() {
  const [geistLight, geistRegular, avatar] = await Promise.all([
    readFile(join(fontDir, "Geist-Light.ttf")),
    readFile(join(fontDir, "Geist-Regular.ttf")),
    readFile(join(process.cwd(), "public", personalInfo.avatar)),
  ])
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`
  const domain = new URL(siteUrl).host

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 96px",
          backgroundColor: "#000000",
          color: "#ffffff",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 620 }}>
          <div style={{ fontSize: 76, fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            {personalInfo.name}
          </div>
          <div style={{ fontSize: 38, fontWeight: 300, color: "rgba(255,255,255,0.6)", marginTop: 20 }}>
            {personalInfo.title}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.6)", marginTop: 48 }}>
            {personalInfo.location}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#4ade80", marginTop: 8 }}>{personalInfo.status}</div>
          <div style={{ display: "flex", fontSize: 24, color: "rgba(255,255,255,0.5)", marginTop: 48 }}>{domain}</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain <img> */}
        <img
          src={avatarSrc}
          alt=""
          width={340}
          height={340}
          style={{ borderRadius: 24, border: "1px solid rgba(255,255,255,0.1)", objectFit: "cover" }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistLight, weight: 300, style: "normal" },
        { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
      ],
    },
  )
}
