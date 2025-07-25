import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock stats data - replace with actual Oracle APEX REST API calls
    const stats = {
      totalSchools: 45,
      totalUsers: 12500,
      monthlyRevenue: 125000,
      activeSubscriptions: 42,
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
