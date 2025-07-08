"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Send } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const footerLinks = {
  Services: [
    { name: "AI Content Marketing", href: "#services" },
    { name: "Marketing Automation", href: "#services" },
    { name: "Paid Media Management", href: "#services" },
    { name: "Marketing Analytics", href: "#services" },
    { name: "Social Media Marketing", href: "#services" },
    { name: "SEO & Digital Marketing", href: "#services" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about" },
    { name: "Case Studies", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "#contact" },
  ],
  Resources: [
    { name: "Marketing Guides", href: "/resources" },
    { name: "ROI Calculator", href: "/calculator" },
    { name: "Free Templates", href: "/templates" },
    { name: "Webinars", href: "/webinars" },
    { name: "API Documentation", href: "/docs" },
    { name: "Support Center", href: "/support" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR Compliance", href: "/gdpr" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const { toast } = useToast()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubscribing(true)

    try {
      // TODO: Integrate with backend/database
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      })

      setEmail("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 md:w-80 h-48 md:h-80 bg-yellow-400/3 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-12 md:py-16 border-b border-gray-800"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Stay Ahead of the Marketing Curve
            </h3>
            <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
              Get exclusive marketing insights, AI trends, and growth strategies delivered to your inbox weekly
            </p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20 rounded-full px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
                required
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-full px-6 md:px-8 py-2 md:py-3 font-bold text-sm md:text-base whitespace-nowrap"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </motion.form>

            <p className="text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
              Join 10,000+ marketers who trust our insights. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-black" />
                  </div>
                  <span className="text-2xl md:text-3xl font-bold group-hover:text-yellow-400 transition-colors">
                    Marketon AI
                  </span>
                </Link>

                <p className="text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  Transforming businesses through AI-powered marketing strategies. We help companies scale their growth
                  with data-driven solutions and cutting-edge automation.
                </p>

                {/* Contact Info */}
                <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 flex-shrink-0" />
                    <a
                      href="mailto:hello@marketonai.com"
                      className="text-gray-300 text-sm md:text-base hover:text-white transition-colors"
                    >
                      hello@marketonai.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 flex-shrink-0" />
                    <a
                      href="tel:+1-555-123-4567"
                      className="text-gray-300 text-sm md:text-base hover:text-white transition-colors"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-gray-300 text-sm md:text-base">
                      <p>123 Innovation Drive</p>
                      <p>San Francisco, CA 94105</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 md:gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        aria-label={social.name}
                        className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="lg:col-span-1"
              >
                <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-yellow-400">{category}</h4>
                <ul className="space-y-2 md:space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-6 md:py-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
              © 2024 Marketon AI. All rights reserved. Powered by artificial intelligence.
            </p>

            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-xs md:text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-yellow-400 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-yellow-400 transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-yellow-400 transition-colors">
                Cookies
              </Link>
              <Link href="/sitemap" className="text-gray-500 hover:text-yellow-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
