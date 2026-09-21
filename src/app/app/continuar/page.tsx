"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { PlaySquare, Clock, Trash2, Film, Tv, Loader2, AlertCircle } from "lucide-react";

interface WatchProgressEntry {
  id: string;
  content_id: string;
  content_type: string;
  video_id: string;
  season?: number;
  episode?: number;
  position: number;
  duration: number;
  last_watched: number;
  progress_key: string;
}

export default function ContinuarPage() {
  const { activeProfile } = useAuth();
  const [items, setItems] = useState<WatchProgressEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProgress() {
      if (!activeProfile) return;
      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from("watch_progress")
          .select("*")
          .eq("profile_id", activeProfile.profile_index)
          .order("last_watched", { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        if (data) {
          setItems(data as WatchProgressEntry[]);
        }
      } catch (err: unknown) {
        const e = err as { message?: string };
        setError(e.message || "Erro ao carregar o progresso do perfil.");
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, [activeProfile]);

  const handleRemove = async (item: WatchProgressEntry) => {
    try {
      await supabase
        .from("watch_progress")
        .delete()
        .eq("id", item.id);

      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch {
      alert("Falha ao remover item.");
    }
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <PlaySquare className="w-6 h-6 text-accent" />
          Continuar Assistindo
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Filmes e séries em andamento no perfil <strong className="text-text-primary">{activeProfile?.name}</strong>
        </p>
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
          <span className="text-sm">Buscando histórico de reprodução...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="p-16 bg-surface border border-border rounded-2xl text-center space-y-4">
          <Clock className="w-12 h-12 text-text-secondary/50 mx-auto" />
          <h2 className="text-lg font-bold text-text-primary">Nenhum item em andamento</h2>
          <p className="text-sm text-text-secondary max-w-md mx-auto">
            Assim que você começar a assistir qualquer filme ou episódio no app Vortex Cine (mobile ou TV), ele será sincronizado aqui em tempo real.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const pct =
              item.duration > 0
                ? Math.min(100, Math.round((item.position / item.duration) * 100))
                : 0;

            return (
              <div
                key={item.id}
                className="bg-surface border border-border rounded-2xl p-5 flex flex-col justify-between hover:border-accent/40 transition-all shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      {item.content_type === "series" ? (
                        <>
                          <Tv className="w-3 h-3 text-accent" />
                          Série
                        </>
                      ) : (
                        <>
                          <Film className="w-3 h-3 text-accent" />
                          Filme
                        </>
                      )}
                    </span>

                    {item.season && item.episode && (
                      <span className="text-xs font-mono font-bold text-accent">
                        T{item.season} : E{item.episode}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-text-primary line-clamp-2 mb-2">
                    {item.content_id}
                  </h3>

                  <div className="text-xs text-text-secondary flex items-center gap-2 mb-4">
                    <span>{formatTime(item.position)} assistidos</span>
                    <span>•</span>
                    <span>Total: {formatTime(item.duration)}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-border/60">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-text-secondary">
                      <span>Progresso</span>
                      <span className="font-mono text-text-primary font-bold">{pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-1">
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-xs text-text-secondary hover:text-danger flex items-center gap-1 transition-colors py-1 px-2 rounded-lg hover:bg-danger/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remover da lista
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
