"use client"
import { Banner } from "@/components/Banner"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { LogoTicker } from "@/components/LogoTicker"
import { Features } from "@/components/Features"
import { ProductShowcase } from "@/components/ProductShowcase"
import { DownloadSection } from "@/components/DownloadSection"
import { Updates } from "@/components/Updates"
import { FAQs } from "@/components/FAQs"
import { AboutSection } from "@/components/AboutSection"
import { Footer } from "@/components/Footer"
import { useTitleChanger } from "@/hooks/useTitleChanger"

export default function Home() {
  useTitleChanger({
    defaultTitle: "Vortex Cine | O Cinema Definitivo no Seu Dispositivo",
    blurTitle: "Sentimos sua falta! | Vortex Cine",
  })

  return (
    <div className="min-h-screen bg-carbon-950 text-white selection:bg-purple-600 selection:text-white">
      <Banner />
      <Navbar />
      <Hero />
      <LogoTicker />
      <Features />
      <ProductShowcase />
      <DownloadSection />
      <Updates />
      <FAQs />
      <AboutSection />
      <Footer />
    </div>
  )
}
