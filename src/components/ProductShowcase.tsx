"use client"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import appDemoImage from "@/assets/images/app-demo.png"

export const ProductShowcase = () => {
  const refContainer = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: refContainer,
    offset: ["start end", "end end"],
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1])

  return (
    <section id="como-e-o-app" ref={refContainer} className="relative overflow-hidden bg-gradient-to-b from-carbon-950 via-carbon-900 to-carbon-950 py-20 text-white sm:py-28">
      {/* Luz ambiente roxa suave */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[850px] rounded-full bg-purple-600/15 blur-[160px]" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300 uppercase tracking-widest">
            Experiência Visual
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Uma interface pensada para{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              amantes de cinema
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            Navegação fluida, visual moderno e catálogo organizado para celular, tablet e TV Box com máxima imersão.
          </p>
        </div>

        {/* Imagem Oficial de Demonstração do App */}
        <motion.div
          style={{
            opacity,
            rotateX,
            scale,
            transformPerspective: "1000px",
          }}
          className="mx-auto mt-14 max-w-5xl flex justify-center items-center"
        >
          <div className="relative group w-full flex justify-center">
            {/* Brilho suave cinematográfico atrás da imagem */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-purple-600/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
            
            <Image
              src={appDemoImage}
              alt="Demonstração da Interface do Vortex Cine no Celular e na TV"
              className="relative w-full max-w-4xl h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)]"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
