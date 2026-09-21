import { Smartphone, Tv, Download, Shield, Cpu, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
            Aplicativos Oficiais
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Baixe o Vortex Cine
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Tenha acesso ao seu catálogo Xtream com reprodução nativa ultrarrápida no seu celular, tablet e Android TV.
          </p>
        </div>

        {/* Download Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Mobile Card */}
          <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-accent/50 transition-all">
            <div className="absolute top-0 right-0 w-36 h-36 bg-accent/5 rounded-full blur-3xl -z-0" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center mb-6 text-accent">
                <Smartphone className="w-8 h-8" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">Vortex Cine Mobile</h2>
                <span className="text-xs font-mono bg-border/60 px-2.5 py-1 rounded-md text-text-secondary">
                  v1.0.0
                </span>
              </div>
              <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                Desenvolvido para smartphones e tablets Android. Interface moderna, player adaptativo e controle total de episódios e listas.
              </p>

              <div className="space-y-2.5 mb-8 text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-accent shrink-0" />
                  <span>Android 7.0 (Nougat) ou superior</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent shrink-0" />
                  <span>Arquiteturas arm64-v8a e armeabi-v7a</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-border/60">
              <a
                href="https://github.com/pedro2rafael4561-boop/VortexCine/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-accent hover:bg-accent-hover text-white py-3.5 px-6 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-accent/20"
              >
                <Download className="w-4 h-4" />
                Baixar APK Mobile Oficial
              </a>
            </div>
          </div>

          {/* Android TV Card */}
          <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-accent/50 transition-all">
            <div className="absolute top-0 right-0 w-36 h-36 bg-accent/5 rounded-full blur-3xl -z-0" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center mb-6 text-accent">
                <Tv className="w-8 h-8" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">Vortex Cine TV</h2>
                <span className="text-xs font-mono bg-border/60 px-2.5 py-1 rounded-md text-text-secondary">
                  v1.0.3
                </span>
              </div>
              <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                Otimizado para Android TV, Google TV e TV Boxes com navegação 100% adaptada ao controle remoto e login instantâneo por QR Code.
              </p>

              <div className="space-y-2.5 mb-8 text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-accent shrink-0" />
                  <span>Android TV 5.0 (Lollipop) ou superior</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent shrink-0" />
                  <span>Otimizado para Mi Box, Fire TV, Chromecast com Google TV</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-border/60 flex flex-col gap-3">
              <a
                href="https://github.com/pedro2rafael4561-boop/VortexCineTV/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-accent hover:bg-accent-hover text-white py-3.5 px-6 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-accent/20"
              >
                <Download className="w-4 h-4" />
                Baixar APK Android TV (Releases)
              </a>
              <Link
                href="/tv-login"
                className="w-full bg-surface-light hover:bg-border text-text-primary py-2.5 px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors border border-border"
              >
                Já instalou? Conecte sua TV aqui
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="bg-surface/60 border border-border rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-bold">Como instalar no Android TV</h3>
          </div>
          <ol className="space-y-4 text-sm text-text-secondary leading-relaxed list-decimal list-inside">
            <li>
              <strong className="text-text-primary">Instale o aplicativo Downloader</strong> na Google Play Store da sua TV.
            </li>
            <li>
              <strong className="text-text-primary">Habilite Fontes Desconhecidas:</strong> Vá em Configurações da TV &gt; Segurança e Restrições &gt; Fontes Desconhecidas e permita o Downloader.
            </li>
            <li>
              <strong className="text-text-primary">Digite o link de download:</strong> Abra o Downloader e baixe o APK direto dos releases oficiais do GitHub.
            </li>
            <li>
              <strong className="text-text-primary">Abra o Vortex Cine TV:</strong> Escaneie o QR Code com a câmera do seu celular para fazer login automático ou use a tela <Link href="/tv-login" className="text-accent hover:underline">/tv-login</Link>.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
