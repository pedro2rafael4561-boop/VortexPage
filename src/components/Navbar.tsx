"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import logoImage from "@/assets/images/vortex-logo.png"
import MenuIcon from "@/assets/icons/menu.svg"
import XIcon from "@/assets/icons/x.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: "Recursos", href: "#recursos" },
    { name: "Download", href: "#download" },
    { name: "Atualizações", href: "#atualizacoes" },
    { name: "Dúvidas", href: "#duvidas" },
    { name: "Sobre", href: "#sobre" },
  ]

  return (
    <header className="sticky top-3 z-50 px-3 sm:px-4">
      <div className="mx-auto max-w-4xl rounded-2xl md:rounded-full border border-white/15 bg-carbon-900/85 px-3.5 py-2 sm:px-5 sm:py-2.5 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all duration-300">
        <div className="flex items-center justify-between gap-3">
          
          {/* Logo & Marca */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="size-8 sm:size-9 overflow-hidden rounded-full bg-carbon-950 border border-purple-500/40 p-1 flex items-center justify-center transition group-hover:border-purple-400">
              <Image
                src={logoImage}
                className="size-full object-contain"
                alt="Logo Oficial do Vortex Cine"
                priority
              />
            </div>
            <span className="text-sm sm:text-base font-extrabold text-white tracking-tight">
              Vortex <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">Cine</span>
            </span>
          </Link>

          {/* Links Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="rounded-full bg-white px-3.5 py-1 text-xs font-bold text-black shadow-md transition hover:bg-white/90"
            >
              Início
            </Link>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-white/70 transition hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Ações da Direita */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Botão Baixar APK */}
            <a
              href="#download"
              className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3.5 py-1.5 sm:px-4 sm:py-1.5 text-xs font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] transition hover:bg-purple-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]"
            >
              <FontAwesomeIcon icon={faDownload} className="size-3 hidden xs:inline" />
              <span>Baixar APK</span>
            </a>

            {/* Botão Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              className="inline-flex size-8 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white md:hidden hover:bg-white/10 transition"
            >
              {mobileMenuOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile Expansível */}
        {mobileMenuOpen && (
          <div className="mt-3 border-t border-white/10 pt-3 md:hidden flex flex-col gap-1 pb-1 animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold text-white/90 hover:bg-white/10 hover:text-purple-300 transition"
              >
                <span>{link.name}</span>
                <span className="text-white/30">&rarr;</span>
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#download"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-purple-500 transition w-full"
              >
                <FontAwesomeIcon icon={faDownload} className="size-3" />
                <span>Baixar Vortex Cine para Celular</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
