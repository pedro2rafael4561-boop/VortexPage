"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"
import { Tv, CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldCheck, User, Server } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logoImage from "@/assets/images/vortex-logo.png"

export function TvPairingCardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, xtreamUsername, activeProfile, profiles, loading: authLoading, loginWithXtream } = useAuth()

  const [code, setCode] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Login form state se não estiver autenticado
  const [username, setUsername] = useState("")
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
      const targetCode = rawInput.length <= 8 ? rawInput.toUpperCase() : rawInput.toLowerCase()

      // Obter credenciais salvas do usuário atual
      const activeUser = xtreamUsername || (typeof window !== "undefined" ? localStorage.getItem("vortex_user") : "") || username
      const activePass = (typeof window !== "undefined" ? localStorage.getItem("vortex_pass") : "") || password

      // 1. Notifica a rota de pareamento de TV para que o app TV receba as credenciais instantaneamente
      let apiApproved = false
      if (activeUser && activePass) {
        try {
          const apiRes = await fetch("/api/auth/tv-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "approve",
              code: rawInput,
              username: activeUser,
              password: activePass,
            }),
          })
          const apiData = await apiRes.json()
          if (apiData?.success) {
            apiApproved = true
          }
        } catch (apiErr) {
          console.warn("Falha ao notificar /api/auth/tv-session:", apiErr)
        }
      }

      // 2. Notifica o Supabase RPC
      const { data, error } = await supabase.rpc("approve_tv_login_session", {
        p_code: targetCode,
      })

      if (error && !apiApproved) {
        const altCode = rawInput.length <= 8 ? rawInput.toLowerCase() : rawInput.toUpperCase()
        const retry = await supabase.rpc("approve_tv_login_session", {
          p_code: altCode,
        })

        if (retry.error && !apiApproved) {
          setStatus("error")
          setErrorMessage(error.message || "Não foi possível conectar à TV. Verifique o código e tente novamente.")
          return
        }
      }

      const result = Array.isArray(data) ? data[0] : data
      if (apiApproved || result?.success) {
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
      const res = await loginWithXtream(username.trim(), password.trim())
      if (!res.success) {
        setStatus("error")
        setErrorMessage(res.error || "Usuário ou senha incorretos.")
        setLoginLoading(false)
        return
      }

      // Após login com sucesso, aprova o código automaticamente se preenchido
      if (code.trim()) {
        await handleApprove(code)
      }
    } catch {
      setStatus("error")
      setErrorMessage("Falha ao autenticar sua conta.")
    } finally {
      setLoginLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-3xl bg-[#161616] border border-violet-500/35 p-6 sm:p-8 shadow-2xl shadow-violet-950/40">
        {/* Header com Logo */}
        <div className="flex flex-col items-center text-center mb-7">
          <div className="h-16 w-16 rounded-2xl bg-black/40 border border-violet-500/30 p-2.5 shadow-xl shadow-violet-950/40 flex items-center justify-center mb-4">
            <Image src={logoImage} alt="Vortex Cine" className="h-full w-full object-contain" priority />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F5F7F8]">Conectar à Smart TV</h1>
          <p className="text-sm text-[#969CA3] mt-1">
            Digite o código exibido no seu aplicativo Vortex Cine TV
          </p>

          <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300">
            <Server className="w-3 h-3 text-violet-400" />
            <span>Servidor Nativo: <strong className="text-white">kixar.xyz</strong></span>
          </div>
        </div>

        {/* Estado de Sucesso */}
        {status === "success" && (
          <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-6 text-center animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3 text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Smart TV Conectada!</h3>
            <p className="text-sm text-neutral-300 mb-6">
              Sua TV foi autenticada com sucesso no Vortex Cine. O carregamento começará na tela em instantes.
            </p>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/app"
                className="w-full py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition"
              >
                Acessar Painel da Conta
              </Link>
              <button
                onClick={() => {
                  setStatus("idle")
                  setCode("")
                }}
                className="text-xs text-[#969CA3] hover:text-white transition py-1"
              >
                Parear outro dispositivo
              </button>
            </div>
          </div>
        )}

        {/* Formulário Normal de Pareamento */}
        {status !== "success" && (
          <div className="space-y-6">
            {/* Mensagem de Erro */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-[#E53935]/12 border border-[#E53935]/30 flex items-start gap-2.5 text-sm text-[#FF6B6B]">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Campo de Código */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#969CA3] mb-2">
                Código Exibido na TV
              </label>
              <div className="relative">
                <Tv className="w-5 h-5 text-[#6E7178] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value)
                    setErrorMessage(null)
                  }}
                  placeholder="Ex: ABC123"
                  className="w-full h-14 bg-white/[0.04] border border-white/[0.08] focus:border-violet-500 rounded-2xl pl-12 pr-4 text-center font-mono text-lg font-bold tracking-widest text-white placeholder:text-[#6E7178] placeholder:font-sans placeholder:tracking-normal outline-none transition uppercase"
                />
              </div>
            </div>

            {/* Se o usuário já estiver logado */}
            {user ? (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-violet-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow"
                      style={{ backgroundColor: activeProfile?.avatar_color_hex || "#7C3AED" }}
                    >
                      {activeProfile?.name?.charAt(0).toUpperCase() || xtreamUsername?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-xs text-[#969CA3]">Conectar como</div>
                      <div className="text-sm font-semibold text-white">{activeProfile?.name || xtreamUsername}</div>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-medium">
                    Ativo
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleApprove()}
                  disabled={submitting || !code.trim()}
                  className="w-full h-14 rounded-2xl bg-[#F5F5F5] hover:bg-white text-[#111111] font-semibold text-base transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-40 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Autorizando TV...</span>
                    </>
                  ) : (
                    <>
                      <span>Autorizar Conexão da TV</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* Se não estiver logado: login com usuário e senha */
              <form onSubmit={handleLoginAndApprove} className="space-y-4 pt-2 border-t border-white/[0.08]">
                <div className="text-xs font-medium text-[#969CA3]">
                  Entre com seu usuário e senha do aplicativo para autorizar a TV:
                </div>

                <div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Usuário"
                    required
                    className="w-full h-12 bg-white/[0.04] border border-white/[0.08] focus:border-violet-500 rounded-xl px-4 text-sm text-[#F5F7F8] placeholder-[#6E7178] outline-none transition"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    required
                    className="w-full h-12 bg-white/[0.04] border border-white/[0.08] focus:border-violet-500 rounded-xl px-4 text-sm text-[#F5F7F8] placeholder-[#6E7178] outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading || !username.trim() || !password.trim() || !code.trim()}
                  className="w-full h-14 rounded-2xl bg-[#F5F5F5] hover:bg-white text-[#111111] font-semibold text-base transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-40 cursor-pointer"
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Conectando e Autorizando...</span>
                    </>
                  ) : (
                    <>
                      <span>Entrar e Autorizar TV</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Rodapé explicativo */}
        <div className="mt-7 pt-5 border-t border-white/[0.06] flex items-start gap-2.5 text-xs text-[#6E7178]">
          <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
          <span>
            Abra o app Vortex Cine na sua Smart TV, selecione Entrar com QR/Código e digite o código de 6 caracteres exibido.
          </span>
        </div>
      </div>
    </div>
  )
}
