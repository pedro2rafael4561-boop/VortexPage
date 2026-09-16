"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import logoImage from "@/assets/images/vortex-logo.png"
import MenuIcon from "@/assets/icons/menu.svg"
import XIcon from "@/assets/icons/x.svg"

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
    <header className="sticky top-4 z-50 px-4">
      <div className="mx-auto max-w-fit rounded-full border border-white/15 bg-carbon-900/80 px-4 py-2 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-3 sm:gap-6">
          
          {/* Logo & Marca */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="size-8 overflow-hidden rounded-full bg-carbon-950 border border-purple-500/40 p-1 flex items-center justify-center transition group-hover:border-purple-400">
              <Image
                src={logoImage}
                className="size-full object-contain"
                alt="Logo Oficial do Vortex Cine"
                priority
              />
            </div>
            <span className="text-sm font-bold text-white tracking-tight hidden xs:inline">
              Vortex <span className="text-purple-400">Cine</span>
            </span>
          </Link>

          {/* Badge Início Ativo (Estilo Pill da Referência) */}
          <Link
            href="/"
            className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-black shadow-md transition hover:bg-white/90"
          >
            Início
          </Link>

          {/* Links Desktop */}
          <nav className="hidden md:flex items-center gap-5">
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

          {/* Botão Baixar APK */}
          <a
            href="#download"
            className="rounded-full bg-purple-600 px-4 py-1.5 text-xs font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] transition hover:bg-purple-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]"
          >
            Baixar APK
          </a>

          {/* Botão Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            className="inline-flex size-7 items-center justify-center text-white md:hidden"
          >
            {mobileMenuOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
          </button>
        </div>

        {/* Menu Mobile Expansível */}
        {mobileMenuOpen && (
          <div className="mt-3 border-t border-white/10 pt-3 md:hidden flex flex-col gap-2 animate-fadeIn pb-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/5 hover:text-purple-300 transition text-center"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
