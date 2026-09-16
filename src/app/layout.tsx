import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import clsx from "clsx"
import "./globals.css"

const dmSans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://vortex-page.vercel.app"),
  title: "Vortex Cine | O Cinema Definitivo no Seu Dispositivo",
  description:
    "Site oficial do Vortex Cine. Baixe o aplicativo para Android e aproveite filmes, séries, animes e canais ao vivo com interface cinematográfica e múltiplos perfis.",
  keywords: [
    "Vortex Cine",
    "streaming",
    "filmes",
    "séries",
    "animes",
    "canais ao vivo",
    "download apk",
    "android",
  ],
  authors: [{ name: "@PRAFAEL0007" }, { name: "Vortex Company LTDA" }],
  icons: {
    icon: "/vortex-logo.png",
    apple: "/vortex-logo.png",
  },
  openGraph: {
    title: "Vortex Cine | Site Oficial",
    description:
      "Filmes, séries, animes e TV ao vivo em uma experiência cinematográfica incomparável.",
    url: "https://vortex-page.vercel.app",
    siteName: "Vortex Cine",
    images: [
      {
        url: "/vortex-logo.png",
        width: 512,
        height: 512,
        alt: "Vortex Cine Logo",
      },
    ],
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
      <body className={clsx(dmSans.className, "bg-carbon-950 text-white antialiased selection:bg-vortex-light selection:text-black")}>
        {children}
      </body>
    </html>
  )
}
