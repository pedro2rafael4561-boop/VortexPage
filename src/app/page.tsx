import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/Navbar"
import logoImage from "@/assets/images/vortex-logo.png"
import {
  Tv,
  Smartphone,
  Sparkles,
  Zap,
  Film,
  ShieldCheck,
  Download,
  ArrowRight,
  CheckCircle2,
  LogIn,
  Sliders,
  Play,
  MonitorPlay,
  RefreshCw,
} from "lucide-react"

export const metadata = {
  title: "Vortex Cine | Site Oficial - O Cinema Definitivo na Sua Tela",
  description: "Acesse filmes, séries e canais ao vivo no celular e na Smart TV com o ecossistema oficial Vortex Cine.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-carbon-950 text-white flex flex-col selection:bg-brand selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-32 border-b border-carbon-700/40">
        {/* Glow sutil cinematográfico carmim */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[700px] bg-brand/[0.07] blur-[150px] pointer-events-none rounded-full" />
        <div className="absolute top-1/2 left-1/4 h-[300px] w-[300px] bg-white/[0.02] blur-[120px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-carbon-850 border border-carbon-700/80 px-4 py-1.5 text-xs font-semibold text-neutral-300 mb-8 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            <span>Ecossistema Oficial Vortex Cine</span>
            <span className="h-1 w-1 rounded-full bg-neutral-600" />
            <span className="text-brand font-bold">Mobile v1.2.15 • TV v1.0.4</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] mb-6">
            O Cinema Definitivo no Seu <span className="text-brand">Celular</span> e na Sua <span className="text-brand">TV</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Filmes, séries completas e canais ao vivo transmitidos com máxima estabilidade, motor Xtream nativo e sincronização contínua de perfis e progresso.
          </p>

          {/* Grupo de Botões de Ação Principal */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-xl mx-auto">
            {/* Botão 1: Fazer Login na Conta */}
            <Link
              href="/entrar"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 rounded-2xl bg-brand px-6 py-4 text-sm font-bold text-white shadow-xl shadow-brand/25 transition-all hover:bg-brand-hover active:scale-95 cursor-pointer"
            >
              <LogIn className="h-4 w-4" />
              <span>Fazer Login</span>
              <ArrowRight className="h-4 w-4 opacity-80" />
            </Link>

            {/* Botão 2: Parear Smart TV */}
            <Link
              href="/tvlogin"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 rounded-2xl bg-carbon-850 border border-carbon-700 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-carbon-800 hover:border-carbon-600 active:scale-95 cursor-pointer"
            >
              <Tv className="h-4 w-4 text-brand" />
              <span>Conectar Smart TV</span>
            </Link>

            {/* Botão 3: Downloads */}
            <Link
              href="/downloads"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-carbon-900/90 border border-carbon-800 px-5 py-4 text-sm font-medium text-neutral-300 transition hover:text-white hover:border-carbon-700 active:scale-95 cursor-pointer"
            >
              <Download className="h-4 w-4 text-neutral-400" />
              <span>Baixar APKs</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Seção Baixar Aplicativos Oficiais */}
      <section className="py-20 bg-carbon-900/50 border-b border-carbon-700/40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3 text-white">
              Escolha Sua Tela e Comece a Assistir
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              Instale as versões oficiais mais recentes do Vortex Cine otimizadas para cada tipo de processador e dispositivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card Mobile */}
            <div className="rounded-3xl bg-carbon-850 border border-carbon-700/80 p-7 sm:p-8 flex flex-col justify-between transition hover:border-carbon-600 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition text-brand">
                <Smartphone className="w-24 h-24" />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-lg bg-brand/10 border border-brand/20 px-3 py-1 text-xs font-bold text-brand mb-4">
                  Android Smartphone & Tablet
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Vortex Cine Mobile</h3>
                <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                  Interface touch moderna, reprodução offline de episódios, player com aceleração de hardware e busca avançada por categorias.
                </p>

                <div className="space-y-2 mb-8 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Versão v1.2.15 (Compilação Full Debug Oficial)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Transmissão ao vivo estável sem travamento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Temporadas completas com reprodução direta</span>
                  </div>
                </div>
              </div>

              <a
                href="https://github.com/pedro2rafael4561-boop/VortexCine/releases/download/v1.2.15/VortexCine-v1.2.15.apk"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-hover text-white py-3.5 px-4 font-bold text-sm transition shadow-lg shadow-brand/20 active:scale-95"
              >
                <Download className="h-4 w-4" />
                <span>Baixar Vortex Cine Mobile (v1.2.15)</span>
              </a>
            </div>

            {/* Card Smart TV */}
            <div className="rounded-3xl bg-carbon-850 border border-carbon-700/80 p-7 sm:p-8 flex flex-col justify-between transition hover:border-carbon-600 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition text-white">
                <Tv className="w-24 h-24" />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-3 py-1 text-xs font-bold text-white mb-4">
                  Android TV • Google TV • Fire TV
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Vortex Cine TV</h3>
                <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                  Experiência 100% cinematográfica desenhada para controle remoto D-Pad, navegação fluida em 4K e pareamento rápido via código.
                </p>

                <div className="space-y-2 mb-8 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Versão v1.0.4 Oficial para TV</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Pareamento instantâneo em /link e /tvlogin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Suporte a TV Boxes, Fire TV Stick e Smart TVs</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://github.com/pedro2rafael4561-boop/VortexCineTV/releases/download/v1.0.4/Vortex-Cine-TV.apk"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-neutral-200 text-carbon-950 py-3.5 px-3 font-bold text-xs sm:text-sm transition active:scale-95 text-center"
                >
                  <Download className="h-4 w-4" />
                  <span>APK Universal (TV)</span>
                </a>
                <a
                  href="https://github.com/pedro2rafael4561-boop/VortexCineTV/releases/download/v1.0.4/Vortex-Cine-TV-arm7a.apk"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-carbon-800 hover:bg-carbon-700 text-white border border-carbon-600 py-3.5 px-3 font-bold text-xs sm:text-sm transition active:scale-95 text-center"
                >
                  <Download className="h-4 w-4 text-neutral-400" />
                  <span>ARM7a (Fire TV)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Parear a TV em 3 Passos */}
      <section className="py-20 border-b border-carbon-700/40">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/20 px-3.5 py-1.5 text-xs font-bold text-brand mb-4">
              <Tv className="h-3.5 w-3.5" />
              <span>Conexão Sem Fio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3 text-white">
              Como Conectar sua TV em 3 Passos
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              Esqueça ter que digitar e-mail e senha complexos no controle remoto da TV.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-carbon-850 border border-carbon-700/80 flex flex-col">
              <div className="h-10 w-10 rounded-xl bg-brand/15 text-brand font-black text-base flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-white mb-2">Abra o Vortex Cine na TV</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Abra o aplicativo na sua Android TV ou Fire TV. Um código de pareamento e um QR Code serão gerados na tela.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-carbon-850 border border-carbon-700/80 flex flex-col">
              <div className="h-10 w-10 rounded-xl bg-brand/15 text-brand font-black text-base flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-white mb-2">Acesse a Página de Pareamento</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Escaneie o QR Code ou acesse <strong className="text-neutral-200">vortex-page.vercel.app/link</strong> (ou <strong className="text-neutral-200">/tvlogin</strong>) no seu celular.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-carbon-850 border border-carbon-700/80 flex flex-col">
              <div className="h-10 w-10 rounded-xl bg-brand/15 text-brand font-black text-base flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-white mb-2">Digite o Código e Pronto</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Confirme seu perfil de usuário. Sua Smart TV é autenticada instantaneamente e seus filmes e séries aparecem na tela.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/tvlogin"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/20 hover:bg-brand-hover transition"
            >
              <Tv className="h-4 w-4" />
              <span>Abrir Pareamento de TV Agora</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Diferenciais Técnicos */}
      <section className="py-20 bg-carbon-900/60 border-b border-carbon-700/40">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3 text-white">
              Recursos Construídos para Quem Ama Cinema
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              Cada linha de código foi pensada para eliminar atritos, travamentos e complexidades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-carbon-850 border border-carbon-700 p-6">
              <div className="h-12 w-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Motor Xtream Puro</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Reprodução direta MPEG-TS (.ts) e VOD nativo (.mp4). Sem empacotadores intermediários, resultando em inicialização rápida.
              </p>
            </div>

            <div className="rounded-2xl bg-carbon-850 border border-carbon-700 p-6">
              <div className="h-12 w-12 rounded-xl bg-white/5 border border-carbon-700 flex items-center justify-center text-white mb-4">
                <RefreshCw className="h-6 w-6 text-brand" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Sincronização em Nuvem</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Comece um filme no trajeto pelo celular e continue no minuto exato na TV da sala quando chegar em casa.
              </p>
            </div>

            <div className="rounded-2xl bg-carbon-850 border border-carbon-700 p-6">
              <div className="h-12 w-12 rounded-xl bg-white/5 border border-carbon-700 flex items-center justify-center text-white mb-4">
                <Sliders className="h-6 w-6 text-neutral-300" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Perfis com PIN de Segurança</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Crie perfis individuais para cada pessoa da casa com avatares customizados, histórico separado e controle parental.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-carbon-950 border-t border-carbon-800 text-xs text-neutral-500">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-carbon-850 border border-carbon-700 p-1">
              <Image src={logoImage} alt="Vortex Cine" className="h-full w-full object-contain" />
            </div>
            <span className="font-bold text-neutral-300">Vortex Cine</span>
            <span>•</span>
            <span>Ecossistema Oficial de Streaming</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/tvlogin" className="hover:text-white transition">Parear TV</Link>
            <Link href="/downloads" className="hover:text-white transition">Downloads</Link>
            <Link href="/entrar" className="hover:text-white transition">Fazer Login</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
