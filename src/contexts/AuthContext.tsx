"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { getVortexSyncCredentials } from "@/lib/vortex-auth"

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
  xtreamUsername: string | null
  lastAccountUsername: string | null
  isLoading: boolean
  loading: boolean
  profiles: Profile[]
  activeProfile: Profile | null
  setActiveProfile: (profile: Profile) => void
  refreshProfiles: () => Promise<void>
  loginWithXtream: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  continueWithLastAccount: () => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  xtreamUsername: null,
  lastAccountUsername: null,
  isLoading: true,
  loading: true,
  profiles: [],
  activeProfile: null,
  setActiveProfile: () => {},
  refreshProfiles: async () => {},
  loginWithXtream: async () => ({ success: false }),
  continueWithLastAccount: async () => ({ success: false }),
  signOut: async () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [xtreamUsername, setXtreamUsername] = useState<string | null>(null)
  const [lastAccountUsername, setLastAccountUsername] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [activeProfile, setActiveProfileState] = useState<Profile | null>(null)

  // Carrega credenciais salvas do localStorage na inicialização
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLast = localStorage.getItem("vortex_last_account") || localStorage.getItem("vortex_user")
      if (savedLast) setLastAccountUsername(savedLast)
      const current = localStorage.getItem("vortex_user")
      if (current) setXtreamUsername(current)
    }
  }, [])

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
        // Cria perfil primário padrão com tema Vortex Violet
        const defaultProfile = {
          user_id: userId,
          profile_index: 1,
          profile_id: 1,
          name: "Principal",
          avatar_color_hex: "#7C3AED",
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

  const loginWithXtream = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanUser = username.trim()
    const cleanPass = password.trim()

    if (!cleanUser || !cleanPass) {
      return { success: false, error: "Informe o usuário e a senha." }
    }

    try {
      // 1. Chama a rota de autenticação Xtream no servidor
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cleanUser, password: cleanPass }),
      })

      const result = await res.json()
      if (!result.success) {
        return { success: false, error: result.message || "Usuário ou senha incorretos." }
      }

      // 2. Conecta ao Supabase com as credenciais determinísticas do ecossistema Vortex
      const { syncEmail, syncPassword } = getVortexSyncCredentials(cleanUser)

      let activeSession: Session | null = null
      let activeUser: User | null = null

      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: syncEmail,
        password: syncPassword,
      })

      if (!signInError && signInData.session) {
        activeSession = signInData.session
        activeUser = signInData.user
      } else {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: syncEmail,
          password: syncPassword,
        })

        if (!signUpError && signUpData.session) {
          activeSession = signUpData.session
          activeUser = signUpData.user
        } else if (signUpError && !signUpData.session) {
          return { success: false, error: "Falha na sincronização da conta Vortex." }
        }
      }

      if (activeSession && activeUser) {
        setSession(activeSession)
        setUser(activeUser)
        setXtreamUsername(cleanUser)
        setLastAccountUsername(cleanUser)

        if (typeof window !== "undefined") {
          localStorage.setItem("vortex_user", cleanUser)
          localStorage.setItem("vortex_pass", cleanPass)
          localStorage.setItem("vortex_last_account", cleanUser)
        }

        await fetchProfiles(activeUser.id)
        return { success: true }
      }

      return { success: false, error: "Sessão não pôde ser estabelecida." }
    } catch (e: any) {
      return { success: false, error: e.message || "Erro ao conectar ao servidor Vortex." }
    }
  }

  const continueWithLastAccount = async (): Promise<{ success: boolean; error?: string }> => {
    if (typeof window === "undefined") return { success: false, error: "Ambiente inválido" }
    const savedUser = localStorage.getItem("vortex_user") || localStorage.getItem("vortex_last_account")
    const savedPass = localStorage.getItem("vortex_pass")

    if (savedUser && savedPass) {
      return await loginWithXtream(savedUser, savedPass)
    }

    return { success: false, error: "Nenhuma credencial salva encontrada." }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setXtreamUsername(null)
    setProfiles([])
    setActiveProfileState(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("vortex_user")
      localStorage.removeItem("vortex_pass")
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

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        xtreamUsername,
        lastAccountUsername,
        isLoading,
        loading: isLoading,
        profiles,
        activeProfile,
        setActiveProfile,
        refreshProfiles,
        loginWithXtream,
        continueWithLastAccount,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
