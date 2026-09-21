"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Tv, CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldCheck, LogIn } from "lucide-react";
import Link from "next/link";

function TvLoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, activeProfile, loading: authLoading, signIn } = useAuth();

  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states if user is not logged in
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const rawCode = searchParams.get("code") || searchParams.get("user_code");
    if (rawCode) {
      setCode(rawCode.trim().toUpperCase());
    }
  }, [searchParams]);

  const handleApprove = async (codeToApprove?: string) => {
    const finalCode = (codeToApprove || code).trim().toUpperCase();
    if (!finalCode || finalCode.length < 4) {
      setErrorMessage("Por favor, digite um código de pareamento válido.");
      setStatus("error");
      return;
    }

    setSubmitting(true);
    setStatus("idle");
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.rpc("approve_tv_login_session", {
        p_code: finalCode,
      });

      if (error) {
        setStatus("error");
        setErrorMessage(error.message || "Não foi possível conectar à TV. Tente novamente.");
        return;
      }

      const result = Array.isArray(data) ? data[0] : data;
      if (result && result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          result?.message === "Invalid or expired TV login code"
            ? "Código inválido ou expirado. Gere um novo código na sua TV."
            : result?.message || "Código inválido ou expirado."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Erro de conexão com os servidores Vortex. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginAndApprove = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setErrorMessage(null);
    setStatus("idle");

    try {
      const { error: signInError } = await signIn(email.trim(), password);
      if (signInError) {
        setStatus("error");
        setErrorMessage("E-mail ou senha incorretos.");
        setLoginLoading(false);
        return;
      }

      // Automatically approve after login
      await handleApprove(code);
    } catch {
      setStatus("error");
      setErrorMessage("Falha ao autenticar. Tente novamente.");
    } finally {
      setLoginLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
        <p className="text-text-secondary text-sm">Verificando sessão...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg p-8 bg-surface border border-border rounded-2xl shadow-2xl">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 bg-accent/10 border border-accent/30 rounded-2xl flex items-center justify-center mb-4">
          <Tv className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary">Conectar Android TV</h1>
        <p className="text-sm text-text-secondary mt-1">
          Pareie sua TV com sua conta Vortex Cine em segundos
        </p>
      </div>

      {status === "success" ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-success/10 border border-success/30 rounded-full flex items-center justify-center mx-auto mb-4 text-success">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">TV Conectada com Sucesso!</h2>
          <p className="text-sm text-text-secondary mb-8 leading-relaxed">
            Sua Android TV já foi autenticada e está pronta para uso. Escolha seu perfil na TV para começar a assistir.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/app"
              className="w-full bg-accent hover:bg-accent-hover text-white py-3.5 px-4 rounded-xl font-medium text-sm transition-all text-center"
            >
              Ir para o Painel da Conta
            </Link>
            <button
              onClick={() => {
                setStatus("idle");
                setCode("");
              }}
              className="text-xs text-text-secondary hover:text-text-primary py-2 transition-colors"
            >
              Conectar outro dispositivo
            </button>
          </div>
        </div>
      ) : (
        <div>
          {status === "error" && errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
              <div className="text-sm text-danger">{errorMessage}</div>
            </div>
          )}

          {/* Código Input */}
          <div className="mb-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2 text-center">
              Código exibido na tela da TV
            </label>
            <input
              type="text"
              maxLength={8}
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              className="w-full bg-background border-2 border-border focus:border-accent rounded-xl py-3.5 text-center text-2xl font-mono tracking-widest text-text-primary font-bold uppercase transition-colors outline-none"
            />
          </div>

          {user ? (
            /* Logged in state */
            <div className="space-y-6">
              <div className="p-4 bg-background/60 border border-border rounded-xl flex items-center gap-3.5">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center font-bold text-white shadow-md text-base shrink-0"
                  style={{ backgroundColor: activeProfile?.avatar_color_hex || "#E50914" }}
                >
                  {activeProfile?.name ? activeProfile.name[0].toUpperCase() : user.email?.[0].toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs text-text-secondary">Conectando como</div>
                  <div className="text-sm font-semibold text-text-primary truncate">
                    {activeProfile?.name || user.email}
                  </div>
                  <div className="text-xs text-text-secondary/70 truncate">{user.email}</div>
                </div>
              </div>

              <button
                onClick={() => handleApprove()}
                disabled={submitting || !code}
                className="w-full bg-accent hover:bg-accent-hover text-white py-4 px-6 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Autorizando na TV...
                  </>
                ) : (
                  <>
                    Confirmar Login na TV
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Not logged in: Login inline */
            <form onSubmit={handleLoginAndApprove} className="space-y-4">
              <div className="text-xs font-medium text-text-secondary mb-2 text-center">
                Faça login com sua conta Vortex para autorizar este pareamento
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Seu e-mail"
                  className="w-full bg-background border border-border focus:border-accent rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors outline-none"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Sua senha"
                  className="w-full bg-background border border-border focus:border-accent rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading || submitting || !code}
                className="w-full bg-accent hover:bg-accent-hover text-white py-3.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
              >
                {loginLoading || submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Autenticando e Pareando...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Entrar e Conectar TV
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-border/60">
                <div className="flex items-start gap-2.5 text-xs text-text-secondary">
                  <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Contas criadas sob demanda pela administração do Vortex Cine.</span>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default function TvLoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-text-secondary">Carregando pareamento...</div>}>
        <TvLoginContent />
      </Suspense>
    </div>
  );
}
