"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Film, Lock, Mail, AlertCircle, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/app";

  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await signIn(email.trim(), password);
      if (signInError) {
        setError("Credenciais inválidas. Verifique seu e-mail e senha.");
      } else {
        router.push(redirectUrl);
      }
    } catch {
      setError("Ocorreu um erro ao conectar ao servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-surface border border-border rounded-2xl shadow-2xl">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-14 h-14 bg-accent/10 border border-accent/30 rounded-2xl flex items-center justify-center mb-4">
          <Film className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary">Acesse sua conta</h1>
        <p className="text-sm text-text-secondary mt-1">
          Painel de gerenciamento oficial Vortex Cine
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
          <div className="text-sm text-danger">{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
            E-mail
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              className="w-full bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent rounded-xl pl-11 pr-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
            Senha
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent rounded-xl pl-11 pr-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-accent hover:bg-accent-hover text-white py-3.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Autenticando...
            </>
          ) : (
            <>
              Entrar
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-border/60">
        <div className="flex items-start gap-3 p-3.5 bg-background/50 rounded-xl border border-border/40 text-xs text-text-secondary leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <span>
            As contas do Vortex Cine são criadas pelo administrador. Não existe cadastro público. Em caso de dúvidas, consulte seu suporte.
          </span>
        </div>
      </div>
    </div>
  );
}

export default function EntrarPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-text-secondary">Carregando formulário...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
