"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Html, Environment, Float } from "@react-three/drei"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HologramPopup } from "@/components/ui/hologram-popup"
import {
  X,
  ChevronLeft,
  ChevronRight,
  Menu,
  ArrowDown,
  Star,
  Users,
  TrendingUp,
  Award,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Play,
  CheckCircle,
  Zap,
  Target,
  BarChart3,
  Brain,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import * as THREE from "three"

// Services data with enhanced content
const services = [
  {
    id: 1,
    title: "AI Content Creation",
    description:
      "Generate high-quality, engaging content that converts visitors into customers using advanced AI algorithms.",
    icon: "✍️",
    image: "/placeholder.svg?height=400&width=600&text=AI+Content+Creation",
    features: ["Blog Posts", "Social Media", "Email Campaigns", "Product Descriptions"],
    price: "$299/month",
    roi: "300% ROI increase",
    timeline: "2-4 weeks setup",
  },
  {
    id: 2,
    title: "Predictive Analytics",
    description: "Forecast market trends and customer behavior to make data-driven decisions that boost revenue.",
    icon: "📊",
    image: "/placeholder.svg?height=400&width=600&text=Predictive+Analytics",
    features: ["Market Forecasting", "Customer Insights", "Revenue Prediction", "Risk Analysis"],
    price: "$499/month",
    roi: "450% ROI increase",
    timeline: "3-6 weeks setup",
  },
  {
    id: 3,
    title: "Chatbot Development",
    description: "Create intelligent conversational interfaces that provide 24/7 customer support and drive sales.",
    icon: "💬",
    image: "/placeholder.svg?height=400&width=600&text=Chatbot+Development",
    features: ["24/7 Support", "Lead Generation", "Order Processing", "FAQ Automation"],
    price: "$399/month",
    roi: "250% ROI increase",
    timeline: "1-3 weeks setup",
  },
  {
    id: 4,
    title: "Social Media Automation",
    description: "Automate your social media presence with AI-powered content scheduling and engagement.",
    icon: "📱",
    image: "/placeholder.svg?height=400&width=600&text=Social+Media+Automation",
    features: ["Content Scheduling", "Engagement Tracking", "Hashtag Optimization", "Audience Analysis"],
    price: "$199/month",
    roi: "200% ROI increase",
    timeline: "1-2 weeks setup",
  },
  {
    id: 5,
    title: "SEO Optimization",
    description: "Improve your search rankings with AI-powered SEO strategies that drive organic traffic.",
    icon: "🔍",
    image: "/placeholder.svg?height=400&width=600&text=SEO+Optimization",
    features: ["Keyword Research", "Content Optimization", "Technical SEO", "Competitor Analysis"],
    price: "$349/month",
    roi: "400% ROI increase",
    timeline: "2-8 weeks results",
  },
  {
    id: 6,
    title: "Personalized Marketing",
    description: "Deliver tailored marketing campaigns that resonate with each customer segment.",
    icon: "🎯",
    image: "/placeholder.svg?height=400&width=600&text=Personalized+Marketing",
    features: ["Customer Segmentation", "Dynamic Content", "A/B Testing", "Conversion Optimization"],
    price: "$599/month",
    roi: "500% ROI increase",
    timeline: "4-8 weeks setup",
  },
]

// Portfolio data
const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Growth Campaign",
    description: "Increased online sales by 340% using AI-powered personalization",
    image: "/placeholder.svg?height=300&width=400&text=E-commerce+Success",
    category: "E-commerce",
    results: "340% sales increase",
    client: "TechStore Pro",
  },
  {
    id: 2,
    title: "SaaS Lead Generation",
    description: "Generated 2,500+ qualified leads in 3 months with AI chatbots",
    image: "/placeholder.svg?height=300&width=400&text=SaaS+Leads",
    category: "SaaS",
    results: "2,500+ leads",
    client: "CloudTech Solutions",
  },
  {
    id: 3,
    title: "Restaurant Chain Automation",
    description: "Automated social media for 50+ locations, saving 80 hours/week",
    image: "/placeholder.svg?height=300&width=400&text=Restaurant+Automation",
    category: "Food & Beverage",
    results: "80 hours saved/week",
    client: "Burger Kingdom",
  },
  {
    id: 4,
    title: "Healthcare Content Strategy",
    description: "Created HIPAA-compliant content that increased patient engagement by 250%",
    image: "/placeholder.svg?height=300&width=400&text=Healthcare+Content",
    category: "Healthcare",
    results: "250% engagement boost",
    client: "MedCare Plus",
  },
  {
    id: 5,
    title: "Real Estate Predictive Analytics",
    description: "Predicted market trends with 95% accuracy, helping close $50M in deals",
    image: "/placeholder.svg?height=300&width=400&text=Real+Estate+Analytics",
    category: "Real Estate",
    results: "$50M deals closed",
    client: "Prime Properties",
  },
  {
    id: 6,
    title: "Fashion Brand SEO Overhaul",
    description: "Achieved #1 rankings for 200+ keywords, tripling organic traffic",
    image: "/placeholder.svg?height=300&width=400&text=Fashion+SEO",
    category: "Fashion",
    results: "300% traffic increase",
    client: "StyleHub Fashion",
  },
]

// Team data
const teamMembers = [
  {
    name: "Sarah Chen",
    role: "AI Strategy Director",
    image: "/placeholder.svg?height=300&width=300&text=Sarah+Chen",
    bio: "Former Google AI researcher with 10+ years in machine learning",
  },
  {
    name: "Marcus Rodriguez",
    role: "Marketing Automation Lead",
    image: "/placeholder.svg?height=300&width=300&text=Marcus+Rodriguez",
    bio: "Ex-HubSpot engineer specializing in marketing automation",
  },
  {
    name: "Emily Watson",
    role: "Content AI Specialist",
    image: "/placeholder.svg?height=300&width=300&text=Emily+Watson",
    bio: "Award-winning copywriter turned AI content strategist",
  },
  {
    name: "David Kim",
    role: "Data Science Manager",
    image: "/placeholder.svg?height=300&width=300&text=David+Kim",
    bio: "PhD in Statistics, former Netflix recommendation systems engineer",
  },
]

// Testimonials data
const testimonials = [
  {
    name: "Jennifer Martinez",
    role: "CEO, TechStart Inc.",
    content:
      "Marketon AI transformed our marketing completely. We saw a 400% increase in qualified leads within just 2 months!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=JM",
  },
  {
    name: "Robert Thompson",
    role: "Marketing Director, GrowthCorp",
    content: "The AI-powered content creation saved us 20 hours per week while improving our engagement rates by 250%.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=RT",
  },
  {
    name: "Lisa Chang",
    role: "Founder, EcoProducts",
    content:
      "Their predictive analytics helped us identify our best customers and increase retention by 180%. Incredible results!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=LC",
  },
]

// Robot component for services section
interface ServiceRobotProps {
  selectedService: number | null
  setSelectedService: (id: number | null) => void
  startIndex: number
  mousePosition?: { x: number; y: number }
  robotPosition: { x: number; y: number }
}

function ServiceRobot({
  selectedService,
  setSelectedService,
  startIndex,
  mousePosition,
  robotPosition,
}: ServiceRobotProps) {
  const group = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const leftArmRef = useRef<THREE.Mesh>(null)
  const rightArmRef = useRef<THREE.Mesh>(null)
  const { viewport, camera } = useThree()

  // Hologram effect refs
  const hologramMaterial = useRef<THREE.MeshStandardMaterial>(null)
  const pointLight = useRef<THREE.PointLight>(null)

  // Get the position to point at based on selected service and carousel position
  const getServicePointingPosition = () => {
    if (!selectedService) return null

    const selectedServiceData = services.find((s) => s.id === selectedService)
    if (!selectedServiceData) return null

    // Calculate the visual position of the service in the carousel
    const visibleServices = 5 // Now showing 5 cards
    const serviceIndex = services.findIndex((s) => s.id === selectedService)
    const positionInCarousel = (serviceIndex - startIndex + services.length) % services.length

    // Only point if the service is visible in the carousel
    if (positionInCarousel < visibleServices) {
      // Improved calculation for more accurate positioning
      const carouselWidth = 5 // 5 visible services
      const centerOffset = (carouselWidth - 1) / 2 // Center position offset (2)
      const serviceX = (positionInCarousel - centerOffset) * 0.8 // Increased spacing for better accuracy

      // Determine position: left (-2, -1), center (0), right (1, 2)
      const robotHeadX = 0 // Robot head is at center
      let position: "left" | "center" | "right"

      if (positionInCarousel === 2) {
        // Exact center position
        position = "center"
      } else if (positionInCarousel < 2) {
        // Left side (positions 0, 1)
        position = "left"
      } else {
        // Right side (positions 3, 4)
        position = "right"
      }

      return { x: serviceX, y: 0.8, position }
    }

    return null
  }

  const pointingPosition = getServicePointingPosition()

  // Animate robot on each frame
  useFrame((state, delta) => {
    if (group.current) {
      // Apply robot position with improved smooth transition
      group.current.position.x = THREE.MathUtils.lerp(
        group.current.position.x,
        robotPosition.x * 0.5, // Reduced movement range for better stability
        0.08, // Slightly slower for smoother movement
      )
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        robotPosition.y + Math.sin(state.clock.elapsedTime * 1.5) * 0.08, // Gentler floating effect
        0.08,
      )

      // Improved rotation based on movement direction with body tilt
      const targetRotation = (robotPosition.x * Math.PI) / 6 // Reduced rotation angle
      const targetTilt = (robotPosition.x * Math.PI) / 12 // Add body tilt

      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotation, 0.06)
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetTilt, 0.08) // Body tilt

      // Enhanced arm pointing logic with carousel movement animation
      if (leftArmRef.current && rightArmRef.current) {
        // Base arm positions (straight down) - fixed for proper vertical alignment
        const baseLeftArmRotation = 0 // Straight down
        const baseRightArmRotation = 0 // Straight down

        // Carousel movement animation (25 degrees = Math.PI / 7.2)
        const carouselMovementRotation =
          robotPosition.x > 0
            ? Math.PI / 7.2
            : // Right movement (clockwise)
              robotPosition.x < 0
              ? -Math.PI / 7.2
              : // Left movement (anticlockwise)
                0 // No movement

        if (pointingPosition) {
          if (pointingPosition.position === "center") {
            // Both arms point straight up (180 degrees vertical)
            leftArmRef.current.rotation.z = THREE.MathUtils.lerp(
              leftArmRef.current.rotation.z,
              Math.PI + carouselMovementRotation, // 180 degrees up
              0.1,
            )
            rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
              rightArmRef.current.rotation.z,
              -Math.PI + carouselMovementRotation, // 180 degrees up (opposite direction)
              0.1,
            )
          } else if (pointingPosition.position === "left") {
            // Only left arm activates (90 degrees anticlockwise)
            leftArmRef.current.rotation.z = THREE.MathUtils.lerp(
              leftArmRef.current.rotation.z,
              -Math.PI / 2 + carouselMovementRotation, // 90 degrees anticlockwise
              0.1,
            )
            // Right arm stays in relaxed position
            rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
              rightArmRef.current.rotation.z,
              baseRightArmRotation + carouselMovementRotation,
              0.1,
            )
          } else if (pointingPosition.position === "right") {
            // Only right arm activates (90 degrees clockwise)
            rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
              rightArmRef.current.rotation.z,
              Math.PI / 2 + carouselMovementRotation, // 90 degrees clockwise
              0.1,
            )
            // Left arm stays in relaxed position
            leftArmRef.current.rotation.z = THREE.MathUtils.lerp(
              leftArmRef.current.rotation.z,
              baseLeftArmRotation + carouselMovementRotation,
              0.1,
            )
          }

          // More subtle shoulder movement
          leftArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.03
          rightArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.03
        } else {
          // Return to straight down position with carousel movement animation
          leftArmRef.current.rotation.z = THREE.MathUtils.lerp(
            leftArmRef.current.rotation.z,
            baseLeftArmRotation + carouselMovementRotation,
            0.06,
          )
          rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
            rightArmRef.current.rotation.z,
            baseRightArmRotation + carouselMovementRotation,
            0.06,
          )

          // Reset arm tilt smoothly
          leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, 0.06)
          rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, 0.06)
        }
      }

      // Improved hologram effect animation
      if (hologramMaterial.current) {
        hologramMaterial.current.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 1.8) * 0.15
      }

      if (pointLight.current) {
        pointLight.current.intensity = 0.8 + Math.sin(state.clock.elapsedTime * 2.5) * 0.2
      }
    }

    // Smoother robot mesh animation
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.03
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.015
    }
  })

  // Hologram effect when service is selected - delayed to show robot movement first
  const [showServiceHologram, setShowServiceHologram] = useState(false)

  useEffect(() => {
    if (selectedService) {
      // Delay the hologram to allow robot pointing gesture to be visible first
      const timer = setTimeout(() => {
        setShowServiceHologram(true)
      }, 2500) // Increased from 1500ms to 2500ms for better robot animation viewing

      const hideTimer = setTimeout(() => {
        setShowServiceHologram(false)
      }, 6000) // Increased from 4500ms to 6000ms to show for 3.5 seconds after the delay

      return () => {
        clearTimeout(timer)
        clearTimeout(hideTimer)
      }
    } else {
      setShowServiceHologram(false)
    }
  }, [selectedService])

  return (
    <>
      {/* Hologram effect circle on the ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <ringGeometry args={[0.5, 0.8, 32]} />
        <meshStandardMaterial
          ref={hologramMaterial}
          color="#FACC15"
          emissive="#FACC15"
          emissiveIntensity={0.5}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Point light for hologram effect */}
      <pointLight ref={pointLight} position={[0, 1, 0]} color="#FACC15" intensity={1} distance={3} />

      {/* Robot model built with basic geometries */}
      <Float
        speed={2} // Animation speed
        rotationIntensity={0.2} // Rotation intensity
        floatIntensity={0.3} // Float intensity
      >
        <group ref={group} position={[0, -0.5, 0]} scale={0.8}>
          {/* Robot Body */}
          <mesh ref={meshRef} position={[0, 0, 0]}>
            <boxGeometry args={[0.8, 1.2, 0.6]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Robot Head */}
          <mesh position={[0, 1.0, 0]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Robot Eyes */}
          <mesh position={[-0.15, 1.1, 0.31]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#FACC15" emissive="#FACC15" emissiveIntensity={selectedService ? 0.8 : 0.5} />
          </mesh>
          <mesh position={[0.15, 1.1, 0.31]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#FACC15" emissive="#FACC15" emissiveIntensity={selectedService ? 0.8 : 0.5} />
          </mesh>

          {/* Robot Arms with Shoulders - Enhanced for better pointing */}
          <group ref={leftArmRef} position={[-0.5, 0.5, 0]}>
            {/* Shoulder Joint */}
            <mesh>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Upper Arm */}
            <mesh position={[0, -0.4, 0]}>
              <boxGeometry args={[0.15, 0.6, 0.15]} />
              <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Elbow Joint */}
            <mesh position={[0, -0.7, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Lower Arm */}
            <mesh position={[0, -1.0, 0]}>
              <boxGeometry args={[0.12, 0.6, 0.12]} />
              <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Hand */}
            <mesh position={[0, -1.4, 0]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color="#FACC15" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Pointing finger for left hand */}
            <mesh position={[0, -1.6, 0]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
              <meshStandardMaterial color="#FACC15" metalness={0.6} roughness={0.3} />
            </mesh>
          </group>

          <group ref={rightArmRef} position={[0.5, 0.5, 0]}>
            {/* Shoulder Joint */}
            <mesh>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Upper Arm */}
            <mesh position={[0, -0.4, 0]}>
              <boxGeometry args={[0.15, 0.6, 0.15]} />
              <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Elbow Joint */}
            <mesh position={[0, -0.7, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Lower Arm */}
            <mesh position={[0, -1.0, 0]}>
              <boxGeometry args={[0.12, 0.6, 0.12]} />
              <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Hand */}
            <mesh position={[0, -1.4, 0]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color="#FACC15" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Pointing finger for right hand - primary pointing hand */}
            <mesh position={[0, -1.6, 0]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
              <meshStandardMaterial color="#FACC15" metalness={0.6} roughness={0.3} />
            </mesh>
          </group>

          {/* Robot Legs */}
          <mesh position={[-0.3, -0.8, 0]}>
            <boxGeometry args={[0.25, 0.6, 0.25]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.3, -0.8, 0]}>
            <boxGeometry args={[0.25, 0.6, 0.25]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Robot Feet */}
          <mesh position={[-0.3, -1.2, 0.1]}>
            <boxGeometry args={[0.25, 0.1, 0.4]} />
            <meshStandardMaterial color="#FACC15" metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[0.3, -1.2, 0.1]}>
            <boxGeometry args={[0.25, 0.1, 0.4]} />
            <meshStandardMaterial color="#FACC15" metalness={0.6} roughness={0.3} />
          </mesh>

          {/* Antenna */}
          <mesh position={[0, 1.6, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
            <meshStandardMaterial color="#FACC15" emissive="#FACC15" emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[0, 1.8, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#FACC15" emissive="#FACC15" emissiveIntensity={0.8} />
          </mesh>
        </group>
      </Float>

      {/* Service activation hologram */}
      <AnimatePresence>
        {showServiceHologram && selectedService && (
          <Html position={[0, 2, 0]} center style={{ pointerEvents: "none" }}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-center"
            >
              <div className="bg-yellow-400/90 text-black p-3 rounded-lg backdrop-blur-lg border border-yellow-400">
                <p className="font-bold text-sm">Analyzing {services[selectedService - 1].title}...</p>
              </div>
            </motion.div>
          </Html>
        )}
      </AnimatePresence>
    </>
  )
}

// Service Carousel with enhanced mobile responsiveness
interface ServiceCarouselProps {
  selectedService: number | null
  setSelectedService: (id: number | null) => void
  mousePosition: { x: number; y: number } | undefined
}

function ServiceCarousel({ selectedService, setSelectedService, mousePosition }: ServiceCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(services.length) // Start at first real service
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 })
  const [isAnimating, setIsAnimating] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [cardWidth, setCardWidth] = useState(272)

  useEffect(() => {
    const updateCardWidth = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) setCardWidth(140)
        else if (window.innerWidth < 768) setCardWidth(150)
        else if (window.innerWidth < 1024) setCardWidth(160)
        else setCardWidth(272)
      }
    }

    updateCardWidth()
    window.addEventListener("resize", updateCardWidth)
    return () => window.removeEventListener("resize", updateCardWidth)
  }, [])

  // Create infinite scroll array by duplicating services
  const infiniteServices = [
    ...services, // Clone at beginning for seamless left scroll
    ...services, // Original services
    ...services, // Clone at end for seamless right scroll
  ]

  // Robot movement animation
  const animateRobot = (direction: "left" | "right") => {
    setIsAnimating(true)

    // Start from center-up position
    setRobotPosition({ x: 0, y: 0.5 })

    // Animate to side position
    setTimeout(() => {
      setRobotPosition({
        x: direction === "right" ? 1 : -1,
        y: 0.5,
      })
    }, 100)

    // Return to center
    setTimeout(() => {
      setRobotPosition({ x: 0, y: 0 })
      setIsAnimating(false)
    }, 600)
  }

  const nextSlide = () => {
    if (isAnimating) return
    animateRobot("right")
    setCurrentIndex((prev) => prev + 1)
  }

  const prevSlide = () => {
    if (isAnimating) return
    animateRobot("left")
    setCurrentIndex((prev) => prev - 1)
  }

  // Handle infinite scroll reset
  useEffect(() => {
    if (currentIndex >= services.length * 2) {
      // Reset to beginning of real services without animation
      setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(services.length)
        setTimeout(() => setIsTransitioning(true), 50)
      }, 300)
    } else if (currentIndex < services.length) {
      // Reset to end of real services without animation
      setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(services.length * 2 - 1)
        setTimeout(() => setIsTransitioning(true), 50)
      }, 300)
    }
  }, [currentIndex])

  return (
    <div className="relative w-full py-6 md:py-10">
      <div className="flex justify-center items-center px-4">
        <Button
          variant="outline"
          className="mr-2 md:mr-4 bg-yellow-400 border-black text-black hover:bg-yellow-500 elegant-glow-hover p-2 md:p-3"
          onClick={prevSlide}
          disabled={isAnimating}
        >
          <ChevronLeft size={20} className="md:w-6 md:h-6" />
        </Button>

        <div className="relative w-full max-w-[280px] sm:max-w-[580px] md:max-w-[880px] lg:max-w-[1180px] xl:max-w-[1480px] overflow-hidden">
          <motion.div
            className="flex space-x-2 md:space-x-4"
            animate={{
              x: -currentIndex * cardWidth,
            }}
            transition={
              isTransitioning
                ? {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.6,
                  }
                : { duration: 0 }
            }
            style={{
              width: `${infiniteServices.length * cardWidth}px`,
              willChange: "transform",
            }}
          >
            {infiniteServices.map((service, index) => (
              <motion.div
                key={`${service.id}-${index}`}
                className={`w-32 sm:w-36 md:w-64 p-2 md:p-4 rounded-lg cursor-pointer transition-all duration-300 flex-shrink-0 elegant-glow-hover ${
                  selectedService === service.id
                    ? "bg-yellow-400 text-black elegant-glow-center"
                    : "bg-black text-white hover:bg-yellow-400 hover:text-black"
                }`}
                onClick={() => {
                  setSelectedService(service.id === selectedService ? null : service.id)
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 1, y: 0 }}
                animate={{
                  scale: selectedService === service.id ? 1.05 : 1,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <div className="text-2xl md:text-4xl mb-1 md:mb-2 text-center">{service.icon}</div>
                <h3 className="font-bold text-xs md:text-lg text-center mb-1 md:mb-2">{service.title}</h3>
                <p className="text-xs md:text-sm text-center hidden md:block">{service.description}</p>
                <div className="text-center mt-1 md:mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {service.price}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>

        <Button
          variant="outline"
          className="ml-2 md:ml-4 bg-yellow-400 border-black text-black hover:bg-yellow-500 elegant-glow-hover p-2 md:p-3"
          onClick={nextSlide}
          disabled={isAnimating}
        >
          <ChevronRight size={20} className="md:w-6 md:h-6" />
        </Button>
      </div>

      {/* Robot positioned underneath the carousel with responsive height */}
      <div className="relative h-60 md:h-80 mt-4 md:mt-8">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} />
            <ServiceRobot
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              startIndex={currentIndex % services.length}
              mousePosition={mousePosition}
              robotPosition={{ x: 0, y: 0 }}
            />
            <Environment preset="city" />
          </Canvas>
        </div>
      </div>
    </div>
  )
}

// Navbar component with enhanced mobile menu
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm text-white border-b border-yellow-400/20">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex justify-between items-center">
          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <div className="text-yellow-400 font-bold text-xl md:text-2xl mr-2">Marketon</div>
            <div className="font-bold text-xl md:text-2xl">AI</div>
          </motion.div>

          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {["Home", "Services", "About", "Portfolio", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-yellow-400 transition-colors font-medium text-sm lg:text-base relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <Button className="hidden md:block bg-yellow-400 text-black hover:bg-yellow-500 rounded-full px-4 lg:px-6 py-2 font-bold text-sm lg:text-base elegant-glow-hover">
            Get Started
          </Button>

          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Enhanced Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 py-4 bg-black/95 backdrop-blur-sm rounded-2xl border border-yellow-400/20"
            >
              <nav className="flex flex-col space-y-4 px-4">
                {["Home", "Services", "About", "Portfolio", "Contact"].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-yellow-400 transition-colors font-medium py-2 border-b border-gray-800 last:border-b-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </nav>
              <Button className="mt-4 mx-4 w-[calc(100%-2rem)] bg-yellow-400 text-black hover:bg-yellow-500 rounded-full font-bold">
                Get Started
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

// Main page component
export default function Home() {
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | undefined>(undefined)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    const handleMouseLeave = () => {
      setMousePosition(undefined)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Enhanced Hero Section */}
      <section
        id="home"
        className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-yellow-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 md:w-64 h-48 md:h-64 bg-purple-400/10 rounded-full blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-24 md:w-32 h-24 md:h-32 bg-blue-400/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-20 lg:py-32 flex flex-col md:flex-row items-center relative">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                <span className="text-yellow-400">AI-Powered</span>
                <br />
                Marketing
                <br />
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Revolution
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-300 leading-relaxed">
                Transform your business with cutting-edge AI marketing strategies that deliver measurable results and
                maximize ROI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 elegant-glow-hover">
                  Start Your Journey
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold rounded-full elegant-glow-hover"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="md:w-1/2 relative h-[300px] sm:h-[400px] md:h-[500px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center h-full"
            >
              <div className="relative">
                {/* Central AI Hub */}
                <motion.div
                  className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 sm:w-10 sm:h-10 text-yellow-400" />
                  </div>
                </motion.div>

                {/* Orbiting Marketing Elements */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <motion.div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-purple-500 rounded-full opacity-80 shadow-lg flex items-center justify-center">
                    <Target className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  <motion.div className="absolute top-1/2 -right-6 sm:-right-8 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full opacity-80 shadow-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.div>
                  <motion.div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 w-11 h-11 sm:w-14 sm:h-14 bg-green-500 rounded-full opacity-80 shadow-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  <motion.div className="absolute top-1/2 -left-6 sm:-left-8 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-full opacity-80 shadow-lg flex items-center justify-center">
                    <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </motion.div>
                </motion.div>

                {/* Data Streams */}
                <div className="absolute inset-0">
                  {[0, 90, 180, 270].map((rotation, index) => (
                    <motion.div
                      key={index}
                      className="absolute top-1/2 left-1/2 w-px h-16 sm:h-20 bg-gradient-to-t from-yellow-400 to-transparent origin-bottom"
                      style={{ transform: `translate(-50%, -100%) rotate(${rotation}deg)` }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.5,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="container mx-auto px-4 pb-16 md:pb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              { icon: TrendingUp, number: "450%", label: "Average ROI Increase", color: "text-green-400" },
              { icon: Users, number: "500+", label: "Happy Clients", color: "text-blue-400" },
              { icon: Award, number: "98%", label: "Client Satisfaction", color: "text-purple-400" },
              { icon: MessageCircle, number: "24/7", label: "AI Support", color: "text-yellow-400" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
                </div>
                <motion.div
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400 mb-1 md:mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-400 font-medium text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-yellow-400"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <p className="mb-2 text-sm">Explore Our Services</p>
          <ArrowDown className="w-5 h-5 md:w-6 md:h-6" />
        </motion.div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(250,204,21,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
              Our AI-Powered <span className="text-yellow-400">Services</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive suite of AI marketing solutions designed to transform your business and drive
              unprecedented growth.
            </p>
          </motion.div>

          <ServiceCarousel
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            mousePosition={mousePosition}
          />

          {/* Service detail hologram popup */}
          <HologramPopup
            isOpen={!!selectedService}
            onClose={() => setSelectedService(null)}
            title={selectedService ? services[selectedService - 1].title : ""}
            content={
              selectedService && (
                <div className="space-y-12">
                  {/* Hero section */}
                  <div className="relative rounded-lg overflow-hidden border-2 border-yellow-400/30 aspect-video">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent pointer-events-none"></div>
                    <Image
                      src={services[selectedService - 1].image || "/placeholder.svg"}
                      alt={services[selectedService - 1].title}
                      width={1200}
                      height={675}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Overview */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-yellow-400">Overview</h3>
                    <p className="text-lg text-gray-300">{services[selectedService - 1].description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-black/50 p-4 rounded-lg border border-yellow-400/20">
                        <div className="text-yellow-400 font-bold text-lg">{services[selectedService - 1].price}</div>
                        <div className="text-gray-400 text-sm">Starting Price</div>
                      </div>
                      <div className="bg-black/50 p-4 rounded-lg border border-yellow-400/20">
                        <div className="text-yellow-400 font-bold text-lg">{services[selectedService - 1].roi}</div>
                        <div className="text-gray-400 text-sm">Expected ROI</div>
                      </div>
                      <div className="bg-black/50 p-4 rounded-lg border border-yellow-400/20">
                        <div className="text-yellow-400 font-bold text-lg">
                          {services[selectedService - 1].timeline}
                        </div>
                        <div className="text-gray-400 text-sm">Timeline</div>
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-yellow-400">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {services[selectedService - 1].features.map((feature, i) => (
                        <div key={i} className="bg-black/50 p-6 rounded-lg border border-yellow-400/20">
                          <div className="text-2xl mb-2">{services[selectedService - 1].icon}</div>
                          <h4 className="text-lg font-bold text-yellow-400 mb-2">{feature}</h4>
                          <p className="text-gray-400">
                            Advanced AI-powered {feature.toLowerCase()} that delivers exceptional results for your
                            business growth.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* How It Works */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-yellow-400">How It Works</h3>
                    <div className="space-y-6">
                      {["Analysis & Strategy", "Implementation & Setup", "Optimization & Results"].map(
                        (step, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-white mb-2">{step}</h4>
                              <p className="text-gray-400">
                                We {step.toLowerCase()} using advanced AI algorithms and proven methodologies to ensure
                                maximum impact for your business.
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center py-8">
                    <Button className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-4 rounded-full elegant-glow-hover">
                      Get Started with {services[selectedService - 1].title}
                    </Button>
                  </div>
                </div>
              )
            }
          />
        </div>
      </section>

      {/* Enhanced Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
              Success <span className="text-yellow-400">Stories</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how we've helped businesses across industries achieve remarkable growth through AI-powered
              marketing strategies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 elegant-glow-hover"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-48 md:h-64 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-yellow-400 text-black font-bold">{item.category}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-full">
                      <Play className="w-4 h-4 mr-2" />
                      View Case Study
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-yellow-600 font-bold text-lg">{item.results}</div>
                      <div className="text-gray-500 text-sm">{item.client}</div>
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section
        id="about"
        className="py-16 md:py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,204,21,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-yellow-400/20 rounded-lg blur-xl"></div>
                <Image
                  src="/placeholder.svg?height=600&width=800&text=AI+Marketing+Team"
                  alt="Our AI marketing team"
                  width={800}
                  height={600}
                  className="rounded-lg relative z-10 shadow-2xl"
                />
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-yellow-400">
                  Meet Our AI Experts
                </h2>
                <p className="text-lg md:text-xl mb-6 text-gray-300 leading-relaxed">
                  We are a team of AI specialists, data scientists, and marketing strategists dedicated to
                  revolutionizing how businesses connect with their audiences through artificial intelligence.
                </p>
                <p className="mb-8 text-gray-400 leading-relaxed">
                  Founded in 2020, our agency has helped over 500 businesses implement AI-driven marketing strategies
                  that deliver measurable results. Our approach combines cutting-edge technology with human creativity
                  to create marketing solutions that are both innovative and effective.
                </p>

                {/* Team Stats */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
                    <div className="text-gray-400">Clients Served</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">98%</div>
                    <div className="text-gray-400">Success Rate</div>
                  </div>
                </div>

                <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-4 rounded-full font-bold elegant-glow-hover">
                  Meet Our Team
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Team Members Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-24"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-yellow-400">Our Leadership Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="relative mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto object-cover border-4 border-yellow-400/20"
                    />
                    <div className="absolute inset-0 rounded-full bg-yellow-400/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>

                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
              What Our <span className="text-yellow-400">Clients Say</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our clients have to say about their experience with Marketon
              AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-black to-gray-900 text-white p-8 rounded-xl shadow-xl elegant-glow-hover"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-bold text-yellow-400">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section
        id="contact"
        className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.1),transparent_70%)]" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-yellow-400">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Let's discuss how our AI-powered marketing strategies can accelerate your growth and maximize your ROI.
              Get started today!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-black/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/20 elegant-glow-hover"
            >
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Get Your Free Consultation</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-yellow-400 focus:border-yellow-400 text-white placeholder-gray-400 transition-all duration-300"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-yellow-400 focus:border-yellow-400 text-white placeholder-gray-400 transition-all duration-300"
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block mb-2 text-sm font-medium text-white">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-yellow-400 focus:border-yellow-400 text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label htmlFor="budget" className="block mb-2 text-sm font-medium text-white">
                    Monthly Marketing Budget
                  </label>
                  <select
                    id="budget"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-yellow-400 focus:border-yellow-400 text-white"
                  >
                    <option value="">Select your budget range</option>
                    <option value="5k-10k">$5K - $10K</option>
                    <option value="10k-25k">$10K - $25K</option>
                    <option value="25k-50k">$25K - $50K</option>
                    <option value="50k+">$50K+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">
                    Tell us about your goals *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-yellow-400 focus:border-yellow-400 text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="What marketing challenges are you facing? What are your growth goals?"
                    required
                  ></textarea>
                </div>
                <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 py-4 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 elegant-glow-hover">
                  Schedule Free Strategy Call
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">Get In Touch</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Ready to revolutionize your marketing? Our AI experts are here to help you achieve unprecedented
                  growth.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Phone, title: "Call Us", content: "+1 (555) 123-4567", subtitle: "Mon-Fri 9AM-6PM EST" },
                  {
                    icon: Mail,
                    title: "Email Us",
                    content: "hello@marketon.ai",
                    subtitle: "We'll respond within 24 hours",
                  },
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    content: "123 AI Street, Tech City, TC 12345",
                    subtitle: "By appointment only",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-yellow-400/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-yellow-400 font-medium">{item.content}</p>
                      <p className="text-gray-400 text-sm">{item.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8">
                <h4 className="font-bold text-white mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center hover:bg-yellow-400/30 transition-colors duration-300"
                    >
                      <Icon className="w-6 h-6 text-yellow-400" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-black text-white py-12 border-t border-yellow-400/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <motion.div className="flex items-center mb-4" whileHover={{ scale: 1.05 }}>
                <div className="text-yellow-400 font-bold text-2xl mr-2">Marketon</div>
                <div className="font-bold text-2xl">AI</div>
              </motion.div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Transforming businesses through AI-powered marketing strategies that deliver measurable results and
                drive sustainable growth.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center hover:bg-yellow-400/30 transition-colors duration-300"
                  >
                    <Icon className="w-5 h-5 text-yellow-400" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Services</h3>
              <ul className="space-y-3">
                {services.slice(0, 4).map((service) => (
                  <li key={service.id}>
                    <a
                      href="#services"
                      className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center"
                    >
                      <span className="mr-2">{service.icon}</span>
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Company</h3>
              <ul className="space-y-3">
                {["About Us", "Case Studies", "Careers", "Blog", "Press Kit"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Newsletter</h3>
              <p className="text-gray-400 mb-4">Stay updated with the latest AI marketing trends and insights.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg focus:ring-yellow-400 focus:border-yellow-400 text-white placeholder-gray-400"
                />
                <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-4 py-2 rounded-r-lg">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© {new Date().getFullYear()} Marketon AI. All rights reserved.</p>
            <div className="flex space-x-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
