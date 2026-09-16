"use client"
import { motion } from "framer-motion"

const tickerItems = [
  { label: "Filmes em Lançamento", icon: "🎬" },
  { label: "Séries Completas & Temporadas", icon: "🍿" },
  { label: "Animes em Alta Definição", icon: "⚡" },
  { label: "Canais de TV Ao Vivo", icon: "📺" },
  { label: "Múltiplos Perfis para Toda a Família", icon: "👥" },
  { label: "41 Avatares Customizados", icon: "🎭" },
  { label: "Continuar Assistindo Sincronizado", icon: "🎯" },
  { label: "Player Cinematográfico Fluido", icon: "🚀" },
  { label: "Busca Inteligente e Rápida", icon: "🔍" },
]

export const LogoTicker = () => {
  return (
    <section className="border-y border-white/10 bg-carbon-900/60 py-6 text-white overflow-hidden backdrop-blur-md">
      <div className="container mb-3 text-center">
        <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">
          Experiência Completa de Entretenimento
        </span>
      </div>

      <div className="relative flex overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-carbon-950 before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-20 after:bg-gradient-to-l after:from-carbon-950 after:to-transparent after:content-['']">
        <motion.div
          initial={{ translateX: 0 }}
          animate={{ translateX: "-50%" }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex flex-none gap-6 pr-6 items-center"
        >
          {tickerItems.concat(tickerItems).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 shadow-sm backdrop-blur-sm whitespace-nowrap hover:border-purple-500/40 hover:bg-purple-600/10 transition"
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
