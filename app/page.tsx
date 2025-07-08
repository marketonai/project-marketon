"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { ServiceCarousel } from "@/components/sections/service-carousel"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { AboutTeamSection } from "@/components/sections/about-team-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/layout/footer"
import { ChatBot } from "@/components/ui/chatbot"

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <ServiceCarousel />
        <PortfolioSection />
        <AboutTeamSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot isOpen={isChatOpen} onToggle={toggleChat} />
    </div>
  )
}
