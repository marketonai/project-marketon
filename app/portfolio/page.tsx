"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const allProjects = [
  {
    id: 1,
    title: "E-commerce Growth Campaign",
    client: "TechStyle Fashion",
    category: "Paid Media & Automation",
    description:
      "Transformed an e-commerce brand's marketing strategy with AI-powered automation, resulting in explosive growth across all channels.",
    image: "https://placehold.co/800x600/f3f4f6/9ca3af?text=E-commerce+Growth+Campaign",
    metrics: {
      revenue: "+450%",
      roas: "8.2x",
      conversion: "+280%",
      traffic: "+320%",
    },
    tags: ["Paid Ads", "Email Marketing", "Automation", "Analytics"],
    featured: true,
    results: "Generated $2.4M in additional revenue within 6 months through strategic AI implementation.",
    timeline: "6 months",
    budget: "$50K - $100K",
    industry: "Fashion & Retail",
  },
  {
    id: 2,
    title: "SaaS Lead Generation",
    client: "CloudTech Solutions",
    category: "Content Marketing & SEO",
    description:
      "Developed a comprehensive content marketing strategy that positioned the client as an industry thought leader.",
    image: "https://placehold.co/600x400/f3f4f6/9ca3af?text=SaaS+Lead+Generation",
    metrics: {
      leads: "+380%",
      traffic: "+250%",
      rankings: "Top 3",
      conversion: "+180%",
    },
    tags: ["SEO", "Content", "Lead Gen"],
    featured: false,
    results: "Increased qualified leads by 380% and reduced cost per lead by 65%.",
    timeline: "4 months",
    budget: "$25K - $50K",
    industry: "Technology",
  },
  {
    id: 3,
    title: "Social Media Viral Campaign",
    client: "FitLife Nutrition",
    category: "Social Media Marketing",
    description:
      "Created viral social media content that built a massive community and drove unprecedented brand awareness.",
    image: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Social+Media+Viral+Campaign",
    metrics: {
      followers: "+500K",
      engagement: "+420%",
      reach: "10M+",
      sales: "+300%",
    },
    tags: ["Social Media", "Content", "Influencer"],
    featured: false,
    results: "Built a community of 500K+ engaged followers and increased brand awareness by 400%.",
    timeline: "3 months",
    budget: "$15K - $25K",
    industry: "Health & Wellness",
  },
  {
    id: 4,
    title: "B2B Marketing Automation",
    client: "InnovateTech Corp",
    category: "Marketing Automation",
    description: "Implemented sophisticated lead nurturing workflows that transformed their sales pipeline efficiency.",
    image: "https://placehold.co/600x400/f3f4f6/9ca3af?text=B2B+Marketing+Automation",
    metrics: {
      leads: "+290%",
      qualified: "+340%",
      sales: "+180%",
      efficiency: "+250%",
    },
    tags: ["Automation", "B2B", "Lead Nurturing"],
    featured: false,
    results: "Increased qualified leads by 340% and improved sales team efficiency by 250%.",
    timeline: "5 months",
    budget: "$35K - $75K",
    industry: "Technology",
  },
  {
    id: 5,
    title: "Local Business SEO Domination",
    client: "Metro Dental Group",
    category: "SEO & Local Marketing",
    description: "Achieved local search dominance through strategic SEO and reputation management.",
    image: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Local+Business+SEO",
    metrics: {
      rankings: "#1 Local",
      traffic: "+400%",
      bookings: "+350%",
      reviews: "4.9/5",
    },
    tags: ["Local SEO", "Reputation", "Healthcare"],
    featured: false,
    results: "Achieved #1 local rankings and increased patient bookings by 350%.",
    timeline: "6 months",
    budget: "$10K - $20K",
    industry: "Healthcare",
  },
  {
    id: 6,
    title: "Startup Growth Acceleration",
    client: "GreenTech Innovations",
    category: "Full-Service Marketing",
    description: "Comprehensive marketing strategy that took a startup from launch to market leader.",
    image: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Startup+Growth+Acceleration",
    metrics: {
      revenue: "+800%",
      users: "+600%",
      funding: "$5M Series A",
      valuation: "$25M",
    },
    tags: ["Startup", "Growth", "Full-Service"],
    featured: false,
    results: "Helped secure $5M Series A funding and achieved $25M valuation.",
    timeline: "12 months",
    budget: "$75K - $150K",
    industry: "CleanTech",
  },
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our <span className="text-yellow-400">Success Stories</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive portfolio of successful marketing campaigns that have driven exceptional growth
              for businesses across various industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {allProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white border-2 border-gray-100 hover:border-yellow-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                        {project.category}
                      </span>
                    </div>

                    {/* Industry Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        {project.industry}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-bold">Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                    {/* Client Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-black font-bold">{project.client.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{project.client}</p>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Calendar className="w-3 h-3" />
                          <span>{project.timeline}</span>
                          <span>•</span>
                          <span>{project.budget}</span>
                        </div>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-700 font-medium mb-2">Key Results:</p>
                      <p className="text-sm text-gray-600">{project.results}</p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {Object.entries(project.metrics)
                        .slice(0, 4)
                        .map(([key, value], index) => (
                          <div key={index} className="text-center bg-white border border-gray-200 rounded-lg p-3">
                            <div className="text-lg font-bold text-yellow-600">{value}</div>
                            <div className="text-gray-500 text-xs capitalize">{key.replace("_", " ")}</div>
                          </div>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-full font-semibold">
                      View Full Case Study
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Be Our Next <span className="text-yellow-400">Success Story?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar results and accelerate your business growth.
            </p>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-12 py-4 text-lg rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300">
              Schedule Free Strategy Call
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
