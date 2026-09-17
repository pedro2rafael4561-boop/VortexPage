"use client"
import Image from "next/image"
import appDemoImage from "@/assets/images/app-demo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { motion } from "framer-motion"

export const Hero = () => {
  const downloadUrl = "https://github.com/pedro2rafael4561-boop/VortexPage/releases/latest/download/Vortex-Cine.apk"

  return (
    <main className="relative overflow-hidden bg-carbon-950 text-white pt-12 sm:pt-20">
      {/* Grid de fundo sutil */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#1f1f27_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      
      {/* Luz ambiente roxa suave */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-[450px] w-[800px] rounded-full bg-purple-600/10 blur-[150px]" />

      <section className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Título Principal (Inspirado na referência: Built for every screen you watch on) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]"
        >
          Feito para todas as telas{" "}
          <br className="hidden sm:inline" />
          onde você assiste.
        </motion.h1>

        {/* Subtítulo Descritivo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-white/70 leading-relaxed px-1 sm:px-0"
        >
          O aplicativo definitivo de mídia para o seu celular, tablet e a TV que você já possui. Traga suas próprias listas e fontes. O Vortex Cine transforma tudo em uma biblioteca com pôsteres, sinopses, legendas e o seu ponto salvo em cada tela.
        </motion.p>

        {/* Botões de Ação Centrais (Estilo Pill da Referência) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-2 sm:px-0"
        >
          <a
            href={downloadUrl}
            className="w-full sm:w-auto justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black shadow-lg transition duration-200 hover:bg-white/90 active:scale-95 flex items-center gap-2.5"
          >
            <FontAwesomeIcon icon={faDownload} className="size-4" />
            <span>Baixar Vortex Cine</span>
          </a>

          <a
            href="#atualizacoes"
            className="w-full sm:w-auto justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-white/10 active:scale-95 flex items-center gap-2.5"
          >
            <FontAwesomeIcon icon={faClockRotateLeft} className="size-3.5 text-purple-400" />
            <span>Ver Atualizações</span>
          </a>
        </motion.div>

        {/* Aviso Discreto de Rodapé do Hero */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5 sm:mt-6 text-xs text-white/40 max-w-lg px-2"
        >
          Download gratuito para Android. O Vortex Cine não hospeda, armazena ou fornece qualquer mídia própria.
        </motion.p>

        {/* Demonstração Visual do App (Mockup de Telas da Referência) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 sm:mt-14 w-full max-w-5xl flex justify-center px-1 sm:px-0"
        >
          <div className="relative group w-full flex justify-center">
            {/* Brilho suave cinematográfico atrás da imagem */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600/15 via-indigo-600/15 to-purple-600/15 blur-2xl opacity-80" />
            
            <Image
              src={appDemoImage}
              alt="Demonstração do Vortex Cine no Celular e na TV"
              className="relative w-full max-w-4xl h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              priority
            />
          </div>
        </motion.div>

      </section>
    </main>
  )
}
