"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function AboutTeamSection() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="relative">
              <div className="absolute -inset-4 bg-yellow-400/20 rounded-lg blur-xl"></div>
              <Image
                src="https://placehold.co/800x600/f3f4f6/9ca3af?text=Our+Amazing+Team"
                alt="About our team"
                width={800}
                height={600}
                className="rounded-lg relative z-10"
              />
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-4xl font-bold mb-6">
              About Our <span className="text-yellow-400">Team</span>
            </h2>
            <p className="text-lg mb-6">
              We are a team of AI experts, marketers, and creatives dedicated to revolutionizing how businesses connect
              with their audiences through artificial intelligence.
            </p>
            <p className="mb-6">
              Founded in 2020, our agency has helped over 200 businesses implement AI-driven marketing strategies that
              deliver measurable results. Our approach combines cutting-edge technology with human creativity.
            </p>
            <p className="mb-8">
              Our philosophy centers on ethical AI implementation, transparent processes, and delivering real value to
              our clients through innovative solutions that drive growth and engagement.
            </p>
            <Link href="/about">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Meet Our Team & Philosophy</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
