"use client"

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
}

export default function AnimatedCounter({ value, duration = 2, className = "" }: AnimatedCounterProps) {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  const displayValue = useTransform(springValue, (latest) => Math.round(latest))

  return (
    <motion.span ref={ref} className={className}>
      {displayValue}
    </motion.span>
  )
}
