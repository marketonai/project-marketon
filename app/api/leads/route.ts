import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, phone, message, source } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Create lead object
    const lead = {
      id: `lead_${Date.now()}`,
      name,
      email,
      company: company || "",
      phone: phone || "",
      message: message || "",
      source: source || "website",
      status: "new",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Here you would typically save to database
    // For now, we'll simulate a successful response
    console.log("New lead created:", lead)

    return NextResponse.json({
      success: true,
      message: "Lead created successfully",
      leadId: lead.id,
    })
  } catch (error) {
    console.error("Error creating lead:", error)
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // This would typically fetch from database
    // For now, return mock data
    const leads = [
      {
        id: "lead_1",
        name: "John Doe",
        email: "john@example.com",
        company: "Tech Corp",
        status: "new",
        createdAt: new Date().toISOString(),
      },
      {
        id: "lead_2",
        name: "Jane Smith",
        email: "jane@example.com",
        company: "Marketing Inc",
        status: "contacted",
        createdAt: new Date().toISOString(),
      },
    ]

    return NextResponse.json({ leads })
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}
