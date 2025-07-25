import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock teacher activity data - replace with actual Oracle APEX REST API calls
    const activities = [
      {
        id: "1",
        type: "attendance",
        message: "Attendance marked for Grade 10A - 28/30 present",
        timestamp: "2024-01-20T09:45:00Z",
      },
      {
        id: "2",
        type: "grade",
        message: "Grades submitted for Mathematics Quiz - Grade 10B",
        timestamp: "2024-01-19T16:30:00Z",
      },
      {
        id: "3",
        type: "assignment",
        message: "New assignment created: Quadratic Equations",
        timestamp: "2024-01-19T14:20:00Z",
      },
      {
        id: "4",
        type: "announcement",
        message: "Announced: Extra class on Friday for Grade 11A",
        timestamp: "2024-01-18T11:15:00Z",
      },
    ]

    return NextResponse.json({ activities })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
