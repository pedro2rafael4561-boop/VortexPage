import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import clsx from "clsx"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"

const dmSans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://vortex-page.vercel.app"),
  title: "Vortex Cine | Painel da Conta e Aplicativos Oficiais",
  description:
    "Acesse o painel oficial da sua conta Vortex Cine, conecte sua Smart TV via QR Code ou código, gerencie perfis e baixe os aplicativos oficiais.",
  keywords: [
    "Vortex Cine",
    "painel de conta",
    "vincular tv",
    "tv login",
    "streaming",
    "filmes e series",
    "download apk",
    "android tv",
  ],
  authors: [{ name: "Vortex Cine" }],
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Vortex Cine | Painel Oficial",
    description: "Gerencie sua conta Vortex Cine, conecte sua TV e acesse seus conteúdos favoritos.",
    url: "https://vortex-page.vercel.app",
    siteName: "Vortex Cine",
    locale: "pt_BR",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={clsx(dmSans.className, "bg-carbon-950 text-white antialiased selection:bg-brand selection:text-white")}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
