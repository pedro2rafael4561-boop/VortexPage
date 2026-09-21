"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"
import Link from "next/link"
import logoImage from "@/assets/images/vortex-logo.png"
import {
  User as UserIcon,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Server,
  ShieldCheck,
  ChevronRight,
  Tv,
} from "lucide-react"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect") || "/app"

  const { loginWithXtream, continueWithLastAccount, lastAccountUsername } = useAuth()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!username.trim() || !password.trim() || loading) return

    setError(null)
    setLoading(true)

    try {
      const res = await loginWithXtream(username.trim(), password.trim())
      if (res.success) {
        router.push(redirectUrl)
      } else {
        setError(res.error || "Usuário ou senha incorretos.")
      }
    } catch {
      setError("Falha ao conectar ao servidor. Verifique sua conexão e tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleContinueLast = async () => {
    if (loading) return
    setError(null)
    setLoading(true)

    try {
      const res = await continueWithLastAccount()
      if (res.success) {
        router.push(redirectUrl)
      } else {
        setError(res.error || "Informe a senha para continuar.")
        if (lastAccountUsername) setUsername(lastAccountUsername)
      }
    } catch {
      setError("Falha ao conectar. Tente digitar seu usuário e senha.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[420px] mx-auto px-4 py-8">
      {/* Brand Lockup igual ao AuthScreen.kt do app */}
      <div className="flex flex-col items-center text-center mb-8">
        <Link href="/" className="transition hover:opacity-90 active:scale-95 mb-4">
          <div className="h-16 w-16 rounded-2xl bg-[#161616] border border-violet-500/40 p-2.5 shadow-xl shadow-violet-950/50 flex items-center justify-center">
            <Image src={logoImage} alt="Vortex Cine" className="h-full w-full object-contain" priority />
          </div>
        </Link>
        <span className="text-sm font-medium text-[#969CA3] tracking-wide">Vortex Cine</span>

        <div className="mt-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-xs text-violet-300">
          <Server className="w-3 h-3 text-violet-400" />
          <span>DNS Nativo: <strong className="font-semibold text-white">kixar.xyz</strong> (Fixo)</span>
        </div>
      </div>

      {/* Auth Heading */}
      <div className="text-center sm:text-left mb-6">
        <h1 className="text-3xl font-semibold text-[#F5F7F8] tracking-tight">Entrar</h1>
        <p className="text-sm text-[#969CA3] mt-1.5">Informe seu usuário e senha</p>
      </div>

      {/* Card da Última Conta (igual LastAccountCard no AuthScreen.kt) */}
      {lastAccountUsername && (
        <div className="mb-5">
          <div
            onClick={handleContinueLast}
            className="w-full rounded-2xl bg-[#161616] border border-violet-500/45 p-3.5 flex items-center justify-between cursor-pointer transition hover:bg-violet-950/20 active:scale-[0.99] shadow-lg shadow-violet-950/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-violet-500/20 flex items-center justify-center text-[#A78BFA]">
                <UserIcon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs text-[#969CA3]">Continuar como</div>
                <div className="text-sm font-semibold text-[#F5F7F8]">{lastAccountUsername}</div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#A78BFA]" />
          </div>

          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-[#6E7178]">ou entre com outra conta</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
        </div>
      )}

      {/* Mensagem de Erro (igual ao erro do AuthScreen.kt) */}
      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-[#E53935]/12 border border-[#E53935]/30 text-sm text-[#FF6B6B] leading-snug">
          {error}
        </div>
      )}

      {/* Formulário com campos estilizados exatamente como AuthTextField */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Campo Usuário */}
        <div className="relative">
          <div className="w-full h-14 bg-white/[0.04] border border-white/[0.08] focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 rounded-2xl flex items-center px-4 transition-all">
            <UserIcon className="w-5 h-5 text-[#6E7178] shrink-0" />
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError(null)
              }}
              placeholder="Usuário"
              autoComplete="username"
              autoCapitalize="none"
              required
              className="w-full bg-transparent border-none text-[#F5F7F8] placeholder-[#6E7178] text-base pl-3 pr-2 outline-none"
            />
          </div>
        </div>

        {/* Campo Senha */}
        <div className="relative">
          <div className="w-full h-14 bg-white/[0.04] border border-white/[0.08] focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 rounded-2xl flex items-center px-4 transition-all">
            <Lock className="w-5 h-5 text-[#6E7178] shrink-0" />
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(null)
              }}
              placeholder="Senha"
              autoComplete="current-password"
              required
              className="w-full bg-transparent border-none text-[#F5F7F8] placeholder-[#6E7178] text-base pl-3 pr-2 outline-none"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="p-1 rounded-full text-[#969CA3] hover:text-white transition"
              tabIndex={-1}
            >
              {passwordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Botão Primário Entrar (Estilo AuthPrimaryButton) */}
        <button
          type="submit"
          disabled={loading || !username.trim() || !password.trim()}
          className="w-full h-14 mt-4 rounded-2xl bg-[#F5F5F5] hover:bg-white text-[#111111] font-semibold text-base transition-all active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg disabled:opacity-45 disabled:pointer-events-none cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-[#111111]" />
              <span>Conectando...</span>
            </>
          ) : (
            <span>Entrar</span>
          )}
        </button>
      </form>

      {/* Atalho para Pareamento de TV */}
      <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
        <Link
          href="/tvlogin"
          className="text-xs font-medium text-[#A78BFA] hover:text-violet-300 transition flex items-center gap-1.5"
        >
          <Tv className="w-4 h-4" />
          <span>Quer conectar na Smart TV? Clique aqui</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Rodapé informativo */}
      <div className="mt-6 flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-[#6E7178]">
        <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
        <span>
          O Vortex Cine utiliza servidor nativo fixo criptografado. Use o mesmo usuário e senha do seu aplicativo.
        </span>
      </div>
    </div>
  )
}

export default function EntrarPage() {
  return (
    <div className="min-h-screen vortex-gradient-bg flex flex-col justify-center py-12">
      <Suspense fallback={<div className="text-center text-[#969CA3]">Carregando...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
