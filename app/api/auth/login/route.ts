import { type NextRequest, NextResponse } from "next/server"

// Mock user database - replace with actual Oracle APEX REST API calls
const mockUsers = [
  {
    id: "1",
    email: "super@edumanage.com",
    password: "demo123",
    name: "Super Administrator",
    role: "super_admin",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    email: "admin@school.com",
    password: "demo123",
    name: "School Administrator",
    role: "school_admin",
    schoolId: "school_1",
    schoolName: "Greenwood High School",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    email: "teacher@school.com",
    password: "demo123",
    name: "John Teacher",
    role: "teacher",
    schoolId: "school_1",
    schoolName: "Greenwood High School",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    email: "student@school.com",
    password: "demo123",
    name: "Jane Student",
    role: "student",
    schoolId: "school_1",
    schoolName: "Greenwood High School",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    email: "parent@school.com",
    password: "demo123",
    name: "Parent Smith",
    role: "parent",
    schoolId: "school_1",
    schoolName: "Greenwood High School",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user in mock database
    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate mock JWT token
    const token = `mock_jwt_token_${user.id}_${Date.now()}`

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
