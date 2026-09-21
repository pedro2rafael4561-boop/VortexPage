"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"
import { Tv, CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldCheck, LogIn, User, Smartphone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logoImage from "@/assets/images/vortex-logo.png"

export function TvPairingCardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, activeProfile, profiles, setActiveProfile, loading: authLoading, signIn } = useAuth()

  const [code, setCode] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Login form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginLoading, setLoginLoading] = useState(false)

  useEffect(() => {
    const rawCode = searchParams.get("code") || searchParams.get("c") || searchParams.get("user_code")
    if (rawCode) {
      setCode(rawCode.trim().toLowerCase())
    }
  }, [searchParams])

  const handleApprove = async (codeToApprove?: string) => {
    const rawInput = (codeToApprove || code).trim()
    if (!rawInput || rawInput.length < 4) {
      setErrorMessage("Por favor, digite o código de pareamento exibido na sua TV.")
      setStatus("error")
      return
    }

    setSubmitting(true)
    setStatus("idle")
    setErrorMessage(null)

    try {
      // Clean code: try exact string first, then uppercase for short codes
      const targetCode = rawInput.length <= 8 ? rawInput.toUpperCase() : rawInput.toLowerCase()

      const { data, error } = await supabase.rpc("approve_tv_login_session", {
        p_code: targetCode,
      })

      if (error) {
        // Retry with opposite casing in case the RPC expects uppercase/lowercase
        const altCode = rawInput.length <= 8 ? rawInput.toLowerCase() : rawInput.toUpperCase()
        const retry = await supabase.rpc("approve_tv_login_session", {
          p_code: altCode,
        })

        if (retry.error) {
          setStatus("error")
          setErrorMessage(error.message || "Não foi possível conectar à TV. Verifique o código e tente novamente.")
          return
        }

        const retryResult = Array.isArray(retry.data) ? retry.data[0] : retry.data
        if (retryResult?.success) {
          setStatus("success")
          return
        }
      }

      const result = Array.isArray(data) ? data[0] : data
      if (result && result.success) {
        setStatus("success")
      } else {
        setStatus("error")
        setErrorMessage(
          result?.message === "Invalid or expired TV login code"
            ? "Código inválido ou expirado. Gere um novo código na sua TV e tente novamente."
            : result?.message || "Código inválido ou expirado."
        )
      }
    } catch {
      setStatus("error")
      setErrorMessage("Erro de conexão com os servidores Vortex. Verifique sua rede e tente novamente.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleLoginAndApprove = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setErrorMessage(null)
    setStatus("idle")

    try {
      const { error: signInError } = await signIn(email.trim(), password)
      if (signInError) {
        setStatus("error")
        setErrorMessage("E-mail ou senha incorretos. Verifique seus dados e tente novamente.")
        setLoginLoading(false)
        return
      }

      await handleApprove(code)
    } catch {
      setStatus("error")
      setErrorMessage("Falha ao autenticar. Tente novamente.")
    } finally {
      setLoginLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <Loader2 className="w-8 h-8 text-brand animate-spin mb-4" />
        <p className="text-neutral-400 text-sm">Verificando credenciais...</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg bg-carbon-900 border border-carbon-700/80 rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Glow Superior Vermelho Cinema */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-36 bg-brand/15 blur-[90px] rounded-full pointer-events-none" />

      {/* Cabeçalho */}
      <div className="flex flex-col items-center text-center mb-8 relative z-10">
        <div className="h-16 w-16 bg-brand/10 border border-brand/25 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-brand/10 text-brand">
          <Tv className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Parear Smart TV
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-sm">
          Conecte sua Android TV ou TV Box à sua conta oficial <strong className="text-white">Vortex Cine</strong> instantaneamente.
        </p>
      </div>

      {status === "success" ? (
        <div className="text-center py-6 relative z-10">
          <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">TV Conectada com Sucesso!</h2>
          <p className="text-sm text-neutral-300 mb-8 leading-relaxed max-w-sm mx-auto">
            Sua TV já recebeu a autorização e está carregando seu perfil. Você já pode usar o controle remoto para assistir.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/app"
              className="w-full bg-brand hover:bg-brand-hover text-white py-3.5 px-4 rounded-xl font-semibold text-sm transition-all text-center shadow-lg shadow-brand/20 active:scale-95"
            >
              Ir para o Painel da Conta
            </Link>
            <button
              onClick={() => {
                setStatus("idle")
                setCode("")
              }}
              className="text-xs text-neutral-400 hover:text-white py-2 transition-colors"
            >
              Conectar outro televisor
            </button>
          </div>
        </div>
      ) : (
        <div className="relative z-10">
          {status === "error" && errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/60 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="text-sm text-red-200">{errorMessage}</div>
            </div>
          )}

          {/* Campo do Código */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5 text-center">
              Código exibido na tela da TV
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.trim())}
              placeholder="Ex: ABC-123 ou d3583f..."
              className="w-full bg-carbon-950 border-2 border-carbon-700 focus:border-brand rounded-2xl py-3.5 px-4 text-center text-lg sm:text-xl font-mono tracking-wider text-white font-bold transition-all outline-none shadow-inner"
            />
            <p className="text-[11px] text-neutral-500 mt-2 text-center">
              Suporta códigos rápidos (6 caracteres) ou códigos completos (32 caracteres).
            </p>
          </div>

          {user ? (
            /* Usuário já autenticado */
            <div className="space-y-6">
              {/* Card da Conta Atual */}
              <div className="p-4 bg-carbon-950/80 border border-carbon-700 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md text-base shrink-0"
                    style={{ backgroundColor: activeProfile?.avatar_color_hex || "#E50914" }}
                  >
                    {activeProfile?.name ? activeProfile.name[0].toUpperCase() : user.email?.[0].toUpperCase()}
                  </div>
                  <div className="overflow-hidden text-left">
                    <div className="text-[11px] font-medium text-neutral-400">Autorizando como</div>
                    <div className="text-sm font-bold text-white truncate">
                      {activeProfile?.name || user.email}
                    </div>
                    <div className="text-xs text-neutral-400 truncate">{user.email}</div>
                  </div>
                </div>

                <Link
                  href="/app/perfis"
                  className="text-xs text-brand hover:underline font-semibold shrink-0"
                >
                  Trocar Perfil
                </Link>
              </div>

              {/* Botão de Confirmação */}
              <button
                onClick={() => handleApprove()}
                disabled={submitting || !code}
                className="w-full bg-brand hover:bg-brand-hover text-white py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-brand/25 disabled:opacity-40 active:scale-95 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Autorizando TV...</span>
                  </>
                ) : (
                  <>
                    <span>Confirmar Conexão na TV</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Usuário precisa fazer login */
            <form onSubmit={handleLoginAndApprove} className="space-y-4">
              <div className="text-xs font-semibold text-neutral-300 mb-2 text-center">
                Entre na sua conta para liberar o acesso na TV:
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Seu e-mail da conta Vortex"
                  className="w-full bg-carbon-950 border border-carbon-700 focus:border-brand rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 transition-colors outline-none"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Sua senha"
                  className="w-full bg-carbon-950 border border-carbon-700 focus:border-brand rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 transition-colors outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading || submitting || !code}
                className="w-full bg-brand hover:bg-brand-hover text-white py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand/20 disabled:opacity-40 active:scale-95 cursor-pointer"
              >
                {loginLoading || submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Autenticando e Conectando...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Entrar e Conectar TV</span>
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-carbon-700/60 flex items-center justify-between text-xs text-neutral-400">
                <Link href="/entrar" className="hover:text-white transition">
                  Já possui conta? Entrar separadamente
                </Link>
                <Link href="/" className="hover:text-white transition">
                  Voltar ao início
                </Link>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
