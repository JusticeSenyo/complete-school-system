import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export async function sendVerificationCode(to: string, code: string) {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL as string,
    subject: "Your Verification Code",
    text: `Your verification code is: ${code}`,
    html: `<p>Your verification code is: <strong>${code}</strong></p>`,
  }

  try {
    await sgMail.send(msg)
    return { success: true }
  } catch (error: any) {
    console.error("SendGrid Error:", error.response?.body || error)
    return { success: false, error: "Failed to send email" }
  }
}
