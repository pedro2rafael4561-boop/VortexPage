"use client"
import PlusIcon from "@/assets/icons/plus.svg"
import MinusIcon from "@/assets/icons/minus.svg"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const faqItems = [
  {
    question: "O que é o Vortex Cine?",
    answer:
      "O Vortex Cine é um aplicativo moderno e completo para reprodução e organização de mídias, incluindo filmes, séries, animes e canais de TV ao vivo. Desenvolvido com interface cinematográfica estilo carbon e roxo, oferece uma experiência rápida, limpa e imersiva.",
  },
  {
    question: "O aplicativo é gratuito?",
    answer:
      "Sim! O download do aplicativo oficial do Vortex Cine é 100% gratuito. Você pode baixar o arquivo APK oficial diretamente em nosso site e instalá-lo em seus aparelhos Android.",
  },
  {
    question: "Em quais dispositivos posso instalar o Vortex Cine?",
    answer:
      "O Vortex Cine é compatível com qualquer dispositivo executando o sistema Android 7.0 ou superior, incluindo smartphones, tablets, smart TVs com Android TV e TV Boxes.",
  },
  {
    question: "Como funciona a sincronização e os múltiplos perfis?",
    answer:
      "Você pode criar perfis separados para cada membro da família, cada um com suas próprias listas, histórico de episódios assistidos e avatares temáticos exclusivos. As preferências de cada perfil ficam salvas com persistência garantida no dispositivo.",
  },
  {
    question: "Como recebo novas atualizações?",
    answer:
      "O próprio aplicativo possui um verificador nativo de atualizações. Sempre que uma nova versão estável for disponibilizada pela nossa equipe, o app informará na tela para você atualizar com apenas um clique.",
  },
  {
    question: "O Vortex Cine hospeda algum tipo de conteúdo?",
    answer:
      "Não. O Vortex Cine opera exclusivamente como uma ferramenta de software de reprodução de mídia e organização de interface. O aplicativo não armazena, não transmite e não hospeda arquivos audiovisuais em servidores próprios.",
  },
]

const AccordionItem = ({
  question,
  answer,
}: {
  question: string
  answer: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`cursor-pointer rounded-2xl border transition duration-300 p-6 backdrop-blur-xl ${
        isOpen
          ? "border-purple-500/40 bg-carbon-900/90 shadow-[0_4px_20px_rgba(147,51,234,0.1)]"
          : "border-white/10 bg-carbon-900/50 hover:border-white/20"
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-base sm:text-lg font-bold text-white tracking-tight">
          {question}
        </span>
        <div className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-300 flex-shrink-0">
          {isOpen ? <MinusIcon className="size-3.5" /> : <PlusIcon className="size-3.5" />}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: "14px" }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="text-sm sm:text-base leading-relaxed text-white/70 border-t border-white/10 pt-3"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const FAQs = () => {
  return (
    <section id="duvidas" className="relative bg-carbon-950 py-20 text-white sm:py-28">
      {/* Luz ambiente roxa */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-purple-900/10 blur-[150px]" />

      <div className="container relative z-10 max-w-3xl">
        <div className="text-center mx-auto max-w-xl">
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300 uppercase tracking-widest">
            Tire Suas Dúvidas
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-base text-white/70">
            Confira as respostas para as principais perguntas sobre o Vortex Cine.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqItems.map(({ question, answer }) => (
            <AccordionItem key={question} question={question} answer={answer} />
          ))}
        </div>
      </div>
    </section>
  )
}
