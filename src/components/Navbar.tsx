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
    { name: "Como é o App", href: "#como-e-o-app" },
    { name: "Download", href: "#download" },
    { name: "Atualizações", href: "#atualizacoes" },
    { name: "Dúvidas", href: "#duvidas" },
    { name: "Sobre", href: "#sobre" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-carbon-950/80 backdrop-blur-xl">
      <div className="container">
        <div className="flex items-center justify-between py-3.5">
          {/* Logo & Marca */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative size-10 overflow-hidden rounded-xl bg-carbon-900 border border-purple-500/30 p-1 transition duration-300 group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <Image
                src={logoImage}
                className="size-full object-contain"
                alt="Logo Oficial do Vortex Cine"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                Vortex <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">Cine</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/50 -mt-1 font-semibold">
                Oficial
              </span>
            </div>
          </Link>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white sm:hidden hover:bg-white/10 transition"
          >
            {mobileMenuOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>

          {/* Menu Desktop */}
          <nav className="hidden items-center gap-7 sm:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/70 transition hover:text-purple-300"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#download"
              className="inline-flex items-center justify-center rounded-xl border border-purple-500/40 bg-purple-600/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:bg-purple-600 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]"
            >
              Baixar APK
            </a>
          </nav>
        </div>

        {/* Drawer Mobile */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 py-4 sm:hidden flex flex-col gap-3 animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-medium text-white/80 hover:bg-white/5 hover:text-purple-300 transition"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#download"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center rounded-xl bg-purple-600 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              Baixar Versão Recente
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
