export const Banner = () => {
  return (
    <div className="relative border-b border-purple-500/20 bg-gradient-to-r from-carbon-950 via-purple-950/40 to-carbon-950 py-2 sm:py-2.5 text-center text-xs sm:text-sm font-medium text-white/90">
      <div className="container px-3">
        <p className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 leading-snug">
          <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-2 py-0.5 text-[11px] sm:text-xs font-semibold text-cyan-300 border border-cyan-500/30">
            App Unificado Disponível
          </span>
          <span className="text-white/80">Nova versão oficial com suporte unificado Mobile, Tablet e Smart TV.</span>
          <a
            href="#download"
            className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200 transition"
          >
            Baixar &rarr;
          </a>
        </p>
      </div>
    </div>
  )
}
