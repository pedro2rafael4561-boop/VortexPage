"use client"
import Image from "next/image"
import Link from "next/link"
import logoImage from "@/assets/images/vortex-logo.png"

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-carbon-950 py-12 text-white/70">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo & Descrição Curta */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="size-9 overflow-hidden rounded-xl bg-carbon-900 border border-purple-500/30 p-1">
                <Image
                  src={logoImage}
                  alt="Vortex Cine"
                  className="size-full object-contain"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Vortex <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">Cine</span>
              </span>
            </Link>
            <p className="text-xs text-white/50 max-w-sm">
              O reprodutor cinematográfico definitivo para Android. Desenvolvido para entregar o máximo em fluidez e entretenimento.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#recursos" className="hover:text-purple-300 transition">
              Recursos
            </a>
            <a href="#como-e-o-app" className="hover:text-purple-300 transition">
              O App
            </a>
            <a href="#download" className="hover:text-purple-300 transition">
              Download
            </a>
            <a href="#atualizacoes" className="hover:text-purple-300 transition">
              Atualizações
            </a>
            <a href="#duvidas" className="hover:text-purple-300 transition">
              Dúvidas
            </a>
            <a href="#sobre" className="hover:text-purple-300 transition">
              Sobre & Termos
            </a>
          </div>

        </div>

        {/* Linha Divisória e Créditos */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-white">Vortex Company LTDA</strong>. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-2">
            <span>Desenvolvido por</span>
            <span className="rounded-md bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 font-mono font-bold text-purple-300">
              @PRAFAEL0007
            </span>
          </div>
        </div>

        {/* Aviso de Isenção Legal */}
        <div className="mt-4 text-center text-[11px] text-white/30 max-w-3xl mx-auto">
          Aviso: O Vortex Cine não armazena, hospeda ou distribui conteúdo audiovisual próprio. É uma ferramenta de reprodução multimídia e personalização de interface de uso pessoal.
        </div>
      </div>
    </footer>
  )
}
