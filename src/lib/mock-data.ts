// Enhanced mock data system for Afronaut Ticketing

// Types
export interface Event {
  id: string
  title: string
  description: string
  image: string
  venue: string
  location: string
  startDate: string
  endDate: string
  status: 'active' | 'draft' | 'cancelled' | 'completed'
  agencyId: string
  agencyName: string
  artist: string
  genre: string
  categories: EventCategory[]
  tags: string[]
  ageRestriction?: string | null
  totalRevenue: number
  createdAt: string
  updatedAt: string
}

export interface EventCategory {
  id: string
  name: string
  price: number
  currency: string
  totalTickets: number
  soldTickets: number
  availableTickets: number
  description: string
  benefits: string[]
}

export interface Ticket {
  id: string
  eventId: string
  eventTitle: string
  eventImage: string
  categoryId: string
  categoryName: string
  userId: string
  userName: string
  userEmail: string
  ticketCode: string
  qrCode: string
  status: 'active' | 'used' | 'expired' | 'cancelled'
  price: number
  currency: string
  purchaseDate: string
  venue: string
  location: string
  eventDate: string
  seatInfo: string
  benefits: string[]
  transferable: boolean
  refundable: boolean
  validFrom: string
  validUntil: string
  scannedAt?: string | null
  scannedBy?: string | null
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'agency' | 'employee' | 'user'
  avatar: string
  phone: string
  location: string
  dateJoined: string
  isVerified: boolean
  permissions?: string[]
  companyInfo?: {
    companyName: string
    businessLicense: string
    taxId: string
    website: string
    description: string
  }
  preferences?: {
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
    }
    privacy: {
      profileVisibility: string
      activitySharing: boolean
    }
    interests?: string[]
  }
  stats: Record<string, number>
  employees?: Employee[]
}

export interface Employee {
  id: string
  name: string
  email: string
  role: 'employee'
  position: string
  assignedEvents: string[]
  scansCount: number
  dateHired: string
}

export interface PlatformStats {
  totalUsers: number
  totalAgencies: number
  totalEvents: number
  totalTicketsSold: number
  totalRevenue: number
  activeEvents: number
  upcomingEvents: number
  pendingApprovals: number
  monthlyGrowth: {
    users: number
    revenue: number
    events: number
    agencies: number
  }
}

// Enhanced Mock Data
export const mockEvents: Event[] = [
  {
    id: "evt-001",
    title: "Summer Music Festival 2025",
    description: "Join us for the biggest music festival of the year featuring top artists from around the world. Experience three days of non-stop entertainment with multiple stages, food vendors, and amazing vibes.",
    image: "/summer-music-festival.png",
    venue: "Central Park Arena",
    location: "New York, NY",
    startDate: "2025-07-15T18:00:00Z",
    endDate: "2025-07-17T23:00:00Z",
    status: "active",
    agencyId: "agency-001",
    agencyName: "Event Masters",
    artist: "Various Artists",
    genre: "Music",
    categories: [
      {
        id: "cat-001",
        name: "VIP Package",
        price: 299.99,
        currency: "USD",
        totalTickets: 500,
        soldTickets: 342,
        availableTickets: 158,
        description: "VIP access with backstage meet & greet, premium seating, and complimentary drinks",
        benefits: ["Backstage access", "Meet & greet", "Premium seating", "Free drinks", "VIP parking"]
      },
      {
        id: "cat-002",
        name: "General Admission",
        price: 89.99,
        currency: "USD",
        totalTickets: 2000,
        soldTickets: 1456,
        availableTickets: 544,
        description: "Standard entry with access to all stages and general seating areas",
        benefits: ["Access to all stages", "General seating", "Festival merchandise discount"]
      }
    ],
    tags: ["music", "festival", "outdoor", "multi-day"],
    ageRestriction: "18+",
    totalRevenue: 232890.42,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-10-06T14:30:00Z"
  },
  {
    id: "evt-002",
    title: "Tech Conference 2025: AI & Future",
    description: "The premier technology conference focusing on artificial intelligence, machine learning, and the future of tech. Network with industry leaders and learn from the best.",
    image: "/tech-conference.png",
    venue: "Convention Center",
    location: "San Francisco, CA",
    startDate: "2025-11-20T09:00:00Z",
    endDate: "2025-11-22T18:00:00Z",
    status: "active",
    agencyId: "agency-002",
    agencyName: "Tech Events Pro",
    artist: "Tech Industry Leaders",
    genre: "Technology",
    categories: [
      {
        id: "cat-004",
        name: "All-Access Pass",
        price: 899.99,
        currency: "USD",
        totalTickets: 200,
        soldTickets: 145,
        availableTickets: 55,
        description: "Complete access to all sessions, workshops, networking events, and exclusive meetups",
        benefits: ["All sessions", "Workshops", "Networking events", "Exclusive meetups", "Conference materials", "Premium lunch"]
      },
      {
        id: "cat-005",
        name: "Conference Only",
        price: 449.99,
        currency: "USD",
        totalTickets: 800,
        soldTickets: 623,
        availableTickets: 177,
        description: "Access to main conference sessions and general networking",
        benefits: ["Main sessions", "General networking", "Conference app access", "Standard lunch"]
      }
    ],
    tags: ["technology", "conference", "AI", "networking", "professional"],
    ageRestriction: null,
    totalRevenue: 456789.23,
    createdAt: "2025-02-10T10:00:00Z",
    updatedAt: "2025-10-05T16:45:00Z"
  },
  {
    id: "evt-003",
    title: "Gourmet Food & Wine Expo",
    description: "Indulge in a culinary adventure featuring world-class chefs, premium wines, and gourmet food tastings from around the globe.",
    image: "/food-wine-expo.png",
    venue: "Grand Exhibition Hall",
    location: "Chicago, IL",
    startDate: "2025-12-05T12:00:00Z",
    endDate: "2025-12-07T22:00:00Z",
    status: "active",
    agencyId: "agency-001",
    agencyName: "Event Masters",
    artist: "Celebrity Chefs",
    genre: "Food & Drink",
    categories: [
      {
        id: "cat-007",
        name: "Premium Tasting",
        price: 179.99,
        currency: "USD",
        totalTickets: 400,
        soldTickets: 298,
        availableTickets: 102,
        description: "Unlimited tastings, wine pairings, and chef demonstrations",
        benefits: ["Unlimited tastings", "Wine pairings", "Chef demos", "Recipe cards", "Priority seating"]
      }
    ],
    tags: ["food", "wine", "tasting", "culinary", "gourmet"],
    ageRestriction: "21+",
    totalRevenue: 93567.02,
    createdAt: "2025-03-01T10:00:00Z",
    updatedAt: "2025-10-06T12:00:00Z"
  },
  {
    id: "evt-004",
    title: "Rock Concert: Thunder Live",
    description: "Experience the electrifying performance of Thunder, the legendary rock band, in an intimate venue setting.",
    image: "/rock-concert-stage-lights-crowd.jpg",
    venue: "Music Hall",
    location: "Austin, TX",
    startDate: "2025-10-25T20:00:00Z",
    endDate: "2025-10-25T23:30:00Z",
    status: "active",
    agencyId: "agency-003",
    agencyName: "Rock Promotions",
    artist: "Thunder",
    genre: "Rock",
    categories: [
      {
        id: "cat-009",
        name: "Front Row",
        price: 199.99,
        currency: "USD",
        totalTickets: 50,
        soldTickets: 48,
        availableTickets: 2,
        description: "Front row seats with the best view of the stage",
        benefits: ["Front row seating", "Meet & greet opportunity", "Signed merchandise", "Premium sound"]
      },
      {
        id: "cat-010",
        name: "General Standing",
        price: 75.99,
        currency: "USD",
        totalTickets: 1200,
        soldTickets: 892,
        availableTickets: 308,
        description: "Standing room access to the main floor",
        benefits: ["Standing access", "Full venue access", "Merchandise discount"]
      }
    ],
    tags: ["rock", "concert", "live music", "indoor"],
    ageRestriction: "16+",
    totalRevenue: 87432.18,
    createdAt: "2025-04-15T10:00:00Z",
    updatedAt: "2025-10-06T09:15:00Z"
  }
]

export const mockTickets: Ticket[] = [
  {
    id: "tkt-001",
    eventId: "evt-001",
    eventTitle: "Summer Music Festival 2025",
    eventImage: "/summer-music-festival.png",
    categoryId: "cat-001",
    categoryName: "VIP Package",
    userId: "user-001",
    userName: "Jane Doe",
    userEmail: "user@afronaut.com",
    ticketCode: "SMF2025-VIP-001",
    qrCode: "/qr-code.png",
    status: "active",
    price: 299.99,
    currency: "USD",
    purchaseDate: "2025-06-15T14:30:00Z",
    venue: "Central Park Arena",
    location: "New York, NY",
    eventDate: "2025-07-15T18:00:00Z",
    seatInfo: "VIP Section A, Row 1",
    benefits: ["Backstage access", "Meet & greet", "Premium seating", "Free drinks", "VIP parking"],
    transferable: true,
    refundable: false,
    validFrom: "2025-07-15T16:00:00Z",
    validUntil: "2025-07-17T23:59:00Z",
    scannedAt: null,
    scannedBy: null
  },
  {
    id: "tkt-002",
    eventId: "evt-002",
    eventTitle: "Tech Conference 2025: AI & Future",
    eventImage: "/tech-conference.png",
    categoryId: "cat-005",
    categoryName: "Conference Only",
    userId: "user-001",
    userName: "Jane Doe",
    userEmail: "user@afronaut.com",
    ticketCode: "TECH2025-CONF-002",
    qrCode: "/qr-code.png",
    status: "active",
    price: 449.99,
    currency: "USD",
    purchaseDate: "2025-09-10T09:20:00Z",
    venue: "Convention Center",
    location: "San Francisco, CA",
    eventDate: "2025-11-20T09:00:00Z",
    seatInfo: "Section B, Seat 45",
    benefits: ["Main sessions", "General networking", "Conference app access", "Standard lunch"],
    transferable: true,
    refundable: true,
    validFrom: "2025-11-20T08:00:00Z",
    validUntil: "2025-11-22T19:00:00Z",
    scannedAt: null,
    scannedBy: null
  }
]

export const mockUsers: User[] = [
  {
    id: "user-001",
    name: "Jane Doe",
    email: "user@afronaut.com",
    role: "user",
    avatar: "/placeholder-user.jpg",
    phone: "+1-555-0123",
    location: "New York, NY",
    dateJoined: "2024-06-15T10:00:00Z",
    isVerified: true,
    preferences: {
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      privacy: {
        profileVisibility: "public",
        activitySharing: false
      },
      interests: ["music", "technology", "food"]
    },
    stats: {
      eventsAttended: 12,
      totalSpent: 1245.67,
      favoriteEvents: 8,
      reviewsGiven: 5
    }
  },
  {
    id: "agency-001",
    name: "Event Masters",
    email: "agency@afronaut.com",
    role: "agency",
    avatar: "/placeholder-logo.png",
    phone: "+1-555-1001",
    location: "New York, NY",
    dateJoined: "2024-02-15T10:00:00Z",
    isVerified: true,
    companyInfo: {
      companyName: "Event Masters LLC",
      businessLicense: "BL-123456789",
      taxId: "TAX-987654321",
      website: "https://eventmasters.com",
      description: "Premier event management company specializing in large-scale festivals and corporate events."
    },
    stats: {
      eventsCreated: 25,
      eventsCount: 25,
      isActive: 1,
      totalRevenue: 456789.23,
      activeEvents: 8,
      employeesManaged: 12
    },
    employees: [
      {
        id: "emp-001",
        name: "John Scanner",
        email: "employee@afronaut.com",
        role: "employee",
        position: "Ticket Scanner",
        assignedEvents: ["evt-001", "evt-003"],
        scansCount: 1250,
        dateHired: "2024-03-01T10:00:00Z"
      }
    ]
  },
  {
    id: "agency-002",
    name: "Tech Events Pro",
    email: "agency2@afronaut.com",
    role: "agency",
    avatar: "/placeholder-logo.png",
    phone: "+1-555-2002",
    location: "San Francisco, CA",
    dateJoined: "2024-05-10T10:00:00Z",
    isVerified: true,
    companyInfo: {
      companyName: "Tech Events Pro Inc.",
      businessLicense: "BL-222333444",
      taxId: "TAX-222333444",
      website: "https://techeventspro.com",
      description: "Technology conferences and professional networking events."
    },
    stats: {
      eventsCreated: 12,
      eventsCount: 12,
      isActive: 1,
      totalRevenue: 789123.45,
      activeEvents: 3,
      employeesManaged: 6
    }
  },
  {
    id: "employee-001",
    name: "John Scanner",
    email: "employee@afronaut.com",
    role: "employee",
    avatar: "/placeholder-user.jpg",
    phone: "+1-555-2222",
    location: "Austin, TX",
    dateJoined: "2024-03-01T10:00:00Z",
    isVerified: true,
    stats: {
      eventsAssigned: 2,
      scansToday: 0,
    } as unknown as Record<string, number>
  },
  {
    id: "admin-001",
    name: "System Admin",
    email: "admin@afronaut.com",
    role: "admin",
    avatar: "/placeholder-user.jpg",
    phone: "+1-555-0000",
    location: "Remote",
    dateJoined: "2023-01-01T09:00:00Z",
    isVerified: true,
    stats: {
      platformsManaged: 1,
    } as unknown as Record<string, number>
  }
]

export const mockStats: PlatformStats = {
  totalUsers: 12500,
  totalAgencies: 15,
  totalEvents: 234,
  totalTicketsSold: 45678,
  totalRevenue: 2450000,
  activeEvents: 25,
  upcomingEvents: 18,
  pendingApprovals: 3,
  monthlyGrowth: {
    users: 12.5,
    revenue: 18.7,
    events: 8.3,
    agencies: 6.7
  }
}

// Derived data for backward compatibility
export const mockAgencies = mockUsers.filter(user => user.role === 'agency')
export const mockEmployees = mockUsers
  .filter(user => user.role === 'agency')
  .flatMap(agency => agency.employees || [])

// Utility functions
export const getEventById = (id: string): Event | undefined => {
  return mockEvents.find(event => event.id === id)
}

export const getTicketById = (id: string): Ticket | undefined => {
  return mockTickets.find(ticket => ticket.id === id)
}

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id)
}

export const getEventsByAgency = (agencyId: string): Event[] => {
  return mockEvents.filter(event => event.agencyId === agencyId)
}

export const getTicketsByUser = (userId: string): Ticket[] => {
  return mockTickets.filter(ticket => ticket.userId === userId)
}

export const getActiveEvents = (): Event[] => {
  return mockEvents.filter(event => event.status === 'active')
}

export const getUpcomingEvents = (): Event[] => {
  const now = new Date()
  return mockEvents.filter(event => {
    const eventDate = new Date(event.startDate)
    return eventDate > now && event.status === 'active'
  })
}

export const searchEvents = (query: string, filters?: {
  genre?: string
  location?: string
  priceRange?: [number, number]
  dateRange?: [string, string]
}): Event[] => {
  let filteredEvents = mockEvents

  // Text search
  if (query) {
    const searchTerm = query.toLowerCase()
    filteredEvents = filteredEvents.filter(event =>
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.artist.toLowerCase().includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  }

  // Apply filters
  if (filters) {
    if (filters.genre) {
      filteredEvents = filteredEvents.filter(event =>
        event.genre.toLowerCase() === filters.genre!.toLowerCase()
      )
    }

    if (filters.location) {
      filteredEvents = filteredEvents.filter(event =>
        event.location.toLowerCase().includes(filters.location!.toLowerCase())
      )
    }

    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange
      filteredEvents = filteredEvents.filter(event =>
        event.categories.some(cat =>
          cat.price >= minPrice && cat.price <= maxPrice
        )
      )
    }

    if (filters.dateRange) {
      const [startDate, endDate] = filters.dateRange
      filteredEvents = filteredEvents.filter(event => {
        const eventDate = new Date(event.startDate)
        return eventDate >= new Date(startDate) && eventDate <= new Date(endDate)
      })
    }
  }

  return filteredEvents
}

// Mock API response helpers
export const createMockApiResponse = <T>(data: T, delay: number = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}

export const createMockApiError = (message: string, delay: number = 500): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay)
  })
}

// Mock authentication password for demo purposes
// Demo password for all accounts (same as auth-store)
export const MOCK_PASSWORD = "password123"