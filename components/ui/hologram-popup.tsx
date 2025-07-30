"use client"

import type React from "react"

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { X } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { LoadingSpinner } from "./loading-spinner"

interface HologramPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: React.ReactNode
}

// Robot Companion Component
function RobotCompanion() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15])

  const [currentMessage, setCurrentMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const [robotMood, setRobotMood] = useState<"exploring" | "thinking" | "excited" | "waving">("exploring")

  const messages = [
    "Let's explore this together! 🚀",
    "Interesting insights ahead! 🤔",
    "This is getting exciting! ⚡",
    "Great choice! Let's dive deeper! 🎯",
    "Almost there! Keep scrolling! 👆",
    "You're doing great! 🌟",
  ]

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      // Update robot mood based on scroll progress
      if (latest < 0.2) {
        setRobotMood("exploring")
        setCurrentMessage(messages[0])
      } else if (latest < 0.4) {
        setRobotMood("thinking")
        setCurrentMessage(messages[1])
      } else if (latest < 0.6) {
        setRobotMood("excited")
        setCurrentMessage(messages[2])
      } else if (latest < 0.8) {
        setRobotMood("thinking")
        setCurrentMessage(messages[3])
      } else if (latest < 0.95) {
        setRobotMood("excited")
        setCurrentMessage(messages[4])
      } else {
        setRobotMood("waving")
        setCurrentMessage(messages[5])
      }

      // Show message periodically
      if (Math.random() > 0.7) {
        setShowMessage(true)
        setTimeout(() => setShowMessage(false), 3000)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  const getRobotAnimation = () => {
    switch (robotMood) {
      case "exploring":
        return { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }
      case "thinking":
        return { rotate: [0, -10, 10, 0], y: [0, -5, 0] }
      case "excited":
        return { rotate: [0, 15, -15, 0], scale: [1, 1.1, 1], y: [0, -10, 0] }
      case "waving":
        return { rotate: [0, 20, -20, 20, 0], scale: [1, 1.15, 1] }
      default:
        return {}
    }
  }

  return (
    <motion.div
      className="fixed top-20 right-4 z-50 pointer-events-none"
      style={{ y, rotate }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            className="absolute -top-16 -left-32 bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-medium shadow-lg"
          >
            {currentMessage}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-400"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot */}
      <motion.div
        className="w-16 h-20 bg-gradient-to-b from-gray-800 to-black rounded-lg shadow-xl border-2 border-yellow-400/30 relative"
        animate={getRobotAnimation()}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        {/* Robot Head */}
        <div className="w-12 h-8 bg-gray-700 rounded-t-lg mx-auto relative">
          {/* Eyes */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          {/* Antenna */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-yellow-400 rounded-full"></div>
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        </div>

        {/* Robot Body */}
        <div className="w-full h-8 bg-gray-800 relative">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-yellow-400/50 rounded"></div>
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-yellow-400/30 rounded"></div>
        </div>

        {/* Robot Arms */}
        <div className="absolute top-8 -left-1 w-2 h-4 bg-gray-700 rounded animate-natural-wave"></div>
        <div className="absolute top-8 -right-1 w-2 h-4 bg-gray-700 rounded animate-natural-point"></div>

        {/* Robot Legs */}
        <div className="absolute -bottom-2 left-2 w-2 h-4 bg-gray-700 rounded-b"></div>
        <div className="absolute -bottom-2 right-2 w-2 h-4 bg-gray-700 rounded-b"></div>
      </motion.div>
    </motion.div>
  )
}

export function HologramPopup({ isOpen, onClose, title, content }: HologramPopupProps) {
  const [isLoading, setIsLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Holographic background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
          />

          {/* Robot Companion */}
          <RobotCompanion />

          {/* Main hologram container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full h-full max-w-7xl mx-auto p-4 md:p-8 overflow-hidden"
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <>
                {/* Holographic frame effects */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 border border-yellow-400/30 rounded-lg" />
                  <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/10 to-transparent rounded-lg" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.1),transparent_70%)] rounded-lg" />
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 z-10 p-2 rounded-full hover:bg-yellow-400/10 transition-all duration-300"
                >
                  <X size={24} />
                </button>

                {/* Content container with custom scroll */}
                <div
                  ref={scrollContainerRef}
                  className="relative h-full overflow-y-auto custom-scrollbar"
                  style={{ scrollBehavior: "smooth" }}
                >
                  <div className="space-y-8 pb-20">
                    {/* Title with holographic effect */}
                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 text-center mb-8 pt-8"
                    >
                      {title}
                    </motion.h2>

                    {/* Main content */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-white space-y-6 px-4 md:px-8"
                    >
                      {content}
                    </motion.div>
                  </div>
                </div>

                {/* Scanning line effect */}
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: "-100%" }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "linear",
                  }}
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent pointer-events-none"
                />

                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-yellow-400/50 pointer-events-none"></div>
                <div className="absolute top-4 right-16 w-8 h-8 border-r-2 border-t-2 border-yellow-400/50 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-yellow-400/50 pointer-events-none"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-yellow-400/50 pointer-events-none"></div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
