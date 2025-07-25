import { type NextRequest, NextResponse } from "next/server"

const mockSchools = [
  {
    id: "1",
    name: "Greenwood High School",
    adminName: "John Smith",
    adminEmail: "john@greenwood.edu",
    students: 850,
    teachers: 45,
    plan: "Premium",
    status: "active",
    createdAt: "2024-01-15",
    lastLogin: "2024-01-20",
  },
  {
    id: "2",
    name: "Riverside Academy",
    adminName: "Sarah Johnson",
    adminEmail: "sarah@riverside.edu",
    students: 620,
    teachers: 32,
    plan: "Standard",
    status: "active",
    createdAt: "2024-01-10",
    lastLogin: "2024-01-19",
  },
  {
    id: "3",
    name: "Mountain View School",
    adminName: "Mike Davis",
    adminEmail: "mike@mountainview.edu",
    students: 450,
    teachers: 28,
    plan: "Basic",
    status: "active",
    createdAt: "2024-01-08",
    lastLogin: "2024-01-18",
  },
  {
    id: "4",
    name: "Sunset Elementary",
    adminName: "Lisa Brown",
    adminEmail: "lisa@sunset.edu",
    students: 320,
    teachers: 18,
    plan: "Basic",
    status: "inactive",
    createdAt: "2023-12-20",
    lastLogin: "2024-01-05",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")

    let schools = mockSchools

    if (limit) {
      schools = schools.slice(0, Number.parseInt(limit))
    }

    return NextResponse.json({ schools })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const schoolData = await request.json()

    // Mock school creation - replace with actual Oracle APEX REST API calls
    console.log("Creating new school:", schoolData)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newSchool = {
      id: `school_${Date.now()}`,
      ...schoolData,
      status: "active",
      createdAt: new Date().toISOString(),
      students: 0,
      teachers: 0,
    }

    return NextResponse.json({
      message: "School created successfully",
      school: newSchool,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
