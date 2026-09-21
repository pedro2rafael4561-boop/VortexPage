"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import logoImage from "@/assets/images/vortex-logo.png"
import { Tv, Download, LayoutDashboard, LogIn, LogOut, Menu, X, User } from "lucide-react"

export const Navbar: React.FC = () => {
  const { user, xtreamUsername, activeProfile, signOut } = useAuth()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: "Início", href: "/" },
    { name: "Parear TV", href: "/tvlogin", icon: Tv },
    { name: "Downloads", href: "/downloads", icon: Download },
  ]

  const isCurrent = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-violet-900/20 bg-[#0C0614]/85 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90 active:scale-95">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#161616] border border-violet-500/30 p-1.5 shadow-md shadow-violet-950/40">
            <Image src={logoImage} alt="Vortex Cine" className="h-full w-full object-contain" priority />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#F5F7F8]">
            Vortex <span className="text-[#A78BFA]">Cine</span>
          </span>
        </Link>

        {/* Links Desktop */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isCurrent(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-violet-600/15 text-white border border-violet-500/30"
                    : "text-[#969CA3] hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {Icon && <Icon className="h-4 w-4 text-[#A78BFA]" />}
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* CTA / Conta Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2.5">
              <Link
                href="/app"
                className="flex items-center gap-2 rounded-xl bg-[#161616] border border-violet-500/30 px-3.5 py-1.5 text-sm font-medium text-white transition hover:border-violet-500/60"
              >
                <div
                  className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow"
                  style={{ backgroundColor: activeProfile?.avatar_color_hex || "#7C3AED" }}
                >
                  {activeProfile?.name?.charAt(0).toUpperCase() || xtreamUsername?.charAt(0).toUpperCase() || <User className="h-3 w-3" />}
                </div>
                <span>{activeProfile?.name || xtreamUsername || "Minha Conta"}</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="rounded-xl p-2 text-[#969CA3] hover:bg-white/[0.05] hover:text-white transition"
                title="Sair"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/entrar"
              className="flex items-center gap-2 rounded-xl bg-[#F5F5F5] hover:bg-white px-4 py-2 text-sm font-semibold text-[#111111] shadow-lg shadow-black/40 transition active:scale-95"
            >
              <LogIn className="h-4 w-4" />
              <span>Entrar</span>
            </Link>
          )}
        </div>

        {/* Botão Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-xl p-2 text-[#969CA3] hover:bg-white/[0.05] hover:text-white md:hidden"
          aria-label="Abrir Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="border-b border-violet-900/20 bg-[#0C0614] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-[#969CA3] hover:bg-white/[0.04] hover:text-white"
                >
                  {Icon && <Icon className="h-4 w-4 text-[#A78BFA]" />}
                  {link.name}
                </Link>
              )
            })}
            <div className="my-2 h-px bg-white/[0.08]" />
            {user ? (
              <>
                <Link
                  href="/app"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white hover:bg-white/[0.04]"
                >
                  <LayoutDashboard className="h-4 w-4 text-[#A78BFA]" />
                  <span>Painel da Conta</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    signOut()
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-[#FF6B6B] hover:bg-red-500/10"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Desconectar</span>
                </button>
              </>
            ) : (
              <Link
                href="/entrar"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#F5F5F5] py-3 text-sm font-bold text-[#111111]"
              >
                <LogIn className="h-4 w-4" />
                <span>Entrar</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
