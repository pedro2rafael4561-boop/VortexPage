import { Smartphone, Tv, Download, Shield, Cpu, HelpCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/Navbar"

export const metadata = {
  title: "Downloads Oficiais | Vortex Cine",
  description: "Baixe os APKs oficiais do Vortex Cine para celular Android e Smart TV.",
}

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-[#0C0614] text-[#F5F7F8] flex flex-col vortex-gradient-bg">
      <Navbar />

      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Aplicativos Oficiais Vortex Cine
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
            Baixe o Vortex Cine
          </h1>
          <p className="text-base sm:text-lg text-[#969CA3] leading-relaxed">
            Tenha acesso ao seu catálogo Xtream com reprodução nativa ultrarrápida no seu celular, tablet e Android TV.
          </p>
        </div>

        {/* Download Cards Grid */}
        <div className="max-w-3xl mx-auto mb-20">
          {/* Unified App Card */}
          <div className="bg-[#161616] border border-violet-500/30 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden transition hover:border-violet-500/60 shadow-2xl shadow-violet-950/30">
            <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 blur-[90px] pointer-events-none rounded-full" />
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-violet-600/20 border border-violet-500/40 rounded-2xl flex items-center justify-center text-[#A78BFA]">
                  <Smartphone className="w-7 h-7" />
                </div>
                <div className="text-xl font-bold text-slate-500">+</div>
                <div className="w-14 h-14 bg-violet-600/20 border border-violet-500/40 rounded-2xl flex items-center justify-center text-[#A78BFA]">
                  <Tv className="w-7 h-7" />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Vortex Cine (App Unificado)</h2>
                <span className="text-xs font-mono bg-violet-600/20 text-violet-300 px-3 py-1 rounded-full border border-violet-500/30">
                  APK Universal
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#969CA3] mb-8 leading-relaxed">
                Um único aplicativo para todos os seus dispositivos. O Vortex Cine detecta automaticamente se você está no celular, tablet ou na Smart TV / TV Box, carregando a interface ideal: controle por toque no mobile ou navegação 100% adaptada ao controle remoto na TV.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8 text-xs sm:text-sm text-[#969CA3]">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Android 7.0+ (Celular, Tablet, Android TV, TV Box)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Nova tela de sincronização ultra-rápida de catálogo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Troca de perfis instantânea corrigida</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Motor Xtream com carregamento seguro de episódios</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/pedro2rafael4561-boop/VortexCine/releases/latest/download/Vortex-Cine.apk"
                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-bold py-4 px-6 rounded-2xl text-base flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-violet-600/25 active:scale-95"
              >
                <Download className="w-5 h-5" />
                <span>Baixar APK Universal (Vortex-Cine.apk)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
