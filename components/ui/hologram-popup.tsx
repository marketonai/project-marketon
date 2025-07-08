"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { LoadingSpinner } from "./loading-spinner"

interface HologramPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: React.ReactNode
}

export function HologramPopup({ isOpen, onClose, title, content }: HologramPopupProps) {
  const [isLoading, setIsLoading] = useState(true)

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

          {/* Main hologram container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full h-full max-w-7xl mx-auto p-8 overflow-hidden"
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <>
                {/* Holographic frame effects */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 border border-yellow-400/30" />
                  <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/10 to-transparent" />
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 z-10"
                >
                  <X size={24} />
                </button>

                {/* Content container with scroll */}
                <div className="relative h-full overflow-y-auto">
                  <div className="space-y-8">
                    {/* Title with holographic effect */}
                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-4xl md:text-5xl font-bold text-yellow-400 text-center mb-8"
                    >
                      {title}
                    </motion.h2>

                    {/* Main content */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-white space-y-6"
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
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear"
                  }}
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
                />
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
