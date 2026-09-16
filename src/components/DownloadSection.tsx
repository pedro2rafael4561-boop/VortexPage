"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faDownload,
  faSliders,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons"

export const DownloadSection = () => {
  const downloadUrl = "https://github.com/pedro2rafael4561-boop/VortexPage/releases/latest/download/Vortex-Cine.apk"

  const installSteps = [
    {
      step: "01",
      title: "Baixar o Arquivo APK",
      description: "Toque no botão de download acima para baixar a versão oficial mais recente diretamente no seu dispositivo Android.",
      icon: faDownload,
    },
    {
      step: "02",
      title: "Autorizar Instalação",
      description: "Caso o Android alerte sobre arquivo desconhecido, selecione 'Continuar' e permita a instalação nas configurações do navegador.",
      icon: faSliders,
    },
    {
      step: "03",
      title: "Ativar e Aproveitar",
      description: "Conclua a instalação gratuita, abra o app, insira as credenciais da sua assinatura e desfrute do melhor catálogo.",
      icon: faCirclePlay,
    },
  ]

  return (
    <section id="download" className="relative bg-carbon-950 py-20 text-white sm:py-28 overflow-hidden">
      {/* Luz ambiente roxa */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[850px] rounded-full bg-purple-600/15 blur-[160px]" />

      <div className="container relative z-10 max-w-4xl">
        {/* Card Principal de Download */}
        <div className="rounded-3xl border border-purple-500/40 bg-gradient-to-b from-carbon-900/95 via-carbon-900/80 to-carbon-950 p-8 sm:p-14 text-center shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(168,85,247,0.25)] backdrop-blur-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-1.5 text-xs font-bold text-purple-300 uppercase tracking-widest">
            <span className="size-2 rounded-full bg-purple-400 animate-ping" />
            Download Oficial Disponível
          </span>

          <h2 className="mt-6 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Baixe o <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">Vortex Cine</span> Agora
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            Instale a versão estável mais recente do app e transforme seu celular, tablet ou TV Box em um verdadeiro cinema particular.
          </p>

          {/* Detalhes da Versão */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm text-white/70">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              <span className="text-white/40">Versão:</span> <strong className="text-white">v1.1.2</strong>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              <span className="text-white/40">Lançamento:</span> <strong className="text-white">Setembro de 2026</strong>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              <span className="text-white/40">Tamanho:</span> <strong className="text-white">~158 MB</strong>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              <span className="text-white/40">Sistema:</span> <strong className="text-white">Android 7.0 ou superior</strong>
            </div>
          </div>

          {/* Botão de Download em Destaque */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href={downloadUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl border border-purple-400/50 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 px-10 py-5 text-lg font-extrabold text-white shadow-[0_0_35px_rgba(147,51,234,0.5)] backdrop-blur-md transition duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(168,85,247,0.8)]"
            >
              <FontAwesomeIcon icon={faDownload} className="size-5" />
              <span>Baixar Vortex-Cine.apk (v1.1.1)</span>
            </a>
          </div>

          <p className="mt-4 text-xs text-white/50">
            Download e instalação 100% gratuitos • Uso e liberação do catálogo mediante assinatura ativa.
          </p>
        </div>

        {/* Guia de Instalação Passo a Passo */}
        <div id="como-instalar" className="mt-20 pt-10 border-t border-white/10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">
              Passo a Passo
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              Como instalar no Android
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Instalação rápida e simples em apenas 3 passos
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
