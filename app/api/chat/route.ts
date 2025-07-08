import { type NextRequest, NextResponse } from "next/server"

const botResponses: Record<string, string> = {
  "what services do you offer?":
    "We offer AI-powered content marketing, marketing automation, paid media management, marketing analytics, social media marketing, and SEO services. Each service is designed to maximize your ROI and accelerate business growth.",
  "how much does marketing automation cost?":
    "Our marketing automation starts from $899/month. The exact price depends on your specific needs, company size, and required features. We offer flexible pricing plans to fit different budgets.",
  "can you help with seo?":
    "Our AI-powered SEO service includes keyword research, technical optimization, content optimization, and link building. We've helped clients increase organic traffic by up to 300%.",
  "what's your average roi?":
    "Our clients typically see an average ROI of 280-420% depending on the service. Marketing automation shows the highest ROI at 420%, while our comprehensive approach ensures sustainable growth.",
  "do you work with small businesses?":
    "Yes! We work with businesses of all sizes, from startups to enterprises. Our flexible pricing and scalable solutions make our services accessible to small businesses looking to grow.",
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, sessionId } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Normalize the message for matching
    const normalizedMessage = message.toLowerCase().trim()

    // Find matching response
    let response =
      botResponses.default ||
      "Thank you for your question! Our team will get back to you soon with a detailed answer. In the meantime, feel free to explore our services or schedule a free consultation."

    for (const [key, value] of Object.entries(botResponses)) {
      if (normalizedMessage.includes(key.toLowerCase())) {
        response = value
        break
      }
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
      sessionId: sessionId || `session_${Date.now()}`,
    })
  } catch (error) {
    console.error("Error processing chat message:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
