"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import {
  UserCheck,
  Lock,
  Mail,
  ShieldAlert,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Trash2,
  Shield,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function ContaPage() {
  const { user, signOut } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 6) {
      setPasswordError("A nova senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("A confirmação de senha não coincide.");
      return;
    }

    setLoadingPassword(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      setPasswordSuccess("Senha alterada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const e = err as { message?: string };
      setPasswordError(e.message || "Erro ao atualizar a senha.");
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "EXCLUIR") {
      setDeleteError("Digite EXCLUIR para confirmar a exclusão permanente.");
      return;
    }

    setLoadingDelete(true);
    setDeleteError(null);

    try {
      // 1. Delete user sync data
      if (user) {
        await supabase.from("profiles").delete().eq("user_id", user.id);
        await supabase.from("library_items").delete().eq("user_id", user.id);
        await supabase.from("watch_progress").delete().eq("user_id", user.id);
        await supabase.from("watched_items").delete().eq("user_id", user.id);
        await supabase.from("tv_login_sessions").delete().eq("approved_user_id", user.id);
        await supabase.from("user_session_devices").delete().eq("user_id", user.id);
      }

      await signOut();
      window.location.href = "/";
    } catch (err: unknown) {
      const e = err as { message?: string };
      setDeleteError(e.message || "Erro ao solicitar exclusão. Entre em contato com o suporte.");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-accent" />
          Configurações da Conta
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Gerenciamento de credenciais, segurança e privacidade de dados
        </p>
      </div>

      {/* Account Details Card */}
      <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
          <Mail className="w-5 h-5 text-accent" />
          Dados da Conta
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-background border border-border rounded-xl p-4">
            <div className="text-xs text-text-secondary">E-mail Cadastrado</div>
            <div className="text-sm font-semibold text-text-primary mt-1">{user?.email}</div>
          </div>
          <div className="bg-background border border-border rounded-xl p-4">
            <div className="text-xs text-text-secondary">Identificador Único (ID)</div>
            <div className="text-xs font-mono text-text-primary mt-1 truncate">{user?.id}</div>
          </div>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-accent" />
          <h2 className="text-base font-bold text-text-primary">Alterar Senha</h2>
        </div>

        {passwordError && (
          <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
            <div className="text-sm text-danger">{passwordError}</div>
          </div>
        )}

        {passwordSuccess && (
          <div className="p-4 rounded-xl bg-success/10 border border-success/20 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
            <div className="text-sm text-success">{passwordSuccess}</div>
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
              Nova Senha
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-background border border-border focus:border-accent rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-background border border-border focus:border-accent rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loadingPassword}
            className="bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-accent/20 disabled:opacity-50"
          >
            {loadingPassword ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Atualizando...
              </>
            ) : (
              "Atualizar Senha"
            )}
          </button>
        </form>
      </div>

      {/* Privacy and LGPD Card */}
      <div className="bg-surface border border-danger/30 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-danger">
          <ShieldAlert className="w-5 h-5" />
          <h2 className="text-base font-bold text-text-primary">Zona de Perigo — Exclusão de Dados (LGPD)</h2>
        </div>

        <p className="text-xs text-text-secondary leading-relaxed max-w-2xl">
          Conforme a Lei Geral de Proteção de Dados (LGPD), você pode solicitar a exclusão de todos os seus dados armazenados em nossos servidores. Esta ação é definitiva e apagará todos os seus perfis, listas de favoritos, histórico e sessões conectadas.
        </p>

        {deleteError && (
          <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 flex items-start gap-3 max-w-md">
            <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
            <div className="text-sm text-danger">{deleteError}</div>
          </div>
        )}

        <div className="space-y-3 max-w-md">
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Digite <span className="text-danger font-mono font-bold">EXCLUIR</span> para confirmar:
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder="EXCLUIR"
              className="bg-background border border-danger/40 focus:border-danger rounded-xl px-4 py-2.5 text-sm text-text-primary font-mono outline-none w-36"
            />
            <button
              onClick={handleDeleteAccount}
              disabled={loadingDelete || deleteConfirm !== "EXCLUIR"}
              className="bg-danger hover:bg-danger/80 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all disabled:opacity-40"
            >
              {loadingDelete ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Excluir Definitivamente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
