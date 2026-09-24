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
  Play,
  MonitorPlay,
  RefreshCw,
  Server,
  Layers,
} from "lucide-react"

export const metadata = {
  title: "Vortex Cine | Site Oficial - O Cinema Definitivo na Sua Tela",
  description: "Acesse filmes, séries e canais ao vivo no celular e na Smart TV com o ecossistema oficial Vortex Cine.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0C0614] text-[#F5F7F8] flex flex-col selection:bg-violet-600 selection:text-white">
      <Navbar />

      {/* Hero Section com o Glow Oficial do App */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-32 border-b border-violet-900/20 vortex-gradient-bg">
        {/* Atmospheric Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[800px] bg-violet-600/[0.12] blur-[160px] pointer-events-none rounded-full" />
        <div className="absolute top-2/3 right-1/4 h-[350px] w-[400px] bg-purple-700/[0.08] blur-[140px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
          {/* Badge Oficial */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#161616] border border-violet-500/30 px-4 py-1.5 text-xs font-semibold text-[#A78BFA] mb-8 shadow-lg shadow-violet-950/40">
            <Sparkles className="h-3.5 w-3.5 text-[#A78BFA]" />
            <span>Ecossistema Oficial Vortex Cine</span>
            <span className="h-1 w-1 rounded-full bg-violet-400" />
            <span className="text-white font-bold">App Unificado • Mobile & TV</span>
          </div>

          {/* Título Principal (Idêntico ao do App AuthScreen.kt) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6 text-[#F5F7F8]">
            Seu catálogo completo, <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-violet-200 bg-clip-text text-transparent">
              do seu jeito.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#969CA3] max-w-2xl mx-auto leading-relaxed mb-8">
            Conecte sua conta para acessar filmes, séries completas e canais ao vivo no celular e na Smart TV com máxima estabilidade e servidor nativo fixo.
          </p>

          {/* Tag de Servidor Fixo */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-violet-500/20 text-xs text-[#969CA3] mb-10">
            <Server className="w-3.5 h-3.5 text-violet-400" />
            <span>Servidor DNS Nativo: <strong className="text-white font-semibold">kixar.xyz</strong> (Fixo no app e no site)</span>
          </div>

          {/* Grupo de Botões de Ação Principal */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-xl mx-auto">
            {/* Botão 1: Fazer Login na Conta */}
            <Link
              href="/entrar"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 rounded-2xl bg-[#F5F5F5] hover:bg-white px-6 py-4 text-sm font-bold text-[#111111] shadow-xl shadow-black/50 transition-all active:scale-95 cursor-pointer"
            >
              <LogIn className="h-4 w-4 text-[#111111]" />
              <span>Fazer Login</span>
              <ArrowRight className="h-4 w-4 opacity-70" />
            </Link>

            {/* Botão 2: Parear Smart TV */}
            <Link
              href="/tvlogin"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 rounded-2xl bg-[#161616] border border-violet-500/40 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-violet-950/20 active:scale-95 cursor-pointer shadow-lg shadow-violet-950/30"
            >
              <Tv className="h-4 w-4 text-[#A78BFA]" />
              <span>Conectar Smart TV</span>
            </Link>

            {/* Botão 3: Downloads */}
            <Link
              href="/downloads"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-white/[0.04] border border-white/[0.08] px-5 py-4 text-sm font-medium text-[#969CA3] transition hover:text-white hover:border-violet-500/30 active:scale-95 cursor-pointer"
            >
              <Download className="h-4 w-4 text-[#A78BFA]" />
              <span>Baixar APK Universal</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Seção Baixar Aplicativos Oficiais */}
      <section className="py-20 bg-[#0C0614] border-b border-violet-900/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-[#F5F7F8]">
              Um Único Aplicativo para Todas as Telas
            </h2>
            <p className="text-sm sm:text-base text-[#969CA3]">
              Instale a versão unificada do Vortex Cine: detecção automática de tela no Celular, Tablet ou Smart TV / TV Box.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Card Unificado */}
            <div className="rounded-3xl bg-[#161616] border border-violet-500/30 p-8 sm:p-10 flex flex-col justify-between transition hover:border-violet-500/60 shadow-2xl shadow-violet-950/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-violet-600/10 blur-[90px] pointer-events-none rounded-full" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-[#A78BFA]">
                      <Smartphone className="h-6 w-6" />
                    </div>
                    <span className="text-slate-500 font-bold">+</span>
                    <div className="h-12 w-12 rounded-2xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-[#A78BFA]">
                      <Tv className="h-6 w-6" />
                    </div>
                  </div>
                  <span className="rounded-full bg-violet-600/20 border border-violet-500/40 px-3.5 py-1 text-xs font-semibold text-violet-300 font-mono">
                    APK Universal
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Vortex Cine Universal (Mobile & TV)</h3>
                <p className="text-sm sm:text-base text-[#969CA3] leading-relaxed mb-6">
                  Compatível com celulares, tablets e Smart TVs / TV Box. Interface adaptativa: controle por toque fluido no mobile e navegação 100% pensada para controle remoto no televisor, com sincronização em alta velocidade e troca instantânea de perfis.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#969CA3]">
                    <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0" />
                    <span>Android 7.0+ (Celulares, Tablets e TV Boxes)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#969CA3]">
                    <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0" />
                    <span>Nova sincronização instantânea de catálogo</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#969CA3]">
                    <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0" />
                    <span>Troca de perfil rápida e sem travamento</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#969CA3]">
                    <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0" />
                    <span>Carregamento confiável de episódios de séries</span>
                  </div>
                </div>
              </div>
              <a
                href="https://github.com/pedro2rafael4561-boop/VortexCine/releases/latest/download/Vortex-Cine.apk"
                className="flex items-center justify-center gap-2.5 rounded-2xl bg-violet-600 hover:bg-violet-500 py-4 px-6 text-base font-bold text-white transition active:scale-95 shadow-lg shadow-violet-600/25"
              >
                <Download className="h-5 w-5" />
                <span>Baixar APK Universal (Vortex-Cine.apk)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona o Pareamento com a TV */}
      <section className="py-20 bg-[#0C0614] border-b border-violet-900/20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-white">
              Como Parear Sua Smart TV em Segundos
            </h2>
            <p className="text-sm sm:text-base text-[#969CA3]">
              Sem complicação para digitar senhas longas no controle remoto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-[#161616] border border-violet-500/25 p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-violet-600/20 text-[#A78BFA] font-bold flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h4 className="font-bold text-white mb-2">Abra o App na TV</h4>
              <p className="text-xs text-[#969CA3] leading-relaxed">
                Inicie o Vortex Cine na sua Android TV e escolha Entrar com QR Code ou Código.
              </p>
            </div>

            <div className="rounded-2xl bg-[#161616] border border-violet-500/25 p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-violet-600/20 text-[#A78BFA] font-bold flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h4 className="font-bold text-white mb-2">Acesse /link ou /tvlogin</h4>
              <p className="text-xs text-[#969CA3] leading-relaxed">
                Pelo celular ou computador, abra a página de pareamento e digite o código de 6 dígitos.
              </p>
            </div>

            <div className="rounded-2xl bg-[#161616] border border-violet-500/25 p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-violet-600/20 text-[#A78BFA] font-bold flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h4 className="font-bold text-white mb-2">Pronto!</h4>
              <p className="text-xs text-[#969CA3] leading-relaxed">
                Sua TV sincroniza automaticamente com seu usuário e você já pode assistir.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/tvlogin"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#161616] border border-violet-500/40 text-sm font-semibold text-white hover:bg-violet-950/20 transition shadow-lg shadow-violet-950/30"
            >
              <Tv className="w-4 h-4 text-[#A78BFA]" />
              <span>Ir para a Página de Pareamento</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0C0614] text-center text-xs text-[#6E7178]">
        <div className="container mx-auto px-4">
          <p>© 2026 Vortex Cine. Todos os direitos reservados. Ecossistema Oficial Mobile & TV.</p>
        </div>
      </footer>
    </div>
  )
}
