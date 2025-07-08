"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"
import Link from "next/link"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md border-b border-yellow-400/20 shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-black" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
              Marketon AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className="text-white hover:text-yellow-400 hover:bg-yellow-400/10 px-4 xl:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm xl:text-base"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link href="#contact">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-4 xl:px-6 py-2 xl:py-3 rounded-full font-bold shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 text-sm xl:text-base">
                Get Free Strategy Call
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden bg-white/10 backdrop-blur-sm text-white hover:bg-yellow-400 hover:text-black border border-white/20 hover:border-yellow-400 rounded-full w-10 h-10 md:w-12 md:h-12 p-0"
          >
            {isOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-md border-t border-yellow-400/20"
          >
            <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
              <div className="flex flex-col gap-2 md:gap-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={item.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white hover:text-yellow-400 hover:bg-yellow-400/10 px-4 py-3 md:py-4 rounded-xl font-medium transition-all duration-300 text-base md:text-lg"
                      >
                        {item.name}
                      </Button>
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-3 md:pt-4 border-t border-white/10"
                >
                  <Link href="#contact" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 py-3 md:py-4 rounded-xl font-bold shadow-lg text-base md:text-lg">
                      Get Free Strategy Call
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
