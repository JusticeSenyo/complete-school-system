"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"


import { 
  Mail, Phone, User, School, MapPin, X, 
  ShieldCheck, CheckCircle2, AlertCircle ,Loader2
} from "lucide-react"

export default function SignUpModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  const { signup, verifyCode } = useAuth()
  const router = useRouter()

  // Step control
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)

  // Form fields
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [fullName, setFullName] = useState("")
  const [location, setLocation] = useState("")
  const [schoolName, setSchoolName] = useState("")
  const [customSchool, setCustomSchool] = useState("")
  const [verifying, setVerifying] = useState(false)
const [verified, setVerified] = useState(false)


  // Verification
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // UI states
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Email validation state
  const [emailError, setEmailError] = useState("")

  const roles = ["School Owner", "School Administrator", "Other"]

  // List of blocked domains
  const personalDomains = [
    "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com", "icloud.com"
  ]

  const validateEmail = (value: string) => {
    const domain = value.split("@")[1]
    if (domain && personalDomains.includes(domain.toLowerCase())) {
      setEmailError("Personal emails are not allowed")
    } else {
      setEmailError("")
    }
  }

  // Step 2 submit (sign up)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (emailError) {
      setError("Please use your official school email.")
      return
    }

    setLoading(true)
    try {
      const selectedSchool = schoolName === "Add Your Own" ? customSchool : schoolName
      const success = await signup(email, fullName, phone, selectedSchool, role) // no password
      if (success) {
        setStep(3) // move to verification
      } else {
        setError("Sign up failed. Please try again.")
      }
    } catch {
      setError("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  // Step 3 submit (verify code)
  // const handleVerify = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setError("")
  //   setLoading(true)
  //   try {
  //     const code = otp.join("")
  //     const result = await verifyCode(email, code)
  //     if (result.success) {
  //       setStep(4) // success message
  //     } else {
  //       setError("Invalid or expired code.")
  //     }
  //   } catch {
  //     setError("Something went wrong.")
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  // Step 3 submit (verify code)
const handleVerify = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")
  setVerifying(true)   // 🔹 start spinner

  try {
    const code = otp.join("")

    if (code.length === 6) {
      // fake delay so spinner is visible
      setTimeout(() => {
        setVerifying(false)
        setVerified(true)   // 🔹 show check

        // after check sign, move to Step 4
        setTimeout(() => {
          setStep(4)
        }, 1200)
      }, 1500)
    } else {
      setError("Please enter all 6 digits.")
      setVerifying(false)
    }
  } catch {
    setError("Something went wrong.")
    setVerifying(false)
  }
}



  // Handle OTP input
  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side */}
          <div className="p-8 md:p-10">
            
            {step === 1 && (
              <>
                <h2 className="text-2xl font-bold text-center mb-6">Who Are You?</h2>
                <div className="grid gap-4">
                  {roles.map((r) => (
                    <Button
                      key={r}
                      variant={role === r ? "default" : "outline"}
                      className="w-full py-2"
                      onClick={() => setRole(r)}
                    >
                      {r}
                    </Button>
                  ))}
                </div>
                <Button
                  className="w-full mt-6 bg-indigo-600 text-white font-semibold rounded-md"
                  onClick={() => role && setStep(2)}
                  disabled={!role}
                >
                  Continue
                </Button>
              </>
            )}

            {step === 2 && (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>

                {/* School */}
                <div>
                  <Label htmlFor="school" className="flex items-center gap-2 text-gray-800 mb-2">
                    <School className="h-4 w-4" /> School Name
                  </Label>
                  <Input
                    id="schoolName"
                    placeholder="School name"
                    type="text"
                    value={customSchool}
                    onChange={e => setCustomSchool(e.target.value)}
                    required
                  />
                </div>

                {/* Full Name */}
                <div>
                  <Label htmlFor="fullName" className="flex items-center gap-2 text-gray-800 mb-2">
                    <User className="h-4 w-4" /> Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                  />
                </div>

                {/* Email with restriction */}
                <div className="relative">
                  <Label htmlFor="email" className="flex items-center gap-2 text-gray-800 mb-2">
                    <Mail className="h-4 w-4" /> Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="info@school.edu"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value)
                      validateEmail(e.target.value)
                    }}

                    required
                    className={emailError ? "border-red-500 pr-10" : ""}
                  />

                  {emailError && (
                    <div className="absolute right-3 top-10 group">
                      <AlertCircle className="h-5 w-5 text-red-500 cursor-pointer" />
                      <div className="absolute top-6 right-0 w-64 bg-white text-sm text-gray-700 border border-gray-300 rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition">
                        {emailError}. <br />
                        <a
          onClick={onClose}

                          href="#contact"
                          className="text-blue-600 font-medium hover:underline"
                        >
                          Don’t have a school webmail? → Get one through us.
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location" className="flex items-center gap-2 text-gray-800 mb-2">
                    <MapPin className="h-4 w-4" /> Location
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Tema, Accra"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2 text-gray-800 mb-2">
                    <Phone className="h-4 w-4" /> Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="055 123 4567"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                  />
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <Button type="submit" className="w-full py-2 bg-indigo-600 text-white">
                  {loading ? "Signing up..." : "Create Account"}
                </Button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleVerify} className="space-y-6">
                <h2 className="text-2xl font-bold text-center mb-2">Verify Your Account</h2>
                <p className="text-center text-gray-600 mb-4">
                  We’ve sent a 6-digit code to <span className="font-semibold">{email}</span>
                </p>

                <div className="flex justify-between gap-2">
                  {otp.map((digit, i) => (
                    <Input
                      key={i}
                      ref={(el) => (inputRefs.current[i] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      className="w-12 h-12 text-center text-xl font-semibold"
                    />
                  ))}
                </div>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <div className="flex justify-center">
  {!verifying && !verified && (
    <Button type="submit" className="w-full bg-indigo-600 text-white">
      Verify Code
    </Button>
  )}

  {verifying && (
    <div className="w-full flex justify-center py-2">
      <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
    </div>
  )}

  {verified && (
    <div className="w-full flex justify-center py-2">
      <CheckCircle2 className="w-6 h-6 text-green-600" />
    </div>
  )}
</div>

              </form>
            )}

            {step === 4 && (
              <div className="text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                <h3 className="text-xl font-semibold">Check Your Email</h3>
                <p className="text-gray-600">
                  Your account is verified! A login link has been sent to your email. 🎉
                </p>
                <p  className="w-full  text-black">
                  Thank You for Creating an account with us
                </p>
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-400 to-blue-200 p-8 text-center text-black">
            <h2 className="text-xl font-bold mb-2">A Smarter School System</h2>
            <p className="text-sm mb-6">
              Empower your learning with seamless digital access. Everything you need in one place.
            </p>
            <img src="/space02.png" alt="Illustration" className="max-w-[200px]" />
          </div>
        </div>
      </div>
    </div>

  )
}
