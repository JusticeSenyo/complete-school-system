import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json()
    if (!email || !code) {
      return NextResponse.json({ success: false, error: "Missing email or code" }, { status: 400 })
    }

    const stored = globalThis.verificationCodes?.[email]
    if (!stored) return NextResponse.json({ success: false, error: "No code found" })

    if (Date.now() > stored.expires) {
      return NextResponse.json({ success: false, error: "Code expired" })
    }

    if (stored.code !== code) {
      return NextResponse.json({ success: false, error: "Invalid code" })
    }

    // ✅ Verified
    delete globalThis.verificationCodes[email]
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in verify-code route:", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
