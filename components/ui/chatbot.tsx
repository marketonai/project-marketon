"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const quickQuestions = [
  "What services do you offer?",
  "How much does marketing automation cost?",
  "Can you help increase my ROI?",
  "Do you work with small businesses?",
  "How long does implementation take?",
  "What makes your AI different?",
]

const botResponses = {
  "what services do you offer?": {
    text: "We offer comprehensive AI-powered marketing services including:\n\n• AI Content Marketing\n• Marketing Automation\n• Paid Media Management\n• Marketing Analytics\n• Social Media Marketing\n• SEO & Digital Marketing\n\nWould you like to know more about any specific service?",
    followUp: ["Tell me about marketing automation", "What's included in paid media?", "How does AI content work?"],
  },
  "how much does marketing automation cost?": {
    text: "Our Marketing Automation starts at $899/month and includes:\n\n• Lead scoring & qualification\n• Personalized email sequences\n• Behavioral trigger campaigns\n• A/B testing optimization\n• ROI tracking & reporting\n\nWe offer flexible pricing based on your business size and needs. Would you like a custom quote?",
    followUp: ["Get custom quote", "What's the ROI?", "Do you have smaller packages?"],
  },
  "can you help increase my roi?": {
    text: "Our clients typically see:\n\n• 150-450% increase in marketing ROI\n• 45% reduction in cost per acquisition\n• 200%+ improvement in ROAS\n• 35% increase in customer retention\n\nWe use AI-powered analytics to optimize every aspect of your marketing funnel. Want to see how we can help your specific business?",
    followUp: ["Schedule strategy call", "View case studies", "How do you measure ROI?"],
  },
  "do you work with small businesses?": {
    text: "Yes! We work with businesses of all sizes, from startups to enterprise companies. Our AI-powered solutions are scalable and can be customized for:\n\n• Small businesses ($10K+ monthly revenue)\n• Mid-market companies\n• Enterprise organizations\n\nWe have flexible packages starting at $799/month. What size is your business?",
    followUp: ["I'm a startup", "We're mid-market", "Tell me about enterprise solutions"],
  },
  "how long does implementation take?": {
    text: "Implementation timelines vary by service:\n\n• Social Media Marketing: 1-2 weeks\n• Marketing Automation: 3-4 weeks\n• Paid Media Management: 1-2 weeks\n• SEO & Content Marketing: 2-4 weeks\n• Full Marketing Stack: 4-6 weeks\n\nWe provide dedicated project management and regular updates throughout the process. Which service interests you most?",
    followUp: ["I need everything", "Just automation", "Focus on paid ads"],
  },
  "what makes your ai different?": {
    text: "Our AI is specifically trained for marketing optimization:\n\n• Predictive customer behavior modeling\n• Real-time campaign optimization\n• Cross-channel attribution analysis\n• Automated A/B testing at scale\n• Industry-specific performance benchmarks\n\nUnlike generic AI tools, ours is built exclusively for marketing ROI. Want to see it in action?",
    followUp: ["Schedule demo", "View case studies", "Compare with competitors"],
  },
  default: {
    text: "Thanks for your question! I'd love to help you learn more about how our AI-powered marketing solutions can grow your business.\n\nFor detailed answers and personalized recommendations, I'd recommend scheduling a free strategy call with our team. We can discuss your specific needs and show you exactly how we can help.\n\nWould you like me to set that up for you?",
    followUp: ["Schedule strategy call", "View our services", "See case studies"],
  },
}

interface ChatBotProps {
  isOpen: boolean
  onToggle: () => void
}

export function ChatBot({ isOpen, onToggle }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your AI marketing assistant. I can help you learn about our services, pricing, and how we can grow your business. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response delay
    setTimeout(
      () => {
        const normalizedText = text.toLowerCase().trim()
        const response = Object.keys(botResponses).find((key) => normalizedText.includes(key.toLowerCase()))

        const botResponse = response ? botResponses[response as keyof typeof botResponses] : botResponses.default

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse.text,
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={onToggle}
        className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-full shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chatbot Window - Smaller Size */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-16 md:bottom-20 right-4 md:right-6 z-50 w-72 sm:w-80 h-96 md:h-[450px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header - Smaller */}
            <div className="bg-gradient-to-r from-black to-gray-900 text-white p-3 md:p-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 md:w-5 md:h-5 text-black" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm md:text-base">Marketing AI Assistant</h3>
                <p className="text-gray-300 text-xs">Online • Powered by Marketon AI</p>
              </div>
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 animate-pulse" />
              <button onClick={onToggle} className="text-gray-300 hover:text-white transition-colors">
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Messages - Smaller */}
            <div className="flex-1 overflow-y-auto p-2 md:p-3 space-y-2 md:space-y-3 h-[240px] md:h-[280px] custom-scrollbar">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <div className="w-6 h-6 md:w-7 md:h-7 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-3 h-3 md:w-4 md:h-4 text-black" />
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] p-2 md:p-3 rounded-xl text-xs md:text-sm leading-relaxed ${
                      message.sender === "user" ? "bg-yellow-400 text-black ml-auto" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="whitespace-pre-line">{message.text}</div>
                    <div className={`text-xs mt-1 ${message.sender === "user" ? "text-black/70" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>

                  {message.sender === "user" && (
                    <div className="w-6 h-6 md:w-7 md:h-7 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                  <div className="w-6 h-6 md:w-7 md:h-7 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 md:w-4 md:h-4 text-black" />
                  </div>
                  <div className="bg-gray-100 p-2 md:p-3 rounded-xl">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.3, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.6, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions - Smaller */}
            {messages.length === 1 && (
              <div className="p-2 md:p-3 border-t border-gray-200 bg-gray-50">
                <p className="text-xs text-gray-600 mb-2 font-medium">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.slice(0, 2).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs bg-white border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 px-2 py-1 rounded-full transition-all duration-200 text-gray-700 hover:text-gray-900"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input - Smaller */}
            <div className="p-2 md:p-3 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                  placeholder="Ask me anything..."
                  className="flex-1 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400/20 rounded-full px-3 py-2 text-xs md:text-sm"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-full w-8 h-8 md:w-10 md:h-10 p-0 flex-shrink-0"
                >
                  <Send className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
