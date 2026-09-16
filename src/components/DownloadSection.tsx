"use client"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faDownload,
  faSliders,
  faCirclePlay,
  faMobileScreenButton,
  faTv,
  faLaptop,
  faDisplay,
} from "@fortawesome/free-solid-svg-icons"

export const DownloadSection = () => {
  const [activeTab, setActiveTab] = useState<"phone" | "tv" | "desktop" | "smarttv">("phone")
  const downloadUrl = "https://github.com/pedro2rafael4561-boop/VortexPage/releases/latest/download/Vortex-Cine.apk"

  const tabs = [
    { id: "phone", label: "Celular", icon: faMobileScreenButton },
    { id: "tv", label: "TV & TV Box", icon: faTv },
    { id: "desktop", label: "Computador", icon: faLaptop },
    { id: "smarttv", label: "Smart TV", icon: faDisplay },
  ] as const

  const installSteps = [
    {
      step: "01",
      title: "Baixar o Arquivo APK",
      description: "Toque no botão 'Android APK' para baixar a versão oficial mais recente diretamente no seu aparelho.",
      icon: faDownload,
    },
    {
      step: "02",
      title: "Autorizar Instalação",
      description: "Caso o Android alerte sobre arquivo desconhecido, selecione 'Continuar' e permita nas configurações do navegador.",
      icon: faSliders,
    },
    {
      step: "03",
      title: "Ativar e Aproveitar",
      description: "Conclua a instalação gratuita, abra o app, conecte suas credenciais de plano e desfrute do catálogo completo.",
      icon: faCirclePlay,
    },
  ]

  return (
    <section id="download" className="relative bg-carbon-950 py-20 text-white sm:py-28 overflow-hidden">
      {/* Luz ambiente roxa sutil */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[900px] rounded-full bg-purple-600/10 blur-[170px]" />

      <div className="container relative z-10 max-w-5xl mx-auto px-4">
        
        {/* Cabeçalho da Seção (Inspirado na referência: Pick your screen) */}
        <div className="text-left max-w-3xl">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Escolha sua tela.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed">
            Cada versão é construída sob medida para a tela em que roda, e não um layout esticado para caber em todas. Escolha a sua e o download está logo ali.
          </p>
        </div>

        {/* Seletor de Abas (Segmented Control Pill da Referência) */}
        <div className="mt-10 flex items-center">
          <div className="inline-flex rounded-2xl border border-white/10 bg-carbon-900/90 p-1.5 backdrop-blur-xl shadow-lg">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition duration-200 ${
                    isActive
                      ? "bg-white text-black shadow-md"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <FontAwesomeIcon icon={tab.icon} className="size-3.5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Card Interativo da Plataforma Selecionada (Estilo Exato da Referência) */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-carbon-900/90 p-8 sm:p-14 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            
            {/* Lado Esquerdo: Textos e Botões */}
            <div className="max-w-xl space-y-6">
              {activeTab === "phone" && (
                <>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Vortex Cine para Android e iPhone
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    Navegue, busque e assista no Android e no iPhone. Entre com sua conta para sincronizar sua biblioteca, múltiplos perfis e o progresso dos vídeos entre todos os aparelhos.
                  </p>
                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <a
                      href={downloadUrl}
                      className="rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-bold text-black shadow-md transition hover:bg-white/90 hover:scale-105 flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faDownload} className="size-3.5" />
                      <span>Android APK</span>
                    </a>
                    <button
                      disabled
                      className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs sm:text-sm font-medium text-white/40 cursor-not-allowed"
                    >
                      TestFlight indisponível no momento
                    </button>
                  </div>
                </>
              )}

              {activeTab === "tv" && (
                <>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Vortex Cine para Android TV e TV Box
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    Interface cinematográfica 100% pensada para controle remoto (D-Pad). Reprodução contínua em 4K, carregamento instantâneo e grade completa de filmes, séries e canais ao vivo.
                  </p>
                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <a
                      href={downloadUrl}
                      className="rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-bold text-black shadow-md transition hover:bg-white/90 hover:scale-105 flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faDownload} className="size-3.5" />
                      <span>Android TV APK</span>
                    </a>
                    <a
                      href="#como-instalar"
                      className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs sm:text-sm font-medium text-white/80 hover:bg-white/10 transition"
                    >
                      Instruções de instalação TV
                    </a>
                  </div>
                </>
              )}

              {activeTab === "desktop" && (
                <>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Vortex Cine para Computador
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    Desfrute da experiência completa em monitores ultrawide, notebooks e desktops. Conectividade direta com suas credenciais e aceleração por hardware para fluidez máxima.
                  </p>
                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <button
                      disabled
                      className="rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-3 text-xs sm:text-sm font-bold text-purple-300"
                    >
                      Versão Desktop em Desenvolvimento
                    </button>
                    <a
                      href={downloadUrl}
                      className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs sm:text-sm font-medium text-white/70 hover:bg-white/10 transition"
                    >
                      Baixar APK (Emuladores)
                    </a>
                  </div>
                </>
              )}

              {activeTab === "smarttv" && (
                <>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Vortex Cine para Smart TVs
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    Compatível com sistemas Google TV, Fire TV Stick e Android TV de diversas marcas como Sony, TCL, Philips, Xiaomi e receptores modernos.
                  </p>
                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <a
                      href={downloadUrl}
                      className="rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-bold text-black shadow-md transition hover:bg-white/90 hover:scale-105 flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faDownload} className="size-3.5" />
                      <span>Baixar para Smart TV (APK)</span>
                    </a>
                  </div>
                </>
              )}
            </div>

            {/* Lado Direito: Logos das Plataformas em Destaque */}
            <div className="flex items-center justify-center lg:justify-end gap-8 pt-4 lg:pt-0">
              {/* Logo Android Oficial */}
              <div className="flex flex-col items-center gap-2 text-center group">
                <div className="size-16 sm:size-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 transition duration-300 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-10 sm:size-12 fill-[#3DDC84]"
                  >
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5802 8.411 13.8407 8.1 12 8.1s-3.5802.311-5.1368.8497L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-white/60">Android</span>
              </div>

              {/* Logo Apple Oficial */}
              <div className="flex flex-col items-center gap-2 text-center group">
                <div className="size-16 sm:size-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 transition duration-300 group-hover:border-white/30 group-hover:bg-white/10">
                  <svg
                    viewBox="0 0 170 170"
                    className="size-10 sm:size-12 fill-white"
                  >
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.92-3.3-7.9-8.15-11.95-14.56-6.1-9.69-10.85-20.73-14.25-33.11-3.4-12.38-5.1-24.23-5.1-35.55 0-14.44 3.46-26.4 10.37-35.88 6.92-9.48 15.75-14.32 26.5-14.52 4.35 0 9.28 1.16 14.79 3.48 5.51 2.32 9.07 3.54 10.68 3.66 1.48 0 5.25-1.32 11.3-3.95 6.05-2.64 11.27-3.79 15.66-3.48 11.53.84 20.8 5.2 27.8 13.08-10.24 6.2-15.25 14.88-15.02 26.04.22 8.79 3.63 16.14 10.23 22.05 6.6 5.91 14.49 9.38 23.67 10.41-2.12 6.54-4.58 13.04-7.39 19.51zm-32.32-114.7c0 5.67-2.07 11.19-6.22 16.56-4.14 5.37-9.33 9.01-15.56 10.92-.33-1.63-.5-3.04-.5-4.22 0-5.78 2.33-11.53 7-17.25 4.67-5.72 10.42-9.28 17.25-10.68.22 1.41.33 2.65.33 3.71z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-white/60">Apple</span>
              </div>
            </div>

          </div>
        </div>

        {/* Guia Passo a Passo de Instalação no Android */}
        <div id="como-instalar" className="mt-20 pt-10 border-t border-white/10">
          <div className="text-left max-w-xl">
            <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">
              Instalação Simples
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              Como instalar no Android
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Pronto para assistir em menos de 1 minuto
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {installSteps.map((step) => (
              <div
                key={step.step}
                className="relative rounded-2xl border border-white/10 bg-carbon-900/70 p-6 backdrop-blur-md transition hover:border-purple-500/40"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex size-12 items-center justify-center rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 text-lg">
                    <FontAwesomeIcon icon={step.icon} />
                  </div>
                  <span className="text-2xl font-black text-purple-400/40">
                    {step.step}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
