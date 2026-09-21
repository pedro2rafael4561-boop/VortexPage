"use client";

import { useState } from "react";
import { useAuth, Profile } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import {
  Users,
  Plus,
  Trash2,
  Check,
  Lock,
  Edit2,
  ShieldCheck,
  AlertCircle,
  Loader2,
  UserCheck,
} from "lucide-react";

const AVATAR_COLORS = [
  "#E50914", // Vortex Red
  "#2563EB", // Blue
  "#16A34A", // Green
  "#D97706", // Amber
  "#0D9488", // Teal
  "#DC2626", // Bright Red
  "#4F46E5", // Indigo
  "#E11D48", // Rose
];

export default function PerfisPage() {
  const { profiles, activeProfile, setActiveProfile, refreshProfiles } = useAuth();

  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#E50914");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const startCreate = () => {
    setIsCreating(true);
    setEditingProfile(null);
    setName("");
    setColor(AVATAR_COLORS[profiles.length % AVATAR_COLORS.length]);
    setPin("");
    setError(null);
    setSuccess(null);
  };

  const startEdit = (p: Profile) => {
    setEditingProfile(p);
    setIsCreating(false);
    setName(p.name);
    setColor(p.avatar_color_hex || "#E50914");
    setPin("");
    setError(null);
    setSuccess(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("O nome do perfil é obrigatório.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isCreating) {
        if (profiles.length >= 6) {
          setError("Limite máximo de 6 perfis atingido.");
          setLoading(false);
          return;
        }

        const existingIndices = new Set(profiles.map((p) => p.profile_index));
        let nextIndex = 1;
        for (let i = 1; i <= 6; i++) {
          if (!existingIndices.has(i)) {
            nextIndex = i;
            break;
          }
        }

        const newProfilesPayload = [
          ...profiles.map((p) => ({
            profile_index: p.profile_index,
            name: p.name,
            avatar_color_hex: p.avatar_color_hex,
            uses_primary_addons: false,
            uses_primary_plugins: false,
          })),
          {
            profile_index: nextIndex,
            name: name.trim(),
            avatar_color_hex: color,
            uses_primary_addons: false,
            uses_primary_plugins: false,
          },
        ];

        const { error: pushError } = await supabase.rpc("sync_push_profiles", {
          p_profiles: newProfilesPayload,
          p_client_max_profiles: 6,
          p_origin_client_id: "vortex-web-dashboard",
        });

        if (pushError) {
          throw pushError;
        }

        setSuccess("Perfil criado com sucesso!");
        setIsCreating(false);
      } else if (editingProfile) {
        const updatedPayload = profiles.map((p) => ({
          profile_index: p.profile_index,
          name: p.profile_index === editingProfile.profile_index ? name.trim() : p.name,
          avatar_color_hex:
            p.profile_index === editingProfile.profile_index ? color : p.avatar_color_hex,
          uses_primary_addons: false,
          uses_primary_plugins: false,
        }));

        const { error: pushError } = await supabase.rpc("sync_push_profiles", {
          p_profiles: updatedPayload,
          p_client_max_profiles: 6,
          p_origin_client_id: "vortex-web-dashboard",
        });

        if (pushError) {
          throw pushError;
        }

        // Handle PIN if provided
        if (pin && pin.length === 4) {
          await supabase.rpc("set_profile_pin", {
            p_profile_id: editingProfile.profile_index,
            p_pin: pin,
          });
        }

        setSuccess("Perfil atualizado com sucesso!");
        setEditingProfile(null);
      }

      await refreshProfiles();
    } catch (err: unknown) {
      const e = err as { message?: string };
      setError(e.message || "Erro ao salvar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (profileIndex: number) => {
    if (profiles.length <= 1) {
      setError("Você deve manter pelo menos um perfil ativo.");
      return;
    }

    if (!confirm("Tem certeza que deseja excluir este perfil? Todos os favoritos e progresso deste perfil serão removidos.")) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const remaining = profiles.filter((p) => p.profile_index !== profileIndex);
      const remainingPayload = remaining.map((p) => ({
        profile_index: p.profile_index,
        name: p.name,
        avatar_color_hex: p.avatar_color_hex,
        uses_primary_addons: false,
        uses_primary_plugins: false,
      }));

      await supabase.rpc("sync_delete_profile_data", {
        p_profile_id: profileIndex,
      });

      await supabase.rpc("sync_push_profiles", {
        p_profiles: remainingPayload,
        p_client_max_profiles: 6,
        p_origin_client_id: "vortex-web-dashboard",
      });

      if (activeProfile?.profile_index === profileIndex) {
        setActiveProfile(remaining[0] || null);
      }

      setSuccess("Perfil excluído com sucesso.");
      await refreshProfiles();
    } catch (err: unknown) {
      const e = err as { message?: string };
      setError(e.message || "Erro ao excluir perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Users className="w-6 h-6 text-accent" />
            Gerenciar Perfis
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Cada perfil possui sua própria lista de favoritos e histórico individual
          </p>
        </div>

        {profiles.length < 6 && !isCreating && !editingProfile && (
          <button
            onClick={startCreate}
            className="bg-accent hover:bg-accent-hover text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-accent/20"
          >
            <Plus className="w-4 h-4" />
            Adicionar Perfil
          </button>
        )}
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
          <div className="text-sm text-danger">{error}</div>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-success/10 border border-success/20 flex items-start gap-3">
          <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
          <div className="text-sm text-success">{success}</div>
        </div>
      )}

      {/* Form modal or card if creating/editing */}
      {(isCreating || editingProfile) && (
        <div className="bg-surface border border-accent/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <h2 className="text-lg font-bold text-text-primary mb-6">
            {isCreating ? "Novo Perfil" : `Editar Perfil: ${editingProfile?.name}`}
          </h2>

          <form onSubmit={handleSave} className="space-y-6 max-w-md">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                Nome do Perfil
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={24}
                placeholder="Ex: Sala de Estar, Pedro..."
                className="w-full bg-background border border-border focus:border-accent rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                Cor do Marcador
              </label>
              <div className="flex flex-wrap gap-3">
                {AVATAR_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-9 h-9 rounded-xl transition-transform ${
                      color === c ? "scale-110 ring-2 ring-white" : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                PIN de Bloqueio (4 dígitos - opcional)
              </label>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                placeholder="••••"
                className="w-32 bg-background border border-border focus:border-accent rounded-xl px-4 py-2.5 text-center font-mono tracking-widest text-base text-text-primary outline-none"
              />
              <span className="block text-[11px] text-text-secondary mt-1">
                Deixe em branco para manter sem PIN.
              </span>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-border/60">
              <button
                type="submit"
                disabled={loading}
                className="bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-accent/20 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {isCreating ? "Criar Perfil" : "Salvar Alterações"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingProfile(null);
                }}
                className="bg-background hover:bg-surface-light text-text-secondary hover:text-text-primary border border-border px-4 py-2.5 rounded-xl text-xs font-medium transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {profiles.map((p) => {
          const isActive = activeProfile?.id === p.id;
          return (
            <div
              key={p.id}
              className={`bg-surface border rounded-2xl p-6 flex flex-col justify-between transition-all ${
                isActive ? "border-accent shadow-lg shadow-accent/10" : "border-border hover:border-border/80"
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-md"
                    style={{ backgroundColor: p.avatar_color_hex || "#E50914" }}
                  >
                    {p.name[0]?.toUpperCase()}
                  </div>

                  {isActive && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-wider">
                      <UserCheck className="w-3 h-3" />
                      Ativo
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-text-primary mb-1 truncate">{p.name}</h3>
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <span>Slot #{p.profile_index}</span>
                  {p.pin_enabled && (
                    <span className="flex items-center gap-1 text-accent font-medium">
                      <Lock className="w-3 h-3" />
                      PIN ativo
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between">
                {!isActive ? (
                  <button
                    onClick={() => setActiveProfile(p)}
                    className="text-xs font-semibold text-text-primary hover:text-accent transition-colors"
                  >
                    Tornar Ativo
                  </button>
                ) : (
                  <span className="text-xs text-text-secondary font-medium">Perfil Selecionado</span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background transition-colors"
                    title="Editar perfil"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {profiles.length > 1 && (
                    <button
                      onClick={() => handleDelete(p.profile_index)}
                      className="p-2 rounded-lg text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors"
                      title="Excluir perfil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
