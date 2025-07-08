import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const services = [
      {
        id: 1,
        title: "AI Content Marketing",
        description:
          "Create compelling content that converts with AI-powered writing, SEO optimization, and brand voice consistency.",
        pricing: "$1,299/month",
        timeline: "2-3 weeks",
        roi: "320%",
        features: [
          "AI-powered content generation",
          "SEO optimization & keyword research",
          "Brand voice consistency",
          "Multi-platform content adaptation",
        ],
      },
      {
        id: 2,
        title: "Marketing Automation",
        description:
          "Automate your marketing workflows with intelligent lead nurturing, email sequences, and customer journeys.",
        pricing: "$899/month",
        timeline: "3-4 weeks",
        roi: "420%",
        features: [
          "Lead scoring & qualification",
          "Automated email sequences",
          "Behavioral trigger campaigns",
          "CRM integration & management",
        ],
      },
      {
        id: 3,
        title: "Paid Media Management",
        description:
          "Maximize ROI with AI-optimized ad campaigns across Google, Facebook, Instagram, and LinkedIn platforms.",
        pricing: "$1,599/month",
        timeline: "1-2 weeks",
        roi: "380%",
        features: [
          "Multi-platform campaign management",
          "AI-powered bid optimization",
          "Advanced audience targeting",
          "Creative testing & optimization",
        ],
      },
      {
        id: 4,
        title: "Marketing Analytics",
        description:
          "Transform data into actionable insights with predictive analytics, attribution modeling, and performance forecasting.",
        pricing: "$799/month",
        timeline: "2-3 weeks",
        roi: "290%",
        features: [
          "Advanced tracking setup",
          "Custom dashboard creation",
          "Predictive analytics modeling",
          "Attribution analysis",
        ],
      },
      {
        id: 5,
        title: "Social Media Marketing",
        description:
          "Build engaged communities with viral content creation, influencer outreach, and social media automation.",
        pricing: "$1,199/month",
        timeline: "1-2 weeks",
        roi: "350%",
        features: [
          "Content creation & curation",
          "Community management",
          "Influencer partnerships",
          "Social media advertising",
        ],
      },
      {
        id: 6,
        title: "SEO & Digital Marketing",
        description:
          "Dominate search results with AI-powered keyword research, content optimization, and link building strategies.",
        pricing: "$999/month",
        timeline: "2-4 weeks",
        roi: "310%",
        features: [
          "Technical SEO optimization",
          "Keyword research & strategy",
          "Content optimization",
          "Link building campaigns",
        ],
      },
    ]

    return NextResponse.json({ services })
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, service, message } = body

    // Validate required fields
    if (!name || !email || !service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Here you would typically save to database
    // For now, we'll just simulate a successful response
    const lead = {
      id: Date.now(),
      name,
      email,
      service,
      message: message || "",
      createdAt: new Date().toISOString(),
      status: "new",
    }

    return NextResponse.json({
      success: true,
      message: "Service inquiry submitted successfully",
      lead,
    })
  } catch (error) {
    console.error("Error creating service inquiry:", error)
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 })
  }
}
