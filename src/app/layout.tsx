import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import clsx from "clsx"
import "./globals.css"

const dmSans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "VortexPage | Vortex Cine",
	description: "VortexPage - O streaming inteligente para seus filmes, séries e canais.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body className={clsx(dmSans.className, "antialiased")}>{children}</body>
		</html>
	)
}
