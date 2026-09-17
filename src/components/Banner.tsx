export const Banner = () => {
  return (
    <div className="relative border-b border-purple-500/20 bg-gradient-to-r from-carbon-950 via-purple-950/40 to-carbon-950 py-2.5 text-center text-xs sm:text-sm font-medium text-white/90">
      <div className="container">
        <p className="flex items-center justify-center gap-2">
          <span className="inline-flex items-center rounded-full bg-purple-500/20 px-2 py-0.5 text-xs font-semibold text-purple-300 border border-purple-500/30">
            v1.1.6 Disponível
          </span>
          <span>Nova versão oficial com conexão blindada e modo offline protegido.</span>
          <a
            href="#download"
            className="hidden sm:inline font-semibold text-purple-300 underline underline-offset-4 hover:text-purple-200 transition"
          >
            Baixar agora &rarr;
          </a>
        </p>
      </div>
    </div>
  )
}
