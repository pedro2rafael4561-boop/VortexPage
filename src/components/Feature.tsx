"use client"
import { useEffect, useRef } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"

interface FeatureProps {
  title: string
  description: string
  icon: IconDefinition
  tag?: string
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon, tag }) => {
  const border = useRef<HTMLDivElement>(null)
  const offsetX = useMotionValue(-100)
  const offsetY = useMotionValue(-100)
  const maskImage = useMotionTemplate`radial-gradient(150px 150px at ${offsetX}px ${offsetY}px, black, transparent)`

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!border.current) return
      const borderRect = border.current.getBoundingClientRect()
      offsetX.set(e.x - borderRect.x)
      offsetY.set(e.y - borderRect.y)
    }

    window.addEventListener("mousemove", updateMousePosition)
    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [offsetX, offsetY])

  return (
    <div className="relative flex flex-col rounded-2xl border border-white/10 bg-carbon-900/60 p-7 text-left backdrop-blur-xl transition duration-300 hover:border-purple-500/40 hover:shadow-[0_10px_30px_rgba(147,51,234,0.15)] group">
      {/* Glow roxo interativo ao passar o mouse */}
      <motion.div
        ref={border}
        className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-purple-500"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      />

      <div className="flex items-center justify-between mb-5">
        <div className="inline-flex size-12 items-center justify-center rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xl shadow-inner group-hover:scale-110 group-hover:bg-purple-600/30 group-hover:text-purple-200 transition duration-300">
          <FontAwesomeIcon icon={icon} className="size-5" />
        </div>
        {tag && (
          <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-purple-300 uppercase tracking-wider">
            {tag}
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-purple-300 transition">
        {title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-white/70">
        {description}
      </p>
    </div>
  )
}

export default Feature
