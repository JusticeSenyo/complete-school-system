import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock recent activity data - replace with actual Oracle APEX REST API calls
    const activities = [
      {
        id: "1",
        type: "enrollment",
        message: "New student John Doe enrolled in Grade 10",
        timestamp: "2024-01-20T10:30:00Z",
      },
      {
        id: "2",
        type: "attendance",
        message: "Attendance marked for Grade 9A - 28/30 present",
        timestamp: "2024-01-20T09:15:00Z",
      },
      {
        id: "3",
        type: "announcement",
        message: "New announcement posted: Parent-Teacher Meeting",
        timestamp: "2024-01-19T16:45:00Z",
      },
      {
        id: "4",
        type: "grade",
        message: "Grades updated for Mathematics - Grade 8B",
        timestamp: "2024-01-19T14:20:00Z",
      },
    ]

    return NextResponse.json({ activities })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
