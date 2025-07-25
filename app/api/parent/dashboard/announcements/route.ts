import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock parent announcements data - replace with actual Oracle APEX REST API calls
    const announcements = [
      {
        id: "1",
        title: "Parent-Teacher Conference",
        message: "Scheduled for next week. Please confirm your attendance.",
        date: "2024-01-22",
        priority: "high",
      },
      {
        id: "2",
        title: "School Sports Day",
        message: "Annual sports day will be held on February 15th.",
        date: "2024-01-20",
        priority: "medium",
      },
      {
        id: "3",
        title: "Library Book Return",
        message: "Please ensure all library books are returned by month end.",
        date: "2024-01-18",
        priority: "low",
      },
    ]

    return NextResponse.json({ announcements })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
