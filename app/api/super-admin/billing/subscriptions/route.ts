import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock subscriptions data - replace with actual Oracle APEX REST API calls
    const subscriptions = [
      {
        id: "1",
        schoolName: "Greenwood High School",
        plan: "Premium",
        amount: 299,
        status: "active",
        nextBilling: "2024-02-15",
        lastPayment: "2024-01-15",
      },
      {
        id: "2",
        schoolName: "Riverside Academy",
        plan: "Standard",
        amount: 199,
        status: "active",
        nextBilling: "2024-02-10",
        lastPayment: "2024-01-10",
      },
      {
        id: "3",
        schoolName: "Mountain View School",
        plan: "Basic",
        amount: 99,
        status: "pending",
        nextBilling: "2024-02-08",
        lastPayment: "2024-01-08",
      },
      {
        id: "4",
        schoolName: "Sunset Elementary",
        plan: "Basic",
        amount: 99,
        status: "overdue",
        nextBilling: "2024-01-20",
        lastPayment: "2023-12-20",
      },
    ]

    return NextResponse.json({ subscriptions })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
