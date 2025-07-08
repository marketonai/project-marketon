"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Brain } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 md:top-20 left-10 md:left-20 w-48 md:w-72 h-48 md:h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-64 md:w-96 h-64 md:h-96 bg-yellow-400/5 rounded-full blur-3xl floating" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-radial from-yellow-400/5 to-transparent rounded-full diagonal-move" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(250,204,21,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.03)_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/20 text-yellow-400 px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-semibold mb-6 md:mb-8"
          >
            <Sparkles className="w-3 md:w-4 h-3 md:h-4" />
            <span>AI-Powered Marketing Agency</span>
            <Sparkles className="w-3 md:w-4 h-3 md:h-4" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent block mb-2 md:mb-0">
              Scale Your Business
            </span>
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent block">
              with AI Marketing
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed px-4 md:px-0"
          >
            Drive measurable results with our data-driven marketing strategies powered by artificial intelligence.
            Increase ROI, automate workflows, and accelerate growth.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-4 md:px-0"
          >
            {[
              { icon: Brain, text: "Marketing Analytics" },
              { icon: Zap, text: "Automation" },
              { icon: Sparkles, text: "Content AI" },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-3 md:px-6 py-2 md:py-3 rounded-full"
                >
                  <Icon className="w-4 md:w-5 h-4 md:h-5 text-yellow-400" />
                  <span className="text-white font-medium text-sm md:text-base">{feature.text}</span>
                </div>
              )
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4 md:px-0"
          >
            <Link href="#services">
              <Button className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-500 text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-full font-bold inline-flex items-center justify-center gap-3 shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 group">
                <span>Get Free Strategy Call</span>
                <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="#portfolio">
              <Button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-2 border-white/20 hover:border-white/40 text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-full font-bold transition-all duration-300">
                View Case Studies
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-20 max-w-4xl mx-auto px-4 md:px-0"
          >
            {[
              { number: "450%", label: "Average ROI Increase" },
              { number: "200+", label: "Successful Campaigns" },
              { number: "98%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                <div className="text-gray-400 font-medium text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-5 md:w-6 h-8 md:h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 md:h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
