"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  Tv,
  Smartphone,
  Globe,
  Trash2,
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
} from "lucide-react";

interface TvSession {
  id: string;
  code: string;
  device_name?: string;
  status: string;
  created_at: string;
  approved_at?: string;
}

interface UserDevice {
  session_id: string;
  installation_id: string;
  client_name: string;
  client_version?: string;
  platform?: string;
  device_name?: string;
  last_seen_at: string;
}

export default function DispositivosPage() {
  const { user } = useAuth();
  const [tvSessions, setTvSessions] = useState<TvSession[]>([]);
  const [devices, setDevices] = useState<UserDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSessionsAndDevices = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      // 1. Fetch active TV login sessions approved for this user
      const { data: tvData } = await supabase
        .from("tv_login_sessions")
        .select("*")
        .eq("approved_user_id", user.id)
        .order("approved_at", { ascending: false });

      if (tvData) {
        setTvSessions(tvData as TvSession[]);
      }

      // 2. Fetch registered client devices
      const { data: devData } = await supabase
        .from("user_session_devices")
        .select("*")
        .eq("user_id", user.id)
        .order("last_seen_at", { ascending: false });

      if (devData) {
        setDevices(devData as UserDevice[]);
      }
    } catch (err: unknown) {
      const e = err as { message?: string };
      setError(e.message || "Erro ao carregar dispositivos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessionsAndDevices();
  }, [user]);

  const handleDisconnectTv = async (code: string) => {
    if (!confirm("Deseja realmente desconectar esta Android TV da sua conta?")) return;

    try {
      await supabase
        .from("tv_login_sessions")
        .delete()
        .eq("code", code);

      setTvSessions((prev) => prev.filter((s) => s.code !== code));
    } catch {
      alert("Erro ao desconectar TV.");
    }
  };

  const handleDisconnectDevice = async (installationId: string) => {
    if (!confirm("Deseja revogar o acesso deste dispositivo?")) return;

    try {
      await supabase
        .from("user_session_devices")
        .delete()
        .eq("installation_id", installationId);

      setDevices((prev) => prev.filter((d) => d.installation_id !== installationId));
    } catch {
      alert("Erro ao revogar dispositivo.");
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Tv className="w-6 h-6 text-accent" />
            Dispositivos Conectados
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Gerencie suas Android TVs e aplicativos autenticados na sua conta Vortex Cine
          </p>
        </div>

        <Link
          href="/tv-login"
          className="bg-accent hover:bg-accent-hover text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-accent/20 w-fit"
        >
          <Plus className="w-4 h-4" />
          Conectar Nova TV
        </Link>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
          <div className="text-sm text-danger">{error}</div>
        </div>
      )}

      {loading ? (
        <div className="p-16 bg-surface rounded-2xl border border-border flex flex-col items-center justify-center text-text-secondary">
          <Loader2 className="w-8 h-8 text-accent animate-spin mb-3" />
          <span className="text-sm">Carregando dispositivos autorizados...</span>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Smart TVs Section */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Tv className="w-4 h-4 text-accent" />
              Sessões de Android TV Pareadas
            </h2>

            {tvSessions.length === 0 ? (
              <div className="p-8 bg-surface border border-border rounded-2xl text-center space-y-3">
                <Tv className="w-10 h-10 text-text-secondary/40 mx-auto" />
                <div className="text-sm font-semibold text-text-primary">Nenhuma Android TV conectada</div>
                <p className="text-xs text-text-secondary max-w-sm mx-auto">
                  Abra o aplicativo Vortex Cine TV na sua TV e escaneie o QR Code ou digite o código de 6 dígitos em{" "}
                  <Link href="/tv-login" className="text-accent hover:underline">/tv-login</Link>.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tvSessions.map((session) => (
                  <div
                    key={session.code}
                    className="p-5 bg-surface border border-border rounded-2xl flex items-start justify-between gap-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                        <Tv className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-text-primary">
                            {session.device_name || "Android TV"}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-success/10 border border-success/20 text-success text-[10px] font-bold">
                            Conectada
                          </span>
                        </div>
                        <div className="text-xs font-mono text-text-secondary mt-1">
                          Código: <strong className="text-text-primary">{session.code}</strong>
                        </div>
                        {session.approved_at && (
                          <div className="text-[11px] text-text-secondary/70 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Aprovada em {formatDate(session.approved_at)}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDisconnectTv(session.code)}
                      className="text-xs text-text-secondary hover:text-danger hover:bg-danger/10 p-2 rounded-lg transition-colors"
                      title="Desconectar TV"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Registered Devices (Mobile / Web) Section */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              Outros Dispositivos Autenticados
            </h2>

            {devices.length === 0 ? (
              <div className="p-8 bg-surface border border-border rounded-2xl text-center space-y-3">
                <Smartphone className="w-10 h-10 text-text-secondary/40 mx-auto" />
                <div className="text-sm font-semibold text-text-primary">Nenhum outro dispositivo registrado</div>
                <p className="text-xs text-text-secondary max-w-sm mx-auto">
                  Dispositivos móveis e navegadores aparecerão aqui após realizarem login com sua conta.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {devices.map((dev) => (
                  <div
                    key={dev.installation_id}
                    className="p-5 bg-surface border border-border rounded-2xl flex items-start justify-between gap-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-background border border-border flex items-center justify-center text-text-primary shrink-0 mt-0.5">
                        {dev.client_name?.toLowerCase().includes("web") ? (
                          <Globe className="w-6 h-6 text-accent" />
                        ) : (
                          <Smartphone className="w-6 h-6 text-accent" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-text-primary">
                          {dev.device_name || dev.client_name}
                        </h3>
                        <div className="text-xs text-text-secondary mt-0.5">
                          {dev.client_name} {dev.client_version && `v${dev.client_version}`} ({dev.platform || "Android"})
                        </div>
                        <div className="text-[11px] text-text-secondary/70 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Visto pela última vez: {formatDate(dev.last_seen_at)}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDisconnectDevice(dev.installation_id)}
                      className="text-xs text-text-secondary hover:text-danger hover:bg-danger/10 p-2 rounded-lg transition-colors"
                      title="Revogar acesso"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
