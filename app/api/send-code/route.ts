import { NextResponse } from "next/server"
import { sendVerificationCode } from "@/lib/sendEmail"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ success: false, error: "Email required" }, { status: 400 })

    // Generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    // Save code temporarily (for demo, just in memory – replace with DB or Redis)
    globalThis.verificationCodes = globalThis.verificationCodes || {}
    globalThis.verificationCodes[email] = { code, expires: Date.now() + 5 * 60 * 1000 } // expires in 5 min

    const result = await sendVerificationCode(email, code)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in send-code route:", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
