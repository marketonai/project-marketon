"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Html, Environment, Float } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HologramPopup } from "@/components/ui/hologram-popup"
import { X, ChevronLeft, ChevronRight, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import * as THREE from "three"

// Services data
const services = [
  {
    id: 1,
    title: "AI Content Creation",
    description: "Generate high-quality content with our advanced AI tools.",
    icon: "✍️",
    image: "https://placehold.co/600x400/f3f4f6/9ca3af?text=AI+Content+Creation",
    position: [-1.5, 0, 0], // left position
  },
  {
    id: 2,
    title: "Predictive Analytics",
    description: "Forecast trends and make data-driven decisions.",
    icon: "📊",
    image: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Predictive+Analytics",
    position: [-0.5, 0, 0], // center-left position
  },
  {
    id: 3,
    title: "Chatbot Development",
    description: "Create intelligent conversational interfaces for your business.",
    icon: "💬",
    image: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Chatbot+Development",
    position: [0.5, 0, 0], // center position
  },
  {
    id: 4,
    title: "Social Media Automation",
    description: "Automate your social media marketing with AI.",
    icon: "📱",
    image: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Social+Media+Automation",
    position: [1.5, 0, 0], // center-right position
  },
  {
    id: 5,
    title: "SEO Optimization",
    description: "Improve your search rankings with AI-powered SEO.",
    icon: "🔍",
    image: "https://placehold.co/600x400/f3f4f6/9ca3af?text=SEO+Optimization",
    position: [-1, 0, 0], // right position
  },
  {
    id: 6,
    title: "Personalized Marketing",
    description: "Deliver tailored marketing campaigns to your audience.",
    icon: "🎯",
    image: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Personalized+Marketing",
    position: [1, 0, 0], // far-right position
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

// Service Carousel
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
    <div className="relative w-full py-10">
      <div className="flex justify-center items-center">
        <Button
          variant="outline"
          className="mr-4 bg-yellow-400 border-black text-black hover:bg-yellow-500"
          onClick={prevSlide}
          disabled={isAnimating}
        >
          <ChevronLeft size={24} />
        </Button>

        <div className="relative w-full max-w-[1360px] overflow-hidden">
          {" "}
          {/* 1360px = 5 cards * (256px + 16px gap) */}
          <motion.div
            className="flex space-x-4"
            animate={{
              x: -currentIndex * 272, // 272 = 256px width + 16px gap
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
              width: `${infiniteServices.length * 272}px`,
              willChange: "transform",
            }}
          >
            {infiniteServices.map((service, index) => (
              <motion.div
                key={`${service.id}-${index}`} // Unique key for each instance
                className={`w-64 p-4 rounded-lg cursor-pointer transition-all duration-300 flex-shrink-0 ${
                  selectedService === service.id
                    ? "bg-yellow-400 text-black scale-105 shadow-lg shadow-yellow-400/20"
                    : "bg-black text-white hover:bg-yellow-400 hover:text-black"
                }`}
                onClick={() => {
                  // Remove the immediate animation to show robot movement first
                  setSelectedService(service.id === selectedService ? null : service.id)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 1, y: 0 }}
                animate={{
                  scale: selectedService === service.id ? 1.05 : 1,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <div className="text-4xl mb-2">{service.icon}</div>
                <h3 className="font-bold text-lg">{service.title}</h3>
                <p className="text-sm mt-2">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>

        <Button
          variant="outline"
          className="ml-4 bg-yellow-400 border-black text-black hover:bg-yellow-500"
          onClick={nextSlide}
          disabled={isAnimating}
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      {/* Robot positioned underneath the carousel with increased height for better visibility */}
      <div className="relative h-80 mt-8">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} />
            <ServiceRobot
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              startIndex={currentIndex % services.length}
              mousePosition={mousePosition}
              robotPosition={{ x: 0, y: 0 }} // Centered position for better pointing accuracy
            />
            <Environment preset="city" />
          </Canvas>
        </div>
      </div>
    </div>
  )
}

// Navbar component
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-yellow-400 font-bold text-2xl mr-2">Marketon</div>
            <div className="font-bold text-2xl">AI</div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              Home
            </Link>
            <Link href="#services" className="hover:text-yellow-400 transition-colors">
              Services
            </Link>
            <Link href="#about" className="hover:text-yellow-400 transition-colors">
              About
            </Link>
            <Link href="#portfolio" className="hover:text-yellow-400 transition-colors">
              Portfolio
            </Link>
            <Link href="#contact" className="hover:text-yellow-400 transition-colors">
              Contact
            </Link>
          </nav>

          <Button className="hidden md:block bg-yellow-400 text-black hover:bg-yellow-500">Get Started</Button>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-black">
            <nav className="flex flex-col space-y-4">
              <Link href="#" className="hover:text-yellow-400 transition-colors">
                Home
              </Link>
              <Link href="#services" className="hover:text-yellow-400 transition-colors">
                Services
              </Link>
              <Link href="#about" className="hover:text-yellow-400 transition-colors">
                About
              </Link>
              <Link href="#portfolio" className="hover:text-yellow-400 transition-colors">
                Portfolio
              </Link>
              <Link href="#contact" className="hover:text-yellow-400 transition-colors">
                Contact
              </Link>
            </nav>
            <Button className="mt-4 w-full bg-yellow-400 text-black hover:bg-yellow-500">Get Started</Button>
          </div>
        )}
      </div>
    </header>
  )
}

// Main page component
export default function Home() {
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | undefined>(undefined)
  const containerRef = useRef(null)

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

  // Scroll helper function
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative bg-black text-white">
        <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-400">AI-Powered</span> Marketing Solutions
            </h1>
            <p className="text-xl mb-8">Transform your marketing strategy with cutting-edge artificial intelligence.</p>
            <div className="flex space-x-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Get Started</Button>
             
            </div>
          </div>
          <div className="md:w-1/2 relative h-[400px]">
            {/* Hero illustration */}
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-8xl mb-4">🤖</div>
                <p className="text-yellow-400 text-lg">Your Marketon.AI Assistant</p>
                <p className="text-gray-400 text-sm mt-2">Scroll down to see me in action!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-yellow-400 animate-bounce">
          <p className="mb-2 text-sm">Scroll to explore</p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white" ref={containerRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-yellow-400">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of AI-powered marketing solutions designed to elevate your brand.
            </p>
          </div>

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
                    <p className="text-gray-400">
                      Our {services[selectedService - 1].title.toLowerCase()} service leverages cutting-edge AI
                      technology to deliver exceptional results for your business. We combine advanced algorithms with
                      human expertise to ensure you get the best possible outcomes.
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-yellow-400">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-black/50 p-6 rounded-lg border border-yellow-400/20">
                          <div className="text-2xl mb-2">{services[selectedService - 1].icon}</div>
                          <h4 className="text-lg font-bold text-yellow-400 mb-2">Feature {i}</h4>
                          <p className="text-gray-400">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* How It Works */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-yellow-400">How It Works</h3>
                    <div className="space-y-6">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-start space-x-4">
                          <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold flex-shrink-0">
                            {step}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white mb-2">Step {step}</h4>
                            <p className="text-gray-400">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                              ut labore.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-yellow-400">Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="text-center">
                          <div className="text-3xl mb-2">✨</div>
                          <h4 className="text-lg font-bold text-white mb-2">Benefit {i}</h4>
                          <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center py-8">
                    <Button className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-4">
                      Get Started with {services[selectedService - 1].title}
                    </Button>
                  </div>
                </div>
              )
            }
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="relative">
                <div className="absolute -inset-4 bg-yellow-400/20 rounded-lg blur-xl"></div>
                <Image
                  src="https://placehold.co/800x600/f3f4f6/9ca3af?text=About+Our+Agency"
                  alt="About our AI agency"
                  width={800}
                  height={600}
                  className="rounded-lg relative z-10"
                />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-4xl font-bold mb-6">
                About <span className="text-yellow-400">Our Agency</span>
              </h2>
              <p className="text-lg mb-6">
                We are a team of AI experts, marketers, and creatives dedicated to revolutionizing how businesses
                connect with their audiences through artificial intelligence.
              </p>
              <p className="mb-8">
                Founded in 2020, our agency has helped over 200 businesses implement AI-driven marketing strategies that
                deliver measurable results. Our approach combines cutting-edge technology with human creativity to
                create marketing solutions that are both innovative and effective.
              </p>
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Meet Our Team</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-yellow-400">Portfolio</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore some of our successful projects and see how we've helped businesses transform their marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                className="bg-black text-white rounded-lg overflow-hidden group"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={`https://placehold.co/600x400/f3f4f6/9ca3af?text=Project+${item}`}
                    alt={`Project ${item}`}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="bg-yellow-400 text-black hover:bg-yellow-500">View Project</Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Project {item}</h3>
                  <p className="text-gray-300 mb-4">
                    AI-powered marketing campaign for a leading brand in the industry.
                  </p>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-yellow-400 text-black text-xs rounded-full">AI</span>
                    <span className="px-3 py-1 bg-gray-700 text-white text-xs rounded-full">Marketing</span>
                    <span className="px-3 py-1 bg-gray-700 text-white text-xs rounded-full">Analytics</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Get <span className="text-yellow-400">In Touch</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Ready to transform your marketing strategy with AI? Contact us today to schedule a consultation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-8 border border-yellow-400/20">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                  placeholder="How can we help you?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">Send Message</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 font-bold text-2xl mr-2">Marketon</div>
                <div className="font-bold text-2xl">AI</div>
              </div>
              <p className="text-gray-400 mb-4">Transforming marketing strategies with artificial intelligence.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    AI Content Creation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Predictive Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Chatbot Development
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Social Media Automation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">📍</span>
                  <span className="text-gray-400">123 AI Street, Tech City, TC 12345</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">📞</span>
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✉️</span>
                  <span className="text-gray-400">info@aimarketing.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Marketon AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
