import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { childId: string } }) {
  try {
    const { childId } = params

    // Mock child performance data - replace with actual Oracle APEX REST API calls
    const performance = {
      childId,
      childName: childId === "1" ? "Emma Smith" : "James Smith",
      recentGrades: [
        { subject: "Mathematics", grade: "A", date: "2024-01-18" },
        { subject: "Physics", grade: "B+", date: "2024-01-17" },
        { subject: "English", grade: "A-", date: "2024-01-15" },
        { subject: "Chemistry", grade: "B", date: "2024-01-14" },
      ],
      upcomingEvents: [
        { type: "exam", title: "Mathematics Final Exam", date: "2024-01-25" },
        { type: "assignment", title: "Physics Lab Report", date: "2024-01-23" },
        { type: "meeting", title: "Parent-Teacher Meeting", date: "2024-01-22" },
      ],
    }

    return NextResponse.json(performance)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
