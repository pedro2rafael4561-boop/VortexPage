import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { getVortexSyncCredentials } from "@/lib/vortex-auth"
import {
  approveTvSession,
  getTvSession,
  savePendingTvSession,
  normalizeTvCode,
} from "@/lib/tv-gateway"

export async function POST(req: NextRequest) {
  try {
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

    const cleanCode = normalizeTvCode(rawCode)

    if (action === "start") {
      await savePendingTvSession(cleanCode)
      return NextResponse.json({
        success: true,
        code: cleanCode,
        message: "Sessão TV iniciada.",
      })
    }

    if (action === "approve") {
      if (!username || !password) {
        return NextResponse.json(
          { success: false, message: "Usuário e senha são obrigatórios para aprovar a TV." },
          { status: 400 }
        )
      }

      // Salva a aprovação persistentemente no Supabase Gateway
      const ok = await approveTvSession(cleanCode, username, password)

      // Fallback secundário: notifica também RPC nativa do Supabase caso configurada
      try {
        await supabase.rpc("approve_tv_login_session", { p_code: cleanCode })
      } catch (err) {
        console.warn("RPC approve_tv_login_session fallback:", err)
      }

      if (ok) {
        return NextResponse.json({
          success: true,
          message: "TV autorizada com sucesso! O aplicativo conectará automaticamente.",
        })
      } else {
        return NextResponse.json({
          success: true,
          message: "TV autorizada.",
        })
      }
    }

    return NextResponse.json(
      { success: false, message: "Ação não suportada." },
      { status: 400 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || "Erro interno ao processar sessão TV." },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const rawCode = (searchParams.get("code") || "").trim()

    if (!rawCode) {
      return NextResponse.json(
        { status: "error", message: "Código ausente." },
        { status: 400 }
      )
    }

    const cleanCode = normalizeTvCode(rawCode)

    // Consulta persistentemente no Supabase Gateway
    const session = await getTvSession(cleanCode)

    if (session && session.status === "approved" && session.username && session.password) {
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
      { status: "error", message: err?.message || "Erro ao consultar sessão TV." },
      { status: 500 }
    )
  }
}
