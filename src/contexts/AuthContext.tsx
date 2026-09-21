"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

export interface Profile {
  id: string
  user_id: string
  profile_index: number
  profile_id: number
  name: string
  avatar_color_hex: string
  avatar_id?: string | null
  avatar_url?: string | null
  pin_enabled: boolean
}

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  loading: boolean
  profiles: Profile[]
  activeProfile: Profile | null
  setActiveProfile: (profile: Profile) => void
  refreshProfiles: () => Promise<void>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  loading: true,
  profiles: [],
  activeProfile: null,
  setActiveProfile: () => {},
  refreshProfiles: async () => {},
  signIn: async () => ({ error: null }),
  signOut: async () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [activeProfile, setActiveProfileState] = useState<Profile | null>(null)

  const fetchProfiles = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .order("profile_index", { ascending: true })

      if (error) {
        console.error("Erro ao carregar perfis:", error)
        return
      }

      if (data && data.length > 0) {
        setProfiles(data)
        const savedProfileId = typeof window !== "undefined" ? localStorage.getItem("vortex_active_profile_id") : null
        const matched = data.find((p) => p.id === savedProfileId) || data[0]
        setActiveProfileState(matched)
      } else {
        // Cria perfil primário padrão caso não exista
        const defaultProfile = {
          user_id: userId,
          profile_index: 1,
          profile_id: 1,
          name: "Principal",
          avatar_color_hex: "#E50914",
          pin_enabled: false,
        }
        const { data: created } = await supabase.from("profiles").insert(defaultProfile).select().single()
        if (created) {
          setProfiles([created])
          setActiveProfileState(created)
        }
      }
    } catch (e) {
      console.error("Exceção ao buscar perfis:", e)
    }
  }

  const setActiveProfile = (profile: Profile) => {
    setActiveProfileState(profile)
    if (typeof window !== "undefined") {
      localStorage.setItem("vortex_active_profile_id", profile.id)
    }
  }

  const refreshProfiles = async () => {
    if (user) {
      await fetchProfiles(user.id)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setProfiles([])
    setActiveProfileState(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("vortex_active_profile_id")
      window.location.href = "/"
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfiles(session.user.id).finally(() => setIsLoading(false))
      } else {
        setIsLoading(false)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfiles(session.user.id).finally(() => setIsLoading(false))
      } else {
        setProfiles([])
        setActiveProfileState(null)
        setIsLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        loading: isLoading,
        profiles,
        activeProfile,
        setActiveProfile,
        refreshProfiles,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
