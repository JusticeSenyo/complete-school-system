import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock student schedule data - replace with actual Oracle APEX REST API calls
    const schedule = [
      {
        id: "1",
        subject: "Mathematics",
        teacher: "Mr. Johnson",
        time: "09:00 - 09:45",
        room: "Room 101",
        type: "class",
      },
      {
        id: "2",
        subject: "Physics",
        teacher: "Dr. Smith",
        time: "10:00 - 10:45",
        room: "Lab 201",
        type: "lab",
      },
      {
        id: "3",
        subject: "English",
        teacher: "Ms. Davis",
        time: "11:00 - 11:45",
        room: "Room 205",
        type: "class",
      },
      {
        id: "4",
        subject: "Chemistry",
        teacher: "Dr. Wilson",
        time: "14:00 - 15:30",
        room: "Lab 301",
        type: "exam",
      },
    ]

    return NextResponse.json({ schedule })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
