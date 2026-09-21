"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth, Profile } from "@/contexts/AuthContext"
import Link from "next/link"
import Image from "next/image"
import logoImage from "@/assets/images/vortex-logo.png"
import {
  Film,
  Home,
  Users,
  PlaySquare,
  Bookmark,
  History,
  Tv,
  UserCheck,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Plus,
  Loader2,
} from "lucide-react"

const NAV_ITEMS = [
  { name: "Visão Geral", href: "/app", icon: Home },
  { name: "Perfis", href: "/app/perfis", icon: Users },
  { name: "Continuar Assistindo", href: "/app/continuar", icon: PlaySquare },
  { name: "Favoritos", href: "/app/favoritos", icon: Bookmark },
  { name: "Histórico", href: "/app/historico", icon: History },
  { name: "Dispositivos & TVs", href: "/app/dispositivos", icon: Tv },
  { name: "Minha Conta", href: "/app/conta", icon: UserCheck },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, xtreamUsername, profiles, activeProfile, setActiveProfile, signOut, loading } = useAuth()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/entrar")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C0614] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-violet-500 animate-spin mb-4" />
        <p className="text-[#969CA3] text-sm">Carregando painel Vortex Cine...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0C0614] text-[#F5F7F8] flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-violet-900/20 sticky top-0 z-40">
        <Link href="/app" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#1F1630] border border-violet-500/30 p-1 flex items-center justify-center">
            <Image src={logoImage} alt="Vortex" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-base tracking-tight text-white">
            VORTEX <span className="text-[#A78BFA] font-light">CINE</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-[#969CA3] hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar for Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#161616] border-r border-violet-900/20 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
            <Link href="/app" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 p-1.5 flex items-center justify-center shadow-md shadow-violet-950/40">
                <Image src={logoImage} alt="Vortex" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-bold text-base tracking-tight text-white">
                  VORTEX <span className="text-[#A78BFA] font-light">CINE</span>
                </span>
                <span className="block text-[10px] tracking-widest text-[#969CA3] uppercase">
                  Account Dashboard
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden text-[#969CA3] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Profile Bar */}
          <div className="p-4 border-b border-white/[0.06]">
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-violet-500/40 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-sm"
                    style={{ backgroundColor: activeProfile?.avatar_color_hex || "#7C3AED" }}
                  >
                    {activeProfile?.name ? activeProfile.name[0].toUpperCase() : "V"}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-semibold text-white truncate">
                      {activeProfile?.name || "Perfil Ativo"}
                    </div>
                    <div className="text-[10px] text-[#969CA3] truncate">
                      {xtreamUsername || user.email}
                    </div>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-[#969CA3] shrink-0" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-1.5 p-1.5 bg-[#161616] border border-violet-500/30 rounded-xl shadow-2xl z-30 space-y-1">
                  <div className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-[#969CA3]">
                    Alternar Perfil
                  </div>
                  {profiles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActiveProfile(p)
                        setProfileDropdownOpen(false)
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                        activeProfile?.id === p.id
                          ? "bg-violet-600 text-white font-medium"
                          : "text-[#969CA3] hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                        style={{ backgroundColor: p.avatar_color_hex || "#7C3AED" }}
                      >
                        {p.name[0]?.toUpperCase()}
                      </div>
                      <span className="truncate">{p.name}</span>
                    </button>
                  ))}
                  <div className="pt-1 border-t border-white/[0.08]">
                    <Link
                      href="/app/perfis"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] text-[#969CA3] hover:text-white hover:bg-white/[0.04] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#A78BFA]" />
                      Gerenciar / Criar Perfis
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/25"
                      : "text-[#969CA3] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/[0.06] space-y-2">
          <Link
            href="/tvlogin"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium transition-colors border border-violet-500/20"
          >
            <Tv className="w-3.5 h-3.5 text-[#A78BFA]" />
            Conectar Nova TV
          </Link>
          <button
            onClick={() => {
              signOut()
              router.push("/entrar")
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-[#FF6B6B] hover:bg-red-500/10 text-xs font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top bar for desktop */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-[#161616]/70 border-b border-violet-900/20 backdrop-blur-sm sticky top-0 z-30">
          <div className="text-sm font-semibold text-white">
            {NAV_ITEMS.find((item) => item.href === pathname)?.name || "Dashboard"}
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/tvlogin"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-violet-600/15 border border-violet-500/30 text-violet-300 hover:bg-violet-600/25 text-xs font-medium transition-colors"
            >
              <Tv className="w-3.5 h-3.5" />
              Parear TV
            </Link>
            <div className="text-xs text-[#969CA3]">
              Perfil: <strong className="text-white">{activeProfile?.name || "Principal"}</strong>
            </div>
          </div>
        </header>

        {/* Page Inner Container */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
