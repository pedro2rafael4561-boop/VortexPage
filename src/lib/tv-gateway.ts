const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xnxignjmejymlhtlpuxn.supabase.co"
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueGlnbmptZWp5bWxodGxwdXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1MjQxMTYsImV4cCI6MjEwNTEwMDExNn0.iYaNsS0Sd8QeODef7LDTA4kYF9zzRhBF0cP-bnG4gj4"

export const GATEWAY_EMAIL = "vortex_pair_gateway@gmail.com"
export const GATEWAY_PASSWORD = "VxPair#Gateway2026!"

interface GatewayAuth {
  token: string
  userId: string
  expiresAt: number
}

let cachedAuth: GatewayAuth | null = null

export async function getGatewayAuth(): Promise<{ token: string; userId: string }> {
  const now = Date.now()
  if (cachedAuth && cachedAuth.expiresAt > now + 60000) {
    return { token: cachedAuth.token, userId: cachedAuth.userId }
  }

  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: GATEWAY_EMAIL,
      password: GATEWAY_PASSWORD,
    }),
  })

  if (!res.ok) {
    throw new Error(`Gateway auth failed: ${res.statusText}`)
  }

  const data = await res.json()
  const token = data.access_token as string
  const userId = (data.user?.id || "") as string
  const expiresIn = (data.expires_in || 3600) as number

  cachedAuth = {
    token,
    userId,
    expiresAt: now + expiresIn * 1000,
  }

  return { token, userId }
}

export function normalizeTvCode(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9]/g, "").trim().toLowerCase()
}

export async function savePendingTvSession(rawCode: string): Promise<boolean> {
  const code = normalizeTvCode(rawCode)
  if (!code) return false

  try {
    const { token, userId } = await getGatewayAuth()

    const body = {
      user_id: userId,
      profile_id: 1,
      platform: "tv",
      settings_json: {
        code,
        status: "pending",
        created_at: Date.now(),
      },
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/profile_settings_blobs`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(body),
    })

    return res.ok
  } catch (err) {
    console.warn("savePendingTvSession error:", err)
    return false
  }
}

export async function approveTvSession(
  rawCode: string,
  username: string,
  password: string
): Promise<boolean> {
  const code = normalizeTvCode(rawCode)
  if (!code) return false

  try {
    const { token, userId } = await getGatewayAuth()

    // 1. Busca se já existe uma sessão para este código
    const queryUrl = `${SUPABASE_URL}/rest/v1/profile_settings_blobs?select=id,settings_json&platform=eq.tv&settings_json->>code=eq.${encodeURIComponent(
      code
    )}`

    const findRes = await fetch(queryUrl, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${token}`,
      },
    })

    const rows = findRes.ok ? await findRes.json() : []

    const approvedPayload = {
      code,
      status: "approved",
      username,
      password,
      approved_at: Date.now(),
    }

    if (Array.isArray(rows) && rows.length > 0) {
      // Atualiza o registro existente
      const rowId = rows[0].id
      const updateRes = await fetch(
        `${SUPABASE_URL}/rest/v1/profile_settings_blobs?id=eq.${rowId}`,
        {
          method: "PATCH",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify({ settings_json: approvedPayload }),
        }
      )
      return updateRes.ok
    } else {
      // Cria novo registro aprovado
      const createRes = await fetch(`${SUPABASE_URL}/rest/v1/profile_settings_blobs`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          user_id: userId,
          profile_id: 1,
          platform: "tv",
          settings_json: approvedPayload,
        }),
      })
      return createRes.ok
    }
  } catch (err) {
    console.warn("approveTvSession error:", err)
    return false
  }
}

export async function getTvSession(rawCode: string): Promise<{
  status: string
  username?: string
  password?: string
} | null> {
  const code = normalizeTvCode(rawCode)
  if (!code) return null

  try {
    const { token } = await getGatewayAuth()

    const queryUrl = `${SUPABASE_URL}/rest/v1/profile_settings_blobs?select=id,settings_json&platform=eq.tv&settings_json->>code=eq.${encodeURIComponent(
      code
    )}&order=created_at.desc&limit=1`

    const res = await fetch(queryUrl, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) return null
    const rows = await res.json()

    if (Array.isArray(rows) && rows.length > 0) {
      const s = rows[0].settings_json
      return {
        status: s?.status || "pending",
        username: s?.username,
        password: s?.password,
      }
    }

    return null
  } catch (err) {
    console.warn("getTvSession error:", err)
    return null
  }
}
