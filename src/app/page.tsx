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
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-carbon-950 text-white flex flex-col selection:bg-brand selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-carbon-700/40">
        {/* Glow sutil cinematográfico neutro */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[600px] bg-white/[0.03] blur-[140px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-carbon-850 border border-carbon-700 px-3.5 py-1.5 text-xs font-semibold text-carbon-secondary mb-8 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            <span>Ecossistema Oficial Vortex Cine</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6">
            A Experiência Definitiva de <span className="text-brand">Cinema e TV</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Acesse seus filmes, séries e canais ao vivo com transmissão pura, reprodução instantânea e sincronização em tempo real entre sua Smart TV e celular.
          </p>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tv-login"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand/20 transition hover:bg-brand-hover active:scale-95"
            >
              <Tv className="h-4 w-4" />
              <span>Conectar TV com Código</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/downloads"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-carbon-850 border border-carbon-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-carbon-800 hover:border-carbon-600 active:scale-95"
            >
              <Download className="h-4 w-4 text-neutral-400" />
              <span>Baixar Aplicativos (APKs)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Destaques Técnicos / Diferenciais */}
      <section className="py-20 bg-carbon-900/60 border-b border-carbon-700/40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Construído para Desempenho e Estabilidade
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              Arquitetura pura pensada para carregamento veloz sem falhas de transcodificação ou dependência de lojas de extensões.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="rounded-2xl bg-carbon-850 border border-carbon-700 p-6 flex flex-col transition hover:border-carbon-600">
              <div className="h-12 w-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-5">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Motor Nativo Xtream</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Reprodução direta de canais ao vivo via MPEG-TS (.ts) e VOD nativo (.mp4). Fim do buffering infinito e atrasos de empacotamento.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-carbon-850 border border-carbon-700 p-6 flex flex-col transition hover:border-carbon-600">
              <div className="h-12 w-12 rounded-xl bg-white/5 border border-carbon-700 flex items-center justify-center text-white mb-5">
                <Film className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Metadados Integrados</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Sinopses, capas em alta definição, episódios categorizados e trailers incorporados nativamente no aplicativo.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-carbon-850 border border-carbon-700 p-6 flex flex-col transition hover:border-carbon-600">
              <div className="h-12 w-12 rounded-xl bg-white/5 border border-carbon-700 flex items-center justify-center text-white mb-5">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Sincronização em Nuvem</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Comece a assistir na TV da sala e continue exatamente do mesmo segundo no seu smartphone através do ecossistema Vortex Sync.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Pareamento de TV */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="rounded-3xl bg-carbon-850 border border-carbon-700 p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 rounded-lg bg-brand/10 border border-brand/20 px-3 py-1 text-xs font-semibold text-brand mb-4">
                <Tv className="h-3.5 w-3.5" />
                <span>Pairing Instantâneo</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Conecte sua Smart TV em poucos segundos
              </h2>
              <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                Abra o Vortex Cine TV no seu aparelho, aponte a câmera para o QR Code ou digite o código de 6 caracteres na nossa página de vinculação rápida.
              </p>
              <ul className="space-y-2.5 text-sm text-neutral-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Sem necessidade de digitar senhas complexas no controle</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Sessão segura vinculada ao seu perfil</span>
                </li>
              </ul>
              <Link
                href="/tv-login"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-hover"
              >
                <span>Vincular Minha TV Agora</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="w-full md:w-auto flex justify-center">
              <div className="h-44 w-44 rounded-2xl bg-carbon-900 border border-carbon-700 p-4 flex flex-col items-center justify-center text-center shadow-2xl">
                <Tv className="h-12 w-12 text-brand mb-2" />
                <span className="text-xs text-neutral-400 font-mono">tv-login?code=...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-carbon-700/40 bg-carbon-950 py-10">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-neutral-500">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-carbon-850 border border-carbon-700 p-1">
              <Image src={logoImage} alt="Vortex Cine" className="h-full w-full object-contain" />
            </div>
            <span className="font-semibold text-white">Vortex Cine</span>
            <span>• © {new Date().getFullYear()} Todos os direitos reservados.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/downloads" className="hover:text-white transition">
              Downloads
            </Link>
            <Link href="/tv-login" className="hover:text-white transition">
              Conectar TV
            </Link>
            <Link href="/entrar" className="hover:text-white transition">
              Entrar na Conta
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
