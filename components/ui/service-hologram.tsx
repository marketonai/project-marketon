"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  X,
  Users,
  Target,
  BarChart3,
  CheckCircle,
  Zap,
  Award,
  Globe,
  Briefcase,
  Calendar,
  MessageSquare,
  Phone,
} from "lucide-react"

interface Service {
  id: number
  title: string
  description: string
  icon: any
  color: string
  bgColor: string
}

interface ServiceHologramProps {
  isOpen: boolean
  onClose: () => void
  service: Service | null
}

const serviceDetails = {
  1: {
    // AI Content Marketing
    pricing: "$1,299/month",
    timeline: "2-3 weeks",
    roi: "320%",
    successRate: "94%",
    clientsServed: "150+",
    overview: {
      description:
        "Transform your content strategy with AI-powered writing, SEO optimization, and brand voice consistency. Our advanced AI creates compelling content that converts visitors into customers while maintaining your unique brand identity.",
      keyFeatures: [
        "AI-powered content generation",
        "SEO optimization & keyword research",
        "Brand voice consistency",
        "Multi-platform content adaptation",
        "Performance analytics & optimization",
        "Content calendar management",
      ],
      industries: ["E-commerce", "SaaS", "Healthcare", "Finance", "Education", "Real Estate"],
      tools: ["GPT-4", "Jasper", "Surfer SEO", "Ahrefs", "SEMrush", "ContentKing"],
      deliverables: [
        "50+ blog posts per month",
        "Social media content calendar",
        "Email marketing sequences",
        "Landing page copy",
        "Product descriptions",
        "SEO-optimized articles",
      ],
      teamSize: "5-7 specialists",
    },
    caseStudies: [
      {
        title: "E-commerce Fashion Brand",
        description: "Increased organic traffic by 340% and conversion rate by 85%",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { traffic: "+340%", conversions: "+85%", revenue: "+220%" },
      },
      {
        title: "SaaS Platform",
        description: "Generated 500+ qualified leads through content marketing",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { leads: "+500", engagement: "+150%", trials: "+180%" },
      },
      {
        title: "Healthcare Clinic",
        description: "Established thought leadership and increased patient bookings by 120%",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { bookings: "+120%", authority: "+200%", retention: "+65%" },
      },
    ],
    process: [
      { step: 1, title: "Brand Analysis", description: "Deep dive into your brand voice and target audience" },
      { step: 2, title: "Content Strategy", description: "Develop comprehensive content roadmap and calendar" },
      { step: 3, title: "AI Implementation", description: "Set up AI tools and train models on your brand voice" },
      { step: 4, title: "Content Creation", description: "Generate high-quality, SEO-optimized content" },
      { step: 5, title: "Optimization", description: "Continuous improvement based on performance data" },
    ],
  },
  2: {
    // Marketing Automation
    pricing: "$899/month",
    timeline: "3-4 weeks",
    roi: "420%",
    successRate: "96%",
    clientsServed: "200+",
    overview: {
      description:
        "Streamline your marketing operations with intelligent automation workflows. Our advanced systems handle lead nurturing, email sequences, and customer journeys while you focus on growing your business.",
      keyFeatures: [
        "Lead scoring & qualification",
        "Automated email sequences",
        "Behavioral trigger campaigns",
        "CRM integration & management",
        "A/B testing optimization",
        "ROI tracking & reporting",
      ],
      industries: ["B2B SaaS", "E-commerce", "Real Estate", "Consulting", "Education", "Healthcare"],
      tools: ["HubSpot", "Marketo", "Pardot", "ActiveCampaign", "Zapier", "Segment"],
      deliverables: [
        "Complete automation setup",
        "Lead scoring system",
        "Email nurture sequences",
        "Landing page optimization",
        "CRM integration",
        "Performance dashboards",
      ],
      teamSize: "4-6 specialists",
    },
    caseStudies: [
      {
        title: "B2B SaaS Company",
        description: "Automated lead nurturing increased conversion rate by 280%",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { conversions: "+280%", efficiency: "+150%", cost: "-45%" },
      },
      {
        title: "Real Estate Agency",
        description: "Automated follow-up system generated $2M in additional revenue",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { revenue: "+$2M", leads: "+320%", closings: "+180%" },
      },
      {
        title: "Consulting Firm",
        description: "Reduced manual work by 70% while increasing lead quality by 200%",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { efficiency: "+70%", quality: "+200%", time: "-60%" },
      },
    ],
    process: [
      {
        step: 1,
        title: "Workflow Audit",
        description: "Analyze current processes and identify automation opportunities",
      },
      {
        step: 2,
        title: "System Setup",
        description: "Configure automation platforms and integrate with existing tools",
      },
      { step: 3, title: "Campaign Creation", description: "Build automated email sequences and nurture campaigns" },
      { step: 4, title: "Testing & Launch", description: "A/B test campaigns and launch automation workflows" },
      {
        step: 5,
        title: "Optimization",
        description: "Monitor performance and continuously optimize for better results",
      },
    ],
  },
  3: {
    // Paid Media Management
    pricing: "$1,599/month",
    timeline: "1-2 weeks",
    roi: "380%",
    successRate: "92%",
    clientsServed: "180+",
    overview: {
      description:
        "Maximize your advertising ROI with AI-optimized campaigns across all major platforms. Our data-driven approach ensures every dollar spent generates maximum returns through strategic targeting and continuous optimization.",
      keyFeatures: [
        "Multi-platform campaign management",
        "AI-powered bid optimization",
        "Advanced audience targeting",
        "Creative testing & optimization",
        "Real-time performance monitoring",
        "Cross-channel attribution",
      ],
      industries: ["E-commerce", "SaaS", "Local Business", "B2B", "Healthcare", "Finance"],
      tools: ["Google Ads", "Facebook Ads", "LinkedIn Ads", "Microsoft Ads", "TikTok Ads", "Optmyzr"],
      deliverables: [
        "Campaign setup & optimization",
        "Ad creative development",
        "Landing page optimization",
        "Audience research & targeting",
        "Performance reporting",
        "ROI analysis & insights",
      ],
      teamSize: "6-8 specialists",
    },
    caseStudies: [
      {
        title: "E-commerce Store",
        description: "Achieved 4.2x ROAS with strategic campaign optimization",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { roas: "4.2x", sales: "+250%", cpa: "-35%" },
      },
      {
        title: "SaaS Startup",
        description: "Generated 1,200+ qualified leads with 60% lower cost per acquisition",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { leads: "+1,200", cpa: "-60%", ltv: "+180%" },
      },
      {
        title: "Local Service Business",
        description: "Increased local bookings by 300% through targeted local campaigns",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { bookings: "+300%", reach: "+400%", calls: "+250%" },
      },
    ],
    process: [
      {
        step: 1,
        title: "Account Audit",
        description: "Comprehensive analysis of existing campaigns and opportunities",
      },
      {
        step: 2,
        title: "Strategy Development",
        description: "Create data-driven campaign strategy and targeting plan",
      },
      { step: 3, title: "Campaign Launch", description: "Set up optimized campaigns across selected platforms" },
      { step: 4, title: "Optimization", description: "Daily monitoring and optimization for maximum performance" },
      { step: 5, title: "Scaling", description: "Scale successful campaigns and expand to new opportunities" },
    ],
  },
  4: {
    // Marketing Analytics
    pricing: "$799/month",
    timeline: "2-3 weeks",
    roi: "290%",
    successRate: "98%",
    clientsServed: "120+",
    overview: {
      description:
        "Transform raw data into actionable marketing insights with advanced analytics and predictive modeling. Our comprehensive tracking and reporting systems help you make data-driven decisions that drive growth.",
      keyFeatures: [
        "Advanced tracking setup",
        "Custom dashboard creation",
        "Predictive analytics modeling",
        "Attribution analysis",
        "Performance forecasting",
        "Automated reporting",
      ],
      industries: ["E-commerce", "SaaS", "Media", "Finance", "Healthcare", "Education"],
      tools: ["Google Analytics 4", "Mixpanel", "Amplitude", "Tableau", "Looker", "Segment"],
      deliverables: [
        "Analytics implementation",
        "Custom tracking setup",
        "Performance dashboards",
        "Monthly reports",
        "Insights & recommendations",
        "Forecasting models",
      ],
      teamSize: "3-5 specialists",
    },
    caseStudies: [
      {
        title: "Media Company",
        description: "Improved content strategy with data insights, increasing engagement by 180%",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { engagement: "+180%", retention: "+120%", revenue: "+95%" },
      },
      {
        title: "E-commerce Platform",
        description: "Optimized conversion funnel, reducing cart abandonment by 45%",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { abandonment: "-45%", conversions: "+85%", revenue: "+130%" },
      },
      {
        title: "SaaS Company",
        description: "Identified key growth levers, resulting in 200% increase in user activation",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { activation: "+200%", retention: "+150%", expansion: "+80%" },
      },
    ],
    process: [
      { step: 1, title: "Data Audit", description: "Assess current tracking and identify data gaps" },
      { step: 2, title: "Implementation", description: "Set up comprehensive tracking and analytics tools" },
      { step: 3, title: "Dashboard Creation", description: "Build custom dashboards for key stakeholders" },
      { step: 4, title: "Analysis", description: "Generate insights and actionable recommendations" },
      { step: 5, title: "Optimization", description: "Continuous monitoring and strategy refinement" },
    ],
  },
  5: {
    // Social Media Marketing
    pricing: "$1,199/month",
    timeline: "1-2 weeks",
    roi: "350%",
    successRate: "89%",
    clientsServed: "250+",
    overview: {
      description:
        "Build engaged communities and drive brand awareness through strategic social media marketing. Our comprehensive approach combines viral content creation, influencer partnerships, and community management.",
      keyFeatures: [
        "Content creation & curation",
        "Community management",
        "Influencer partnerships",
        "Social media advertising",
        "Brand monitoring",
        "Engagement optimization",
      ],
      industries: ["Fashion", "Food & Beverage", "Lifestyle", "Technology", "Entertainment", "Fitness"],
      tools: ["Hootsuite", "Buffer", "Sprout Social", "Canva", "Later", "BuzzSumo"],
      deliverables: [
        "Content calendar",
        "Daily posting & engagement",
        "Influencer campaigns",
        "Social media ads",
        "Community growth",
        "Performance reports",
      ],
      teamSize: "4-6 specialists",
    },
    caseStudies: [
      {
        title: "Fashion Brand",
        description: "Grew Instagram following by 500% and increased sales by 280%",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { followers: "+500%", engagement: "+320%", sales: "+280%" },
      },
      {
        title: "Restaurant Chain",
        description: "Viral content campaign generated 2M+ impressions and 40% increase in foot traffic",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { impressions: "2M+", traffic: "+40%", orders: "+65%" },
      },
      {
        title: "Tech Startup",
        description: "Built thought leadership presence, resulting in 150+ qualified B2B leads",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { leads: "+150", authority: "+200%", partnerships: "+80%" },
      },
    ],
    process: [
      { step: 1, title: "Brand Analysis", description: "Understand brand voice and target audience preferences" },
      {
        step: 2,
        title: "Strategy Development",
        description: "Create comprehensive social media strategy and calendar",
      },
      { step: 3, title: "Content Creation", description: "Develop engaging content and visual assets" },
      { step: 4, title: "Community Building", description: "Grow and engage with your target audience" },
      { step: 5, title: "Optimization", description: "Analyze performance and optimize for better engagement" },
    ],
  },
  6: {
    // SEO & Digital Marketing
    pricing: "$999/month",
    timeline: "2-4 weeks",
    roi: "310%",
    successRate: "91%",
    clientsServed: "160+",
    overview: {
      description:
        "Dominate search results and increase organic visibility with comprehensive SEO strategies. Our technical expertise and content optimization drive sustainable long-term growth through search engines.",
      keyFeatures: [
        "Technical SEO optimization",
        "Keyword research & strategy",
        "Content optimization",
        "Link building campaigns",
        "Local SEO (if applicable)",
        "Performance monitoring",
      ],
      industries: ["E-commerce", "Local Business", "SaaS", "Healthcare", "Legal", "Real Estate"],
      tools: ["Ahrefs", "SEMrush", "Screaming Frog", "Google Search Console", "Moz", "BrightLocal"],
      deliverables: [
        "Technical SEO audit",
        "Keyword strategy",
        "On-page optimization",
        "Content recommendations",
        "Link building",
        "Monthly SEO reports",
      ],
      teamSize: "5-7 specialists",
    },
    caseStudies: [
      {
        title: "E-commerce Store",
        description: "Increased organic traffic by 400% and revenue by 250% in 8 months",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { traffic: "+400%", revenue: "+250%", rankings: "+300%" },
      },
      {
        title: "Local Service Business",
        description: "Achieved #1 rankings for 50+ local keywords, increasing calls by 180%",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { rankings: "50+ #1", calls: "+180%", bookings: "+220%" },
      },
      {
        title: "SaaS Platform",
        description: "Built domain authority from 20 to 65, generating 800+ organic leads monthly",
        image: "/placeholder.svg?height=200&width=300",
        metrics: { authority: "20→65", leads: "800+/mo", trials: "+150%" },
      },
    ],
    process: [
      {
        step: 1,
        title: "SEO Audit",
        description: "Comprehensive analysis of current SEO performance and opportunities",
      },
      { step: 2, title: "Strategy Planning", description: "Develop keyword strategy and optimization roadmap" },
      { step: 3, title: "Technical Optimization", description: "Fix technical issues and improve site performance" },
      { step: 4, title: "Content Optimization", description: "Optimize existing content and create new SEO content" },
      { step: 5, title: "Link Building", description: "Execute strategic link building campaigns for authority" },
    ],
  },
}

// Enhanced Robot Companion with scroll following
function RobotCompanion({ scrollY, maxScroll }: { scrollY: number; maxScroll: number }) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [robotMood, setRobotMood] = useState<"exploring" | "thinking" | "excited" | "waving">("exploring")

  const messages = [
    "Exploring our services! 🚀",
    "Need help choosing? 🤔",
    "Ready to get started? ⚡",
    "Questions? Just ask! 💬",
    "Almost at the end! 🎯",
    "Hope this helps! 👋",
  ]

  // Update robot mood and messages based on scroll position
  useEffect(() => {
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0

    if (scrollProgress < 0.2) {
      setRobotMood("exploring")
      setCurrentMessage(0)
    } else if (scrollProgress < 0.4) {
      setRobotMood("thinking")
      setCurrentMessage(1)
    } else if (scrollProgress < 0.6) {
      setRobotMood("excited")
      setCurrentMessage(2)
    } else if (scrollProgress < 0.8) {
      setRobotMood("thinking")
      setCurrentMessage(3)
    } else if (scrollProgress < 0.95) {
      setRobotMood("excited")
      setCurrentMessage(4)
    } else {
      setRobotMood("waving")
      setCurrentMessage(5)
    }
  }, [scrollY, maxScroll])

  // Show messages periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      }, 3000)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  // Calculate robot position based on scroll
  const scrollProgress = Math.min(scrollY / Math.max(maxScroll - 400, 1), 1)
  const robotY = scrollProgress * 0.3 // Gentle following
  const robotX = Math.sin(scrollY * 0.005) * 8 // Subtle side movement
  const robotRotation = Math.sin(scrollY * 0.008) * 3 // Gentle rotation

  return (
    <motion.div
      className="fixed top-20 right-6 z-40 pointer-events-none"
      animate={{
        y: robotY * 100,
        x: robotX,
        rotate: robotRotation,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6,
      }}
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="absolute -left-36 top-2 bg-white rounded-2xl p-3 shadow-xl border-2 border-yellow-200 max-w-32 z-10"
          >
            <p className="text-sm font-medium text-gray-800">{messages[currentMessage]}</p>
            <div className="absolute right-0 top-4 w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent transform translate-x-2" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot */}
      <motion.div
        className="w-16 h-20 bg-gradient-to-b from-gray-300 to-gray-400 rounded-2xl relative shadow-xl"
        animate={{
          y: robotMood === "excited" ? [0, -4, 0] : [0, -2, 0],
          scale: robotMood === "excited" ? [1, 1.05, 1] : [1, 1.02, 1],
        }}
        transition={{
          duration: robotMood === "excited" ? 2 : 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {/* Head */}
        <div className="w-12 h-12 bg-gradient-to-b from-gray-200 to-gray-300 rounded-xl absolute -top-4 left-2 shadow-md">
          <div className="flex justify-center items-center h-full gap-2">
            <motion.div
              className="w-2 h-2 bg-yellow-400 rounded-full"
              animate={{
                opacity: robotMood === "thinking" ? [0.5, 1, 0.5] : [0.8, 1, 0.8],
                scale: robotMood === "excited" ? [1, 1.2, 1] : [1, 1.1, 1],
              }}
              transition={{
                duration: robotMood === "thinking" ? 1 : 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            <motion.div
              className="w-2 h-2 bg-yellow-400 rounded-full"
              animate={{
                opacity: robotMood === "thinking" ? [0.5, 1, 0.5] : [0.8, 1, 0.8],
                scale: robotMood === "excited" ? [1, 1.2, 1] : [1, 1.1, 1],
              }}
              transition={{
                duration: robotMood === "thinking" ? 1 : 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.5,
              }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg absolute top-4 left-4 shadow-inner">
          <motion.div
            className="w-4 h-4 bg-yellow-600 rounded-full absolute top-2 left-2"
            animate={{
              scale: robotMood === "excited" ? [1, 1.3, 1] : [1, 1.1, 1],
              rotate: robotMood === "thinking" ? [0, 180, 360] : [0, 90, 0],
            }}
            transition={{
              duration: robotMood === "excited" ? 1.5 : 3,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        </div>

        {/* Arms with mood-based animations */}
        <motion.div
          className="w-3 h-10 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full absolute -left-4 top-6 origin-top shadow-md"
          animate={{
            rotate:
              robotMood === "waving"
                ? [0, -30, 30, 0]
                : robotMood === "excited"
                  ? [0, -15, 15, 0]
                  : robotMood === "thinking"
                    ? [0, -5, 5, 0]
                    : [0, -10, 10, 0],
          }}
          transition={{
            duration: robotMood === "waving" ? 1.5 : robotMood === "excited" ? 2 : robotMood === "thinking" ? 4 : 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="w-3 h-10 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full absolute -right-4 top-6 origin-top shadow-md"
          animate={{
            rotate:
              robotMood === "waving"
                ? [0, 30, -30, 0]
                : robotMood === "excited"
                  ? [0, 15, -15, 0]
                  : robotMood === "thinking"
                    ? [0, 5, -5, 0]
                    : [0, 10, -10, 0],
          }}
          transition={{
            duration: robotMood === "waving" ? 1.5 : robotMood === "excited" ? 2 : robotMood === "thinking" ? 4 : 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: robotMood === "waving" ? 0.75 : 1.5,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export function ServiceHologram({ isOpen, onClose, service }: ServiceHologramProps) {
  const [scrollY, setScrollY] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")
  const hologramRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleScroll = () => {
      if (hologramRef.current) {
        const scrollTop = hologramRef.current.scrollTop
        const scrollHeight = hologramRef.current.scrollHeight
        const clientHeight = hologramRef.current.clientHeight
        const maxScrollValue = scrollHeight - clientHeight

        setScrollY(scrollTop)
        setMaxScroll(maxScrollValue)
      }
    }

    const hologramElement = hologramRef.current
    if (hologramElement) {
      hologramElement.addEventListener("scroll", handleScroll)
      // Initial calculation
      handleScroll()

      return () => hologramElement.removeEventListener("scroll", handleScroll)
    }
  }, [isOpen])

  if (!service) return null

  const details = serviceDetails[service.id as keyof typeof serviceDetails]
  const Icon = service.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Robot Companion */}
          <RobotCompanion scrollY={scrollY} maxScroll={maxScroll} />

          {/* Hologram Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className={`relative p-6 md:p-8 bg-gradient-to-r ${service.color} text-white flex-shrink-0`}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 md:gap-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">{service.title}</h2>
                  <p className="text-white/90 text-base md:text-lg leading-relaxed">{service.description}</p>

                  {/* Key Metrics */}
                  <div className="flex flex-wrap gap-3 md:gap-4 mt-4 md:mt-6">
                    <div className="bg-white/20 rounded-xl px-3 py-2 md:px-4 md:py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm md:text-base font-semibold">{details?.pricing}</span>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-xl px-3 py-2 md:px-4 md:py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm md:text-base font-semibold">{details?.roi} ROI</span>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-xl px-3 py-2 md:px-4 md:py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm md:text-base font-semibold">{details?.successRate} Success</span>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-xl px-3 py-2 md:px-4 md:py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm md:text-base font-semibold">{details?.clientsServed} Clients</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div ref={hologramRef} className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-6 md:p-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 mb-6 md:mb-8">
                    <TabsTrigger
                      value="overview"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-yellow-400 data-[state=active]:bg-transparent"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="case-studies"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-yellow-400 data-[state=active]:bg-transparent"
                    >
                      Case Studies
                    </TabsTrigger>
                    <TabsTrigger
                      value="process"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-yellow-400 data-[state=active]:bg-transparent"
                    >
                      Process
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-0 space-y-6 md:space-y-8">
                    {/* Enhanced Overview Section */}
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-yellow-500" />
                            Service Overview
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-600 leading-relaxed">{details?.overview.description}</p>

                          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Users className="w-4 h-4 text-blue-500" />
                                <span className="font-semibold text-sm">Clients Served</span>
                              </div>
                              <div className="text-2xl font-bold text-blue-600">{details?.clientsServed}</div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Briefcase className="w-4 h-4 text-green-500" />
                                <span className="font-semibold text-sm">Team Size</span>
                              </div>
                              <div className="text-2xl font-bold text-green-600">{details?.overview.teamSize}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            Key Features
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {details?.overview.keyFeatures.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-600">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Industries & Tools */}
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-purple-500" />
                            Industries We Serve
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {details?.overview.industries.map((industry, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {industry}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-orange-500" />
                            Tools & Platforms
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {details?.overview.tools.map((tool, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Deliverables */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-yellow-500" />
                          What You'll Receive
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          {details?.overview.deliverables.map((deliverable, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-yellow-600" />
                              </div>
                              <span className="text-sm font-medium text-gray-700">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Photo Placeholders for Future Designs */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-blue-500" />
                          Service Gallery
                        </CardTitle>
                        <CardDescription>Examples of our work and results</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                              key={item}
                              className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group hover:shadow-lg transition-all duration-300"
                            >
                              <div className="text-center">
                                <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2 group-hover:bg-yellow-400 transition-colors" />
                                <p className="text-xs text-gray-500 group-hover:text-gray-700">Sample {item}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="case-studies" className="space-y-6">
                    <div className="grid gap-6">
                      {details?.caseStudies.map((study, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="md:flex">
                            <div className="md:w-1/3">
                              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2" />
                                  <p className="text-sm text-gray-500">Case Study Image</p>
                                </div>
                              </div>
                            </div>
                            <div className="md:w-2/3 p-6">
                              <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                              <p className="text-gray-600 mb-4">{study.description}</p>
                              <div className="grid grid-cols-3 gap-4">
                                {Object.entries(study.metrics).map(([key, value]) => (
                                  <div key={key} className="text-center">
                                    <div className="text-lg font-bold text-green-600">{value}</div>
                                    <div className="text-xs text-gray-500 capitalize">{key}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="process" className="space-y-6">
                    <div className="space-y-6">
                      {details?.process.map((step, index) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-yellow-600 font-bold">{step.step}</span>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* CTA Section */}
                    <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                      <CardContent className="p-6 text-center">
                        <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
                        <p className="text-gray-600 mb-4">
                          Let's discuss how we can help you achieve your marketing goals with this service.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule Consultation
                          </Button>
                          <Button variant="outline">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Start Chat
                          </Button>
                          <Button variant="outline">
                            <Phone className="w-4 h-4 mr-2" />
                            Call Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
