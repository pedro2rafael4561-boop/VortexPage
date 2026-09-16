"use client"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import logoImage from "@/assets/images/vortex-logo.png"

export const ProductShowcase = () => {
  const refContainer = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: refContainer,
    offset: ["start end", "end end"],
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [12, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1])

  return (
    <section id="como-e-o-app" ref={refContainer} className="relative overflow-hidden bg-gradient-to-b from-carbon-950 via-carbon-900 to-carbon-950 py-20 text-white sm:py-28">
      {/* Luz ambiente roxa */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[450px] w-[800px] rounded-full bg-purple-600/15 blur-[140px]" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300 uppercase tracking-widest">
            Experiência do Usuário
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Uma interface pensada para{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              amantes de cinema
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            Navegação rápida, visualização fluida e um design escuro em preto carbono com detalhes em roxo que não cansam a vista e valorizam cada cena.
          </p>
        </div>

        {/* Mockup Cinematográfico da Interface */}
        <motion.div
          style={{
            opacity,
            rotateX,
            scale,
            transformPerspective: "1000px",
          }}
          className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl border border-purple-500/30 bg-carbon-950/90 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(168,85,247,0.2)] backdrop-blur-2xl"
        >
          {/* Barra Superior do App Mockup */}
          <div className="flex items-center justify-between border-b border-white/10 bg-carbon-900/90 px-6 py-3.5">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-carbon-950 border border-purple-500/30 p-1 flex items-center justify-center">
                <Image src={logoImage} alt="Vortex Cine" className="size-full object-contain" />
              </div>
              <span className="font-bold text-sm text-white tracking-wide">
                VORTEX <span className="text-purple-400">CINE</span>
              </span>
            </div>

            {/* Menu da interface interna */}
            <div className="hidden sm:flex items-center gap-5 text-xs font-semibold text-white/70">
              <span className="text-purple-400 font-bold border-b-2 border-purple-500 pb-1">Início</span>
              <span className="hover:text-white transition">Filmes</span>
              <span className="hover:text-white transition">Séries</span>
              <span className="hover:text-white transition">Animes</span>
              <span className="hover:text-white transition">Ao Vivo</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="size-7 rounded-full bg-purple-600/30 border border-purple-400/50 flex items-center justify-center text-xs font-bold text-purple-200">
                VC
              </div>
            </div>
          </div>

          {/* Conteúdo da Interface Mockup */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Banner de Destaque Interno */}
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/80 via-carbon-900 to-carbon-950 p-6 sm:p-10 shadow-lg">
              <div className="relative z-10 max-w-lg space-y-3">
                <span className="inline-block rounded-md bg-purple-600/40 border border-purple-400/30 px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-purple-300 uppercase">
                  Destaque da Semana
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  O Retorno do Multiverso
                </h3>
                <p className="text-xs sm:text-sm text-white/70 line-clamp-2">
                  Embarque em uma jornada épica através de realidades paralelas com efeitos visuais deslumbrantes e som imersivo.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    Assistir Agora
                  </div>
                  <div className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
                    + Minha Lista
                  </div>
                </div>
              </div>
            </div>

            {/* Linha "Continuar Assistindo" */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white/90 uppercase tracking-wider flex items-center gap-2">
                  <span className="size-2 rounded-full bg-purple-400"></span>
                  Continuar Assistindo
                </h4>
                <span className="text-xs text-purple-400 hover:underline cursor-pointer">Ver tudo</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {[
                  { title: "Cyber Horizon", season: "T1 : EP 04", progress: "70%", cat: "Ficção" },
                  { title: "Sombras da Cidade", season: "T2 : EP 08", progress: "45%", cat: "Suspense" },
                  { title: "Guerreiros do Vento", season: "Episódio 12", progress: "90%", cat: "Anime" },
                  { title: "Planeta Selvagem", season: "Filme Completo", progress: "30%", cat: "Documentário" },
                ].map((item, idx) => (
                  <div key={idx} className="group rounded-xl border border-white/10 bg-carbon-900/80 p-3 transition hover:border-purple-500/50 hover:bg-carbon-850">
                    <div className="relative aspect-video rounded-lg bg-carbon-800 flex items-center justify-center overflow-hidden border border-white/5">
                      <span className="text-xs text-purple-300/60 font-semibold">{item.cat}</span>
                      {/* Barra de progresso */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                        <div className="h-full bg-purple-500 rounded-r" style={{ width: item.progress }} />
                      </div>
                    </div>
                    <div className="mt-2.5">
                      <p className="text-xs font-bold text-white truncate">{item.title}</p>
                      <p className="text-[11px] text-white/50">{item.season}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
