import { NextRequest, NextResponse } from "next/server"
import { authenticateXtreamAccount, getVortexSyncCredentials } from "@/lib/vortex-auth"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const username = (body.username || "").trim()
    const password = (body.password || "").trim()

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Informe o usuário e a senha." },
        { status: 400 }
      )
    }

    const authResult = await authenticateXtreamAccount(username, password)

    if (!authResult.success) {
      return NextResponse.json(
        { success: false, message: authResult.message || "Usuário ou senha incorretos." },
        { status: 401 }
      )
    }

    const syncCreds = getVortexSyncCredentials(username)

    return NextResponse.json({
      success: true,
      username,
      syncEmail: syncCreds.syncEmail,
      syncPassword: syncCreds.syncPassword,
      serverUrl: authResult.serverUrl,
      userInfo: authResult.userInfo,
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Erro interno ao processar autenticação." },
      { status: 500 }
    )
  }
}
