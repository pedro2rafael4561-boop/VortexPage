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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Mobile Card */}
          <div className="bg-[#161616] border border-violet-500/30 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition hover:border-violet-500/60 shadow-xl shadow-violet-950/20">
            <div>
              <div className="w-14 h-14 bg-violet-600/20 border border-violet-500/40 rounded-2xl flex items-center justify-center mb-6 text-[#A78BFA]">
                <Smartphone className="w-8 h-8" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-white">Vortex Cine Mobile</h2>
                <span className="text-xs font-mono bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full border border-violet-500/30">
                  v1.2.15
                </span>
              </div>
              <p className="text-sm text-[#969CA3] mb-6 leading-relaxed">
                Desenvolvido para smartphones e tablets Android. Interface moderna, motor Xtream nativo e controle total de séries, episódios e listas.
              </p>

              <div className="space-y-2.5 mb-8 text-xs text-[#969CA3]">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Android 7.0 ou superior (APK Universal)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Séries com temporadas, episódios e ao vivo corrigidos</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <a
                href="https://github.com/pedro2rafael4561-boop/VortexCine/releases/download/v1.2.15/VortexCine-v1.2.15.apk"
                className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-600/25 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Baixar APK Mobile (v1.2.15)</span>
              </a>
            </div>
          </div>

          {/* Android TV Card */}
          <div className="bg-[#161616] border border-violet-500/30 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition hover:border-violet-500/60 shadow-xl shadow-violet-950/20">
            <div>
              <div className="w-14 h-14 bg-violet-600/20 border border-violet-500/40 rounded-2xl flex items-center justify-center mb-6 text-[#A78BFA]">
                <Tv className="w-8 h-8" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-white">Vortex Cine Smart TV</h2>
                <span className="text-xs font-mono bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full border border-violet-500/30">
                  v1.0.4
                </span>
              </div>
              <p className="text-sm text-[#969CA3] mb-6 leading-relaxed">
                Otimizado para Android TV, Google TV e TV Boxes com navegação 100% adaptada ao controle remoto e login instantâneo por código/QR Code.
              </p>

              <div className="space-y-2.5 mb-8 text-xs text-[#969CA3]">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Android TV 5.0 ou superior (arm64 e armeabi-v7a)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Pareamento com domínio oficial vortex-page.vercel.app/link</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row gap-3">
              <a
                href="https://github.com/pedro2rafael4561-boop/VortexCineTV/releases/download/v1.0.4/Vortex-Cine-TV.apk"
                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-600/25 active:scale-95 text-center"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>APK TV (Universal / 64-bit)</span>
              </a>
              <a
                href="https://github.com/pedro2rafael4561-boop/VortexCineTV/releases/download/v1.0.4/Vortex-Cine-TV-arm7a.apk"
                className="flex-1 bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1] py-3.5 px-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 text-center"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>APK TV (arm7a / TV Box)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
