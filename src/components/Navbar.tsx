"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import logoImage from "@/assets/images/vortex-logo.png"
import { Tv, Download, LayoutDashboard, LogIn, LogOut, Menu, X, User } from "lucide-react"

export const Navbar: React.FC = () => {
  const { user, activeProfile, signOut } = useAuth()
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
    <header className="sticky top-0 z-50 w-full border-b border-carbon-700/60 bg-carbon-950/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-carbon-850 border border-carbon-700 p-1.5 shadow-sm">
            <Image src={logoImage} alt="Vortex Cine" className="h-full w-full object-contain" priority />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Vortex <span className="text-brand">Cine</span>
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
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-carbon-800 text-white border border-carbon-700"
                    : "text-carbon-secondary hover:bg-carbon-850 hover:text-white"
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* CTA / Conta Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/app"
                className="flex items-center gap-2 rounded-xl bg-carbon-850 border border-carbon-700 px-3 py-1.5 text-sm font-medium text-white transition hover:border-carbon-600"
              >
                <div
                  className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow"
                  style={{ backgroundColor: activeProfile?.avatar_color_hex || "#E50914" }}
                >
                  {activeProfile?.name?.charAt(0).toUpperCase() || <User className="h-3 w-3" />}
                </div>
                <span>{activeProfile?.name || "Minha Conta"}</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="rounded-lg p-2 text-carbon-secondary hover:bg-carbon-850 hover:text-white transition"
                title="Sair"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/entrar"
              className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-hover active:scale-95"
            >
              <LogIn className="h-4 w-4" />
              <span>Entrar na Conta</span>
            </Link>
          )}
        </div>

        {/* Botão Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-carbon-secondary hover:bg-carbon-850 hover:text-white md:hidden"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Drawer Mobile */}
      {mobileMenuOpen && (
        <div className="border-b border-carbon-700 bg-carbon-900 px-4 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm font-medium text-white hover:bg-carbon-800"
                >
                  {Icon && <Icon className="h-4 w-4 text-brand" />}
                  {link.name}
                </Link>
              )
            })}
            <div className="my-2 border-t border-carbon-800" />
            {user ? (
              <>
                <Link
                  href="/app"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm font-medium text-white hover:bg-carbon-800"
                >
                  <LayoutDashboard className="h-4 w-4 text-brand" />
                  <span>Painel da Conta ({activeProfile?.name || "Perfil"})</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    signOut()
                  }}
                  className="flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-left text-sm font-medium text-red-400 hover:bg-carbon-800"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair da Conta</span>
                </button>
              </>
            ) : (
              <Link
                href="/entrar"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white shadow"
              >
                <LogIn className="h-4 w-4" />
                <span>Entrar na Conta</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
