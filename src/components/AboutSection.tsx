"use client"

export const AboutSection = () => {
  return (
    <section id="sobre" className="relative bg-carbon-950 py-20 text-white sm:py-28 border-t border-white/10">
      {/* Efeito luminoso roxo sutil */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[700px] rounded-full bg-purple-900/10 blur-[140px]" />

      <div className="container relative z-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Card Sobre */}
          <div className="rounded-3xl border border-white/10 bg-carbon-900/70 p-8 backdrop-blur-xl">
            <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300 uppercase tracking-wider">
              Sobre o Projeto
            </span>
            <h3 className="mt-4 text-2xl font-extrabold text-white">
              Vortex Cine
            </h3>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              O <strong>Vortex Cine</strong> nasceu com a proposta de elevar o padrão visual e a usabilidade de reprodutores de mídia. Com foco em fluidez, organização de catálogos e uma estética cinematográfica imersiva em preto carbono e roxo, proporcionamos uma experiência de entretenimento de alta qualidade.
            </p>
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2 text-xs text-white/60">
              <p>
                <strong className="text-white">Desenvolvedor:</strong> @PRAFAEL0007
              </p>
              <p>
                <strong className="text-white">Organização:</strong> Vortex Company LTDA
              </p>
              <p>
                <strong className="text-white">Status:</strong> Oficial & Ativo
              </p>
            </div>
          </div>

          {/* Card Termos & Privacidade */}
          <div className="rounded-3xl border border-white/10 bg-carbon-900/70 p-8 backdrop-blur-xl">
            <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300 uppercase tracking-wider">
              Termos & Privacidade
            </span>
            <h3 className="mt-4 text-2xl font-extrabold text-white">
              Transparência e Respeito
            </h3>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              O <strong>Vortex Cine</strong> é estritamente um reprodutor de mídia e gerenciador de interface. O aplicativo <strong>não hospeda, não armazena e não transmite</strong> arquivos de mídia ou canais próprios em seus servidores.
            </p>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              As informações de reprodução, listas e perfis adicionados pertencem unicamente ao usuário e são mantidas localmente em seu próprio dispositivo com total privacidade e segurança.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
