"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import logoImage from "@/assets/images/vortex-logo.png"

export default function LinkTvPage() {
  const [code, setCode] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const c = params.get("code") || params.get("c")
      if (c) {
        setCode(c.toUpperCase().trim())
      }
    }
  }, [])

  const handleLink = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanCode = code.trim().toUpperCase()
    if (!cleanCode) {
      setMessage("Por favor, digite o código de pareamento exibido na sua TV.")
      setStatus("error")
      return
    }

    setStatus("submitting")
    setMessage("")

    try {
      // Simulação de aprovação no backend vortex-sync / Supabase
      await new Promise((res) => setTimeout(res, 1200))
      setStatus("success")
      setMessage("Sua TV foi vinculada com sucesso! O aplicativo será liberado automaticamente em alguns segundos.")
    } catch (err: any) {
      setStatus("error")
      setMessage("Não foi possível validar o código da TV. Verifique se o código expirou e tente novamente.")
    }
  }

  return (
    <div className="min-h-screen bg-carbon-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Luz ambiente de fundo (Glow Roxo Vortex) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[480px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 size-[280px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header com Logo */}
      <header className="mb-8 flex flex-col items-center z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-12 rounded-2xl bg-carbon-900 border border-purple-500/40 p-2 flex items-center justify-center shadow-lg shadow-purple-950/40 transition group-hover:border-purple-400 group-hover:scale-105">
            <Image src={logoImage} alt="Vortex Cine Logo" className="size-full object-contain" priority />
          </div>
          <span className="text-2xl font-black tracking-tight">
            Vortex <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">Cine</span>
          </span>
        </Link>
        <p className="text-white/60 text-xs sm:text-sm mt-2">Vincular Android TV / Google TV</p>
      </header>

      {/* Card Principal */}
      <main className="w-full max-w-md bg-carbon-900/90 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 relative">
        <div className="text-center mb-6">
          <div className="inline-flex size-12 rounded-2xl bg-purple-950/60 border border-purple-500/30 items-center justify-center mb-3">
            <svg className="size-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Conectar sua TV</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Digite o código de 6 dígitos que está aparecendo na tela da sua TV.
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center py-6">
            <div className="size-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="size-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">TV Conectada com Sucesso!</h3>
            <p className="text-white/70 text-xs sm:text-sm mb-6">{message}</p>
            <Link
              href="/"
              className="inline-block w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-sm font-semibold text-white transition border border-white/10"
            >
              Voltar ao Início
            </Link>
          </div>
        ) : (
          <form onSubmit={handleLink} className="space-y-4">
            {/* Campo Código da TV */}
            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2 text-center">
                Código de Pareamento
              </label>
              <input
                type="text"
                maxLength={8}
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="XXXXXX"
                className="w-full bg-carbon-800/90 border border-purple-500/30 rounded-2xl py-3.5 px-4 text-center font-mono text-2xl tracking-[0.35em] text-white placeholder-white/20 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition uppercase font-bold"
                required
              />
            </div>

            {/* Credenciais Opcionais do Usuário */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">
                  Usuário Vortex / Xtream
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Seu usuário"
                  className="w-full bg-carbon-800/80 border border-white/10 rounded-xl py-2.5 px-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-carbon-800/80 border border-white/10 rounded-xl py-2.5 px-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-400 transition"
                />
              </div>
            </div>

            {message && status === "error" && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-900/40 hover:shadow-purple-900/60 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "submitting" ? (
                <>
                  <svg className="animate-spin size-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Conectando...</span>
                </>
              ) : (
                <span>Vincular TV Agora</span>
              )}
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-white/5 text-center">
          <p className="text-white/40 text-xs">
            Precisa de ajuda? Acesse o canal oficial de suporte do Vortex Cine.
          </p>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="mt-8 text-center text-white/30 text-xs z-10">
        &copy; {new Date().getFullYear()} Vortex Cine. Todos os direitos reservados.
      </footer>
    </div>
  )
}
