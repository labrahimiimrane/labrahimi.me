"use client"

import { useEffect, useState } from "react"

interface LocalTimeProps {
  /** IANA time zone, e.g. "Africa/Casablanca" */
  timeZone: string
  /** City shown before the date, e.g. "Casablanca" */
  city: string
}

/**
 * Shows "City – 20:10:06" (24-hour local time) in the given time zone.
 * The page is pre-rendered at build time, so the time is computed in the browser
 * (after mount, to avoid a hydration mismatch) and refreshed every second.
 */
export function LocalTime({ timeZone, city }: LocalTimeProps) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const timer = setInterval(() => setNow(new Date()), 1_000)
    return () => clearInterval(timer)
  }, [])

  if (!now) return <>{city}</>

  const formatted = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(now)

  return (
    <>
      {city} – <time dateTime={now.toISOString()} className="tabular-nums">{formatted}</time>
    </>
  )
}
