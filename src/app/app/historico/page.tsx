"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { History, Film, Tv, Trash2, Loader2, Calendar, AlertCircle } from "lucide-react";

interface WatchedItem {
  id: string;
  content_id: string;
  content_type: string;
  title: string;
  season?: number;
  episode?: number;
  watched_at: number;
}

export default function HistoricoPage() {
  const { activeProfile } = useAuth();
  const [history, setHistory] = useState<WatchedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHistory() {
      if (!activeProfile) return;
      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from("watched_items")
          .select("*")
          .eq("profile_id", activeProfile.profile_index)
          .order("watched_at", { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        if (data) {
          setHistory(data as WatchedItem[]);
        }
      } catch (err: unknown) {
        const e = err as { message?: string };
        setError(e.message || "Erro ao carregar histórico.");
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [activeProfile]);

  const handleRemove = async (id: string) => {
    try {
      await supabase
        .from("watched_items")
        .delete()
        .eq("id", id);

      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Erro ao remover item do histórico.");
    }
  };

  const handleClearAll = async () => {
    if (!activeProfile) return;
    if (!confirm("Deseja realmente limpar todo o histórico deste perfil?")) return;

    try {
      await supabase
        .from("watched_items")
        .delete()
        .eq("profile_id", activeProfile.profile_index);

      setHistory([]);
    } catch {
      alert("Erro ao limpar histórico.");
    }
  };

  const formatDate = (timestamp: number) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <History className="w-6 h-6 text-accent" />
            Histórico de Reprodução
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Registro cronológico de conteúdos assistidos no perfil <strong className="text-text-primary">{activeProfile?.name}</strong>
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs text-danger hover:bg-danger/10 border border-danger/20 py-2 px-3.5 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Limpar Todo o Histórico
          </button>
        )}
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
          <span className="text-sm">Carregando histórico...</span>
        </div>
      ) : history.length === 0 ? (
        <div className="p-16 bg-surface border border-border rounded-2xl text-center space-y-4">
          <History className="w-12 h-12 text-text-secondary/50 mx-auto" />
          <h2 className="text-lg font-bold text-text-primary">Histórico vazio</h2>
          <p className="text-sm text-text-secondary max-w-md mx-auto">
            Os conteúdos assistidos até o fim ou parcialmente reproduzidos neste perfil aparecerão aqui.
          </p>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-2xl divide-y divide-border/60 overflow-hidden shadow-md">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-surface-light transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-accent shrink-0">
                  {item.content_type === "series" ? (
                    <Tv className="w-5 h-5" />
                  ) : (
                    <Film className="w-5 h-5" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-text-primary truncate">
                    {item.title || item.content_id}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-secondary mt-0.5">
                    {item.season && item.episode ? (
                      <span className="font-mono text-accent">
                        Temporada {item.season} • Episódio {item.episode}
                      </span>
                    ) : (
                      <span>{item.content_type === "series" ? "Série" : "Filme"}</span>
                    )}
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(item.watched_at)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="p-2 text-text-secondary hover:text-danger hover:bg-danger/10 rounded-lg transition-colors shrink-0"
                title="Remover do histórico"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
