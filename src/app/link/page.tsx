import { Suspense } from "react"
import { Navbar } from "@/components/Navbar"
import { TvPairingCardContent } from "@/components/TvPairingCard"

export const metadata = {
  title: "Vincular Dispositivo TV | Vortex Cine",
  description: "Conecte sua Android TV ou TV Box à sua conta Vortex Cine usando o código exibido na tela.",
}

export default function LinkTvPage() {
  return (
    <div className="min-h-screen bg-carbon-950 text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16">
        <Suspense fallback={<div className="text-neutral-400">Carregando pareamento da TV...</div>}>
          <TvPairingCardContent />
        </Suspense>
      </main>
    </div>
  )
}
