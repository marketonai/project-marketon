// Database utility functions and types
// This would typically connect to your actual database (PostgreSQL, MongoDB, etc.)

export interface Lead {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  message?: string
  source: string
  status: "new" | "contacted" | "qualified" | "converted" | "lost"
  createdAt: string
  updatedAt: string
}

export interface Service {
  id: number
  title: string
  description: string
  pricing: string
  timeline: string
  roi: string
  features: string[]
  isActive: boolean
}

export interface ChatSession {
  id: string
  userId?: string
  messages: ChatMessage[]
  createdAt: string
  updatedAt: string
}

export interface ChatMessage {
  id: string
  sessionId: string
  content: string
  sender: "user" | "bot"
  timestamp: string
}

export interface AnalyticsEvent {
  id: string
  event: string
  page: string
  userId: string
  properties: Record<string, any>
  timestamp: string
  userAgent?: string
  ip?: string
}

// Mock database functions - replace with actual database calls
export class Database {
  // Leads
  static async createLead(leadData: Omit<Lead, "id" | "createdAt" | "updatedAt">): Promise<Lead> {
    const lead: Lead = {
      id: `lead_${Date.now()}`,
      ...leadData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In production: await db.leads.create(lead)
    console.log("Creating lead:", lead)
    return lead
  }

  static async getLeads(filters?: { status?: string; source?: string }): Promise<Lead[]> {
    // In production: return await db.leads.findMany({ where: filters })
    return []
  }

  static async updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
    // In production: return await db.leads.update({ where: { id }, data: updates })
    return null
  }

  // Services
  static async getServices(): Promise<Service[]> {
    // In production: return await db.services.findMany({ where: { isActive: true } })
    return []
  }

  static async getService(id: number): Promise<Service | null> {
    // In production: return await db.services.findUnique({ where: { id } })
    return null
  }

  // Chat
  static async createChatSession(userId?: string): Promise<ChatSession> {
    const session: ChatSession = {
      id: `session_${Date.now()}`,
      userId,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In production: await db.chatSessions.create(session)
    return session
  }

  static async addChatMessage(sessionId: string, content: string, sender: "user" | "bot"): Promise<ChatMessage> {
    const message: ChatMessage = {
      id: `msg_${Date.now()}`,
      sessionId,
      content,
      sender,
      timestamp: new Date().toISOString(),
    }

    // In production: await db.chatMessages.create(message)
    return message
  }

  // Analytics
  static async trackEvent(eventData: Omit<AnalyticsEvent, "id" | "timestamp">): Promise<AnalyticsEvent> {
    const event: AnalyticsEvent = {
      id: `event_${Date.now()}`,
      ...eventData,
      timestamp: new Date().toISOString(),
    }

    // In production: await db.analyticsEvents.create(event)
    return event
  }

  static async getAnalytics(dateRange?: { start: string; end: string }) {
    // In production: complex analytics queries
    return {
      totalVisitors: 0,
      totalLeads: 0,
      conversionRate: 0,
      topPages: [],
    }
  }
}

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

// Error handling
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
  ) {
    super(message)
    this.name = "DatabaseError"
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
  ) {
    super(message)
    this.name = "ValidationError"
  }
}
