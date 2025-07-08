"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const portfolioProjects = [
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
  },
]

export function PortfolioSection() {
  const featuredProject = portfolioProjects.find((p) => p.featured)
  const otherProjects = portfolioProjects.filter((p) => !p.featured)

  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(250,204,21,0.05),transparent_50%)]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
            Success Stories
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
            Discover how we've helped businesses achieve remarkable growth through strategic AI-powered marketing
            campaigns
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Featured Project - Large Card */}
          {featuredProject && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 group cursor-pointer"
            >
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Image Section */}
                <div className="relative h-48 md:h-80 overflow-hidden">
                  <Image
                    src={featuredProject.image || "/placeholder.svg"}
                    alt={featuredProject.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Featured Badge */}
                  <div className="absolute top-4 md:top-6 left-4 md:left-6">
                    <span className="bg-yellow-400 text-black px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold">
                      Featured Case Study
                    </span>
                  </div>

                  {/* Category */}
                  <div className="absolute top-4 md:top-6 right-4 md:right-6">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium">
                      {featuredProject.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 md:p-8 text-white">
                  <div className="flex items-center gap-4 mb-3 md:mb-4">
                    <h3 className="text-xl md:text-3xl font-bold">{featuredProject.title}</h3>
                  </div>

                  <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-lg leading-relaxed">
                    {featuredProject.description}
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm md:text-lg">
                        {featuredProject.client.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm md:text-base">{featuredProject.client}</p>
                      <p className="text-gray-400 text-xs md:text-sm">
                        {featuredProject.timeline} • {featuredProject.budget}
                      </p>
                    </div>
                  </div>

                  {/* Key Results */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
                    <h4 className="text-yellow-400 font-bold mb-2 md:mb-3 text-sm md:text-base">Key Results</h4>
                    <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">{featuredProject.results}</p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      <div className="text-center">
                        <div className="text-lg md:text-2xl font-bold text-yellow-400 mb-1">
                          {featuredProject.metrics.revenue}
                        </div>
                        <div className="text-gray-400 text-xs md:text-sm">Revenue Growth</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg md:text-2xl font-bold text-yellow-400 mb-1">
                          {featuredProject.metrics.roas}
                        </div>
                        <div className="text-gray-400 text-xs md:text-sm">ROAS</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg md:text-2xl font-bold text-yellow-400 mb-1">
                          {featuredProject.metrics.conversion}
                        </div>
                        <div className="text-gray-400 text-xs md:text-sm">Conversion Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg md:text-2xl font-bold text-yellow-400 mb-1">
                          {featuredProject.metrics.traffic}
                        </div>
                        <div className="text-gray-400 text-xs md:text-sm">Traffic Growth</div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                    {featuredProject.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 md:px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs md:text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-500 rounded-full px-6 md:px-8 py-2 md:py-3 font-bold inline-flex items-center justify-center gap-2 group-hover:scale-105 transition-transform text-sm md:text-base">
                    View Full Case Study
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other Projects - Smaller Cards */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white border-2 border-gray-100 hover:border-yellow-300 rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-32 md:h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-2 md:top-3 right-2 md:right-3">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 md:px-3 py-1 rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Client */}
                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-xs md:text-sm">{project.client.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-xs md:text-sm text-gray-900">{project.client}</p>
                        <p className="text-gray-500 text-xs">{project.timeline}</p>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4">
                      {Object.entries(project.metrics)
                        .slice(0, 2)
                        .map(([key, value]) => (
                          <div key={key} className="text-center bg-gray-50 rounded-lg p-2">
                            <div className="text-sm md:text-lg font-bold text-yellow-600">{value}</div>
                            <div className="text-gray-500 text-xs capitalize">
                              {key === "roas" ? "ROAS" : key.replace(/([A-Z])/g, " $1")}
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Button */}
                    <Button className="w-full bg-gray-900 text-white hover:bg-yellow-400 hover:text-black rounded-lg py-2 font-semibold text-xs md:text-sm transition-all duration-300">
                      View Case Study
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/portfolio">
            <Button className="bg-black text-white hover:bg-yellow-400 hover:text-black px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold rounded-full inline-flex items-center gap-2 md:gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <span>View All Case Studies</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
