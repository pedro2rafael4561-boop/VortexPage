import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { authenticateXtreamAccount, getVortexSyncCredentials } from "@/lib/vortex-auth"

// Armazenamento em memória para sessões de pareamento TV ativas
// Mantém as credenciais disponíveis para a TV pelo período de validade (15 minutos)
type TvSessionRecord = {
  username: string
  password: string
  timestamp: number
}

const g = globalThis as unknown as { _vortexTvSessions?: Map<string, TvSessionRecord> }
if (!g._vortexTvSessions) {
  g._vortexTvSessions = new Map<string, TvSessionRecord>()
}
const tvSessions = g._vortexTvSessions

function cleanExpiredSessions() {
  const now = Date.now()
  const TTL = 15 * 60 * 1000 // 15 minutos
  for (const [key, value] of tvSessions.entries()) {
    if (now - value.timestamp > TTL) {
      tvSessions.delete(key)
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    cleanExpiredSessions()
    const body = await req.json()
    const action = body.action || "approve"
    const rawCode = (body.code || "").trim()
    const username = (body.username || "").trim()
    const password = (body.password || "").trim()

    if (!rawCode) {
      return NextResponse.json(
        { success: false, message: "Código de pareamento não fornecido." },
        { status: 400 }
      )
    }

    if (action === "approve") {
      if (!username || !password) {
        return NextResponse.json(
          { success: false, message: "Usuário e senha são obrigatórios para aprovar a TV." },
          { status: 400 }
        )
      }

      // 1. Salva a aprovação em memória para a TV consumir
      const sessionData: TvSessionRecord = {
        username,
        password,
        timestamp: Date.now(),
      }

      const lowerCode = rawCode.toLowerCase()
      const upperCode = rawCode.toUpperCase()
      tvSessions.set(lowerCode, sessionData)
      tvSessions.set(upperCode, sessionData)

      // 2. Notifica o Supabase chamando approve_tv_login_session se possível
      try {
        await supabase.rpc("approve_tv_login_session", { p_code: lowerCode })
      } catch (err) {
        console.warn("RPC approve_tv_login_session fallback:", err)
      }

      return NextResponse.json({
        success: true,
        message: "TV autorizada com sucesso! O aplicativo conectará automaticamente.",
      })
    }

    return NextResponse.json(
      { success: false, message: "Ação não suportada." },
      { status: 400 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Erro interno ao processar sessão TV." },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    cleanExpiredSessions()
    const { searchParams } = new URL(req.url)
    const rawCode = (searchParams.get("code") || "").trim()

    if (!rawCode) {
      return NextResponse.json(
        { status: "error", message: "Código ausente." },
        { status: 400 }
      )
    }

    const session = tvSessions.get(rawCode.toLowerCase()) || tvSessions.get(rawCode.toUpperCase())

    if (session) {
      const syncCreds = getVortexSyncCredentials(session.username)
      return NextResponse.json({
        status: "approved",
        username: session.username,
        password: session.password,
        syncEmail: syncCreds.syncEmail,
        syncPassword: syncCreds.syncPassword,
      })
    }

    return NextResponse.json({
      status: "pending",
      message: "Aguardando aprovação do usuário.",
    })
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message || "Erro ao consultar sessão TV." },
      { status: 500 }
    )
  }
}
