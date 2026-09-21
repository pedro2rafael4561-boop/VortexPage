"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  Tv,
  PlaySquare,
  Bookmark,
  Users,
  ArrowRight,
  Clock,
  Sparkles,
  Loader2,
  CheckCircle2,
} from "lucide-react";

interface WatchProgressItem {
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

interface LibraryItem {
  id: string;
  content_id: string;
  content_type: string;
  name: string;
  poster?: string;
  imdb_rating?: number;
  release_info?: string;
}

export default function DashboardOverviewPage() {
  const { user, activeProfile, profiles } = useAuth();
  const [continueWatching, setContinueWatching] = useState<WatchProgressItem[]>([]);
  const [favorites, setFavorites] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOverviewData() {
      if (!user) return;
      setLoading(true);

      const profileIndex = activeProfile?.profile_index || 1;

      try {
        // Load watch progress
        const { data: progressData } = await supabase
          .from("watch_progress")
          .select("*")
          .eq("profile_id", profileIndex)
          .order("last_watched", { ascending: false })
          .limit(4);

        if (progressData) {
          setContinueWatching(progressData as WatchProgressItem[]);
        }

        // Load favorites
        const { data: favData } = await supabase
          .from("library_items")
          .select("*")
          .eq("profile_id", profileIndex)
          .order("added_at", { ascending: false })
          .limit(4);

        if (favData) {
          setFavorites(favData as LibraryItem[]);
        }
      } catch (err) {
        console.error("Failed to load overview data", err);
      } finally {
        setLoading(false);
      }
    }

    loadOverviewData();
  }, [user, activeProfile]);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-surface border border-border rounded-3xl p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl -z-0" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
              <Sparkles className="w-4 h-4" />
              Painel de Controle
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
              Olá, {activeProfile?.name || "Usuário"}!
            </h1>
            <p className="text-sm text-text-secondary max-w-xl">
              Gerencie seus perfis, favoritos, progresso de séries e pareie suas Smart TVs com um clique.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/tv-login"
              className="bg-accent hover:bg-accent-hover text-white px-5 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-accent/20"
            >
              <Tv className="w-4 h-4" />
              Conectar Nova TV
            </Link>
            <Link
              href="/downloads"
              className="bg-background hover:bg-surface-light text-text-primary border border-border px-5 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              Baixar Aplicativos
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 text-text-secondary">
            <span className="text-xs font-medium">Perfil Ativo</span>
            <Users className="w-4 h-4 text-accent" />
          </div>
          <div className="text-xl font-bold text-text-primary truncate">
            {activeProfile?.name || "Principal"}
          </div>
          <div className="text-[11px] text-text-secondary mt-1">
            {profiles.length} {profiles.length === 1 ? "perfil cadastrado" : "perfis cadastrados"}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 text-text-secondary">
            <span className="text-xs font-medium">Em Progresso</span>
            <PlaySquare className="w-4 h-4 text-accent" />
          </div>
          <div className="text-xl font-bold text-text-primary">
            {continueWatching.length}
          </div>
          <div className="text-[11px] text-text-secondary mt-1">Itens em andamento</div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 text-text-secondary">
            <span className="text-xs font-medium">Favoritos</span>
            <Bookmark className="w-4 h-4 text-accent" />
          </div>
          <div className="text-xl font-bold text-text-primary">
            {favorites.length}
          </div>
          <div className="text-[11px] text-text-secondary mt-1">Na sua biblioteca</div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 text-text-secondary">
            <span className="text-xs font-medium">Sincronização</span>
            <CheckCircle2 className="w-4 h-4 text-success" />
          </div>
          <div className="text-xl font-bold text-text-primary">Vortex Sync</div>
          <div className="text-[11px] text-success mt-1">Nativo em tempo real</div>
        </div>
      </div>

      {/* Continue Watching Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-text-primary">Continuar Assistindo</h2>
            <p className="text-xs text-text-secondary">Progresso recente sincronizado no perfil ativo</p>
          </div>
          <Link
            href="/app/continuar"
            className="text-xs text-accent hover:underline flex items-center gap-1 font-medium"
          >
            Ver todos
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 bg-surface rounded-2xl border border-border flex items-center justify-center text-text-secondary text-xs">
            <Loader2 className="w-5 h-5 animate-spin mr-2 text-accent" />
            Carregando progresso...
          </div>
        ) : continueWatching.length === 0 ? (
          <div className="p-8 bg-surface border border-border rounded-2xl text-center space-y-3">
            <Clock className="w-8 h-8 text-text-secondary mx-auto" />
            <div className="text-sm font-semibold text-text-primary">Nenhum item em andamento</div>
            <p className="text-xs text-text-secondary max-w-sm mx-auto">
              Quando você assistir filmes ou séries pelo app no celular ou TV, o progresso aparecerá aqui automaticamente.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {continueWatching.map((item) => {
              const pct = item.duration > 0 ? Math.min(100, Math.round((item.position / item.duration) * 100)) : 0;
              return (
                <div
                  key={item.id || item.progress_key}
                  className="bg-surface border border-border rounded-xl p-4 flex flex-col justify-between hover:border-accent/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-background px-2 py-0.5 rounded border border-border text-text-secondary">
                        {item.content_type === "series" ? "Série" : "Filme"}
                      </span>
                      {item.season && item.episode && (
                        <span className="text-[10px] text-accent font-mono">
                          T{item.season} E{item.episode}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-text-primary line-clamp-1 mb-3">
                      {item.content_id}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-border/50">
                    <div className="flex justify-between text-[11px] text-text-secondary">
                      <span>Progresso</span>
                      <span className="font-mono text-text-primary">{pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Favorites Preview Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-text-primary">Favoritos Recentes</h2>
            <p className="text-xs text-text-secondary">Títulos salvos na sua biblioteca Vortex</p>
          </div>
          <Link
            href="/app/favoritos"
            className="text-xs text-accent hover:underline flex items-center gap-1 font-medium"
          >
            Ver todos
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 bg-surface rounded-2xl border border-border flex items-center justify-center text-text-secondary text-xs">
            <Loader2 className="w-5 h-5 animate-spin mr-2 text-accent" />
            Carregando biblioteca...
          </div>
        ) : favorites.length === 0 ? (
          <div className="p-8 bg-surface border border-border rounded-2xl text-center space-y-3">
            <Bookmark className="w-8 h-8 text-text-secondary mx-auto" />
            <div className="text-sm font-semibold text-text-primary">Nenhum favorito ainda</div>
            <p className="text-xs text-text-secondary max-w-sm mx-auto">
              Adicione títulos aos favoritos pelo aplicativo mobile ou TV para acessá-los rapidamente por aqui.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="bg-surface border border-border rounded-xl overflow-hidden hover:border-accent/40 transition-colors flex flex-col group"
              >
                <div className="aspect-[2/3] bg-background relative overflow-hidden flex items-center justify-center">
                  {item.poster ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.poster}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Bookmark className="w-10 h-10 text-text-secondary/40" />
                  )}
                </div>
                <div className="p-3">
                  <div className="text-xs font-semibold text-text-primary line-clamp-1">{item.name}</div>
                  <div className="flex items-center justify-between text-[10px] text-text-secondary mt-1">
                    <span>{item.content_type === "series" ? "Série" : "Filme"}</span>
                    {item.imdb_rating && (
                      <span className="text-accent font-semibold">★ {item.imdb_rating.toFixed(1)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
