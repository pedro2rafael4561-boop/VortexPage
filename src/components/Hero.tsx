"use client"
import Image from "next/image"
import logoImage from "@/assets/images/vortex-logo.png"
import ArrowWIcon from "@/assets/icons/arrow-w.svg"
import { motion } from "framer-motion"

export const Hero = () => {
  const downloadUrl = "https://github.com/pedro2rafael4561-boop/VortexPage/releases/latest/download/Vortex-Cine.apk"

  return (
    <main className="relative overflow-hidden bg-carbon-950 text-white">
      {/* Luz ambiente roxa cinematográfica no topo */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[800px] rounded-full bg-purple-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute top-48 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-indigo-600/15 blur-[100px]" />

      <section className="relative py-16 sm:py-24 lg:py-32">
        <div className="container relative z-10 flex flex-col items-center text-center">
          
          {/* Badge Versão Oficial */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="#atualizacoes"
              className="inline-flex items-center gap-2.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300 backdrop-blur-md transition hover:border-purple-500/60 hover:bg-purple-500/20"
            >
              <span className="size-2 rounded-full bg-purple-400 animate-ping" />
              <span>Vortex Cine v1.1.1 lançado</span>
              <span className="text-white/40">|</span>
              <span className="inline-flex items-center gap-1 text-white">
                Ver novidades
                <ArrowWIcon className="size-3" />
              </span>
            </a>
          </motion.div>

          {/* Logo Central */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mt-8"
          >
            <div className="relative size-24 sm:size-32 rounded-3xl border border-white/10 bg-carbon-900 p-3 shadow-xl backdrop-blur-xl">
              <Image
                src={logoImage}
                alt="Vortex Cine App"
                className="size-full object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
          >
            O Universo do Entretenimento em{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Suas Mãos
            </span>
          </motion.h1>

          {/* Subtítulo / Descrição Curta */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl text-base sm:text-xl text-white/70 leading-relaxed"
          >
            Filmes, séries, animes e canais ao vivo reunidos em uma experiência
            cinematográfica incomparável. Rápido, organizado e com suporte a
            múltiplos perfis para toda a família.
          </motion.p>

          {/* Botões de Ação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            {/* Botão de Download */}
            <a
              href={downloadUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl border border-purple-400/40 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 px-8 py-4 text-base font-bold text-white shadow-[0_0_35px_rgba(147,51,234,0.45)] backdrop-blur-lg transition duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(168,85,247,0.7)]"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Baixar Vortex Cine (APK)</span>
            </a>

            {/* Botão Secundário */}
            <a
              href="#como-instalar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-base font-semibold text-white/90 backdrop-blur-md transition duration-300 hover:bg-white/10 hover:text-white"
            >
              <span>Como Instalar</span>
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </motion.div>

          {/* Badges de Destaque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm text-white/60"
          >
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="text-purple-400">✓</span> Compatível com Android 7.0+
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="text-purple-400">✓</span> Player Otimizado
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="text-purple-400">✓</span> 41 Avatares Exclusivos
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="text-purple-400">✓</span> Instalação Gratuita
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  )
}
