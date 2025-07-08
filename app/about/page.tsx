"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Award, Users, TrendingUp, Target, Lightbulb, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "CEO & Marketing Strategist",
    image: "https://placehold.co/400x400/f3f4f6/9ca3af?text=Sarah+Chen",
    bio: "Former VP of Marketing at Google with 15+ years of experience in digital marketing and AI implementation.",
    expertise: ["Strategic Planning", "AI Marketing", "Growth Hacking"],
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of AI & Analytics",
    image: "https://placehold.co/400x400/f3f4f6/9ca3af?text=Marcus+Rodriguez",
    bio: "PhD in Machine Learning from Stanford, previously led AI initiatives at Facebook and Tesla.",
    expertise: ["Machine Learning", "Predictive Analytics", "Data Science"],
  },
  {
    name: "Emily Thompson",
    role: "Creative Director",
    image: "https://placehold.co/400x400/f3f4f6/9ca3af?text=Emily+Thompson",
    bio: "Award-winning creative director with campaigns for Nike, Apple, and Coca-Cola. Expert in viral content creation.",
    expertise: ["Content Strategy", "Brand Design", "Viral Marketing"],
  },
  {
    name: "David Kim",
    role: "Head of Paid Media",
    image: "https://placehold.co/400x400/f3f4f6/9ca3af?text=David+Kim",
    bio: "Managed $50M+ in ad spend across Google, Facebook, and LinkedIn. Specialized in performance marketing.",
    expertise: ["Paid Advertising", "Performance Marketing", "ROI Optimization"],
  },
  {
    name: "Lisa Wang",
    role: "SEO & Content Specialist",
    image: "https://placehold.co/400x400/f3f4f6/9ca3af?text=Lisa+Wang",
    bio: "SEO expert who has helped 100+ businesses achieve #1 rankings. Content strategist with viral blog posts.",
    expertise: ["SEO Strategy", "Content Marketing", "Technical SEO"],
  },
  {
    name: "Alex Johnson",
    role: "Marketing Automation Lead",
    image: "https://placehold.co/400x400/f3f4f6/9ca3af?text=Alex+Johnson",
    bio: "Automation specialist who has built workflows generating $10M+ in revenue. Expert in customer journey optimization.",
    expertise: ["Marketing Automation", "Email Marketing", "CRM Integration"],
  },
]

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "We measure success by your ROI and business growth, not vanity metrics.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We stay ahead of marketing trends and leverage cutting-edge AI technology.",
  },
  {
    icon: Heart,
    title: "Client Partnership",
    description: "Your success is our success. We work as an extension of your team.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We deliver exceptional quality in every campaign and strategy we execute.",
  },
]

export default function AboutPage() {
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
              Meet Our <span className="text-yellow-400">Expert Team</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're a passionate team of marketing professionals, data scientists, and AI specialists dedicated to
              driving exceptional results for our clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "200+", label: "Successful Campaigns", icon: TrendingUp },
              { number: "450%", label: "Average ROI Increase", icon: Target },
              { number: "50+", label: "Team Members", icon: Users },
              { number: "98%", label: "Client Satisfaction", icon: Award },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-black" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Founded in 2020 with a vision to revolutionize marketing through artificial intelligence
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Marketon AI was born from a simple observation: traditional marketing agencies were struggling to keep
                up with the rapid pace of digital transformation. While businesses were generating more data than ever
                before, most agencies lacked the expertise to turn that data into actionable insights and measurable
                results.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our founders, coming from backgrounds at Google, Facebook, and leading AI research institutions, saw an
                opportunity to bridge this gap. We set out to create a marketing agency that would leverage artificial
                intelligence not as a buzzword, but as a fundamental tool for driving business growth.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Today, we've helped over 200 businesses across various industries achieve remarkable growth through our
                AI-powered marketing strategies. From startups securing Series A funding to established enterprises
                increasing their ROI by 450%, our approach consistently delivers results that exceed expectations.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that the future of marketing lies in the perfect harmony between human creativity and
                artificial intelligence. Our mission is to make this powerful combination accessible to businesses of
                all sizes, helping them compete and thrive in an increasingly digital world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our relationships with clients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experts behind our success - a diverse team of marketing strategists, AI specialists, and
              creative professionals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-80">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-yellow-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-800">Expertise:</p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
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
              Ready to Work with <span className="text-yellow-400">Our Team?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's schedule a call to discuss how our expertise can help accelerate your business growth.
            </p>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-12 py-4 text-lg rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300">
              Schedule Free Consultation
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
