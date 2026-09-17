"use client"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFilm,
  faTv,
  faBolt,
  faUsers,
  faMasksTheater,
  faClockRotateLeft,
  faRocket,
  faMagnifyingGlass,
  faTowerBroadcast,
} from "@fortawesome/free-solid-svg-icons"

const tickerItems = [
  { label: "Filmes em Lançamento", icon: faFilm },
  { label: "Séries Completas & Temporadas", icon: faTv },
  { label: "Animes em Alta Definição", icon: faBolt },
  { label: "Canais de TV Ao Vivo", icon: faTowerBroadcast },
  { label: "Múltiplos Perfis para Toda a Família", icon: faUsers },
  { label: "41 Avatares Customizados", icon: faMasksTheater },
  { label: "Continuar Assistindo Sincronizado", icon: faClockRotateLeft },
  { label: "Player Cinematográfico Fluido", icon: faRocket },
  { label: "Busca Inteligente e Rápida", icon: faMagnifyingGlass },
]

export const LogoTicker = () => {
  return (
    <section className="border-y border-white/10 bg-carbon-900/60 py-6 text-white overflow-hidden backdrop-blur-md">
      <div className="container mb-3 text-center">
        <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">
          Experiência Completa de Entretenimento
        </span>
      </div>

      <div className="relative flex overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-6 sm:before:w-20 before:bg-gradient-to-r before:from-carbon-950 before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-6 sm:after:w-20 after:bg-gradient-to-l after:from-carbon-950 after:to-transparent after:content-['']">
        <motion.div
          initial={{ translateX: 0 }}
          animate={{ translateX: "-50%" }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex flex-none gap-4 sm:gap-6 pr-4 sm:pr-6 items-center"
        >
          {tickerItems.concat(tickerItems).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white/90 shadow-sm backdrop-blur-sm whitespace-nowrap hover:border-purple-500/40 hover:bg-purple-600/10 transition"
            >
              <FontAwesomeIcon icon={item.icon} className="text-purple-400 text-xs sm:text-sm" />
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
