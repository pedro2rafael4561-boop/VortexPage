"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Bookmark, Star, Trash2, Loader2, Film, Tv, AlertCircle } from "lucide-react";

interface LibraryItem {
  id: string;
  content_id: string;
  content_type: string;
  name: string;
  poster?: string;
  description?: string;
  release_info?: string;
  imdb_rating?: number;
  genres?: string[];
  added_at: number;
}

export default function FavoritosPage() {
  const { activeProfile } = useAuth();
  const [favorites, setFavorites] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFavorites() {
      if (!activeProfile) return;
      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from("library_items")
          .select("*")
          .eq("profile_id", activeProfile.profile_index)
          .order("added_at", { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        if (data) {
          setFavorites(data as LibraryItem[]);
        }
      } catch (err: unknown) {
        const e = err as { message?: string };
        setError(e.message || "Erro ao carregar favoritos.");
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [activeProfile]);

  const handleRemove = async (item: LibraryItem) => {
    try {
      await supabase
        .from("library_items")
        .delete()
        .eq("id", item.id);

      setFavorites((prev) => prev.filter((f) => f.id !== item.id));
    } catch {
      alert("Erro ao remover dos favoritos.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-accent" />
          Minha Biblioteca de Favoritos
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Filmes e séries salvos para assistir no perfil <strong className="text-text-primary">{activeProfile?.name}</strong>
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
          <span className="text-sm">Carregando seus títulos favoritos...</span>
        </div>
      ) : favorites.length === 0 ? (
        <div className="p-16 bg-surface border border-border rounded-2xl text-center space-y-4">
          <Bookmark className="w-12 h-12 text-text-secondary/50 mx-auto" />
          <h2 className="text-lg font-bold text-text-primary">Nenhum título favoritado</h2>
          <p className="text-sm text-text-secondary max-w-md mx-auto">
            Quando encontrar um filme ou série que gosta no aplicativo Vortex Cine, clique no ícone de favoritos para guardar nesta lista.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-all shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[2/3] bg-background relative overflow-hidden flex items-center justify-center">
                  {item.poster ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.poster}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Bookmark className="w-10 h-10 text-text-secondary/30" />
                  )}

                  <div className="absolute top-2.5 right-2.5">
                    <button
                      onClick={() => handleRemove(item)}
                      title="Remover dos favoritos"
                      className="p-1.5 rounded-lg bg-black/70 hover:bg-danger text-white transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-3.5">
                  <h3 className="text-xs sm:text-sm font-bold text-text-primary line-clamp-1 mb-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-text-secondary">
                    <span className="flex items-center gap-1">
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
                    {item.imdb_rating && (
                      <span className="flex items-center gap-1 text-accent font-semibold">
                        <Star className="w-3 h-3 fill-accent" />
                        {item.imdb_rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                  {item.release_info && (
                    <div className="text-[10px] text-text-secondary/70 mt-1">{item.release_info}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
