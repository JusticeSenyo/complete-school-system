"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, Phone, User, School, BadgeCheck } from "lucide-react"

export default function SignUpPage() {
  const { signup } = useAuth()
  const router = useRouter()

  const [step, setStep] = useState<1 | 2>(1)
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [fullName, setFullName] = useState("")
  const [schoolName, setSchoolName] = useState("")
  const [customSchool, setCustomSchool] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const roles = ["Admin", "super Admin"]
  const schoolsInGhana = [
    "Achimota School",
    "Wesley Girls’ High School",
    "PRESEC Legon",
    "St. Augustine’s College",
    "Opoku Ware School",
    "Holy Child School",
    "Prempeh College",
    "Add Your Own"
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const selectedSchool = schoolName === "Add Your Own" ? customSchool : schoolName
      const success = await signup(email, password, fullName, phone, selectedSchool, role)
      if (!success) setError("Sign up failed. Please try again.")
    } catch {
      setError("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-400 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/30 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden">
        
        {/* Left Section */}
        <div className="p-8 md:p-10">
          {step === 1 ? (
            <>
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Who Are You?</h2>
              <p className="text-center text-sm text-gray-600 mb-4">
                Select your role to begin signing up.
              </p>
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
          ) : (
            <>
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Create an Account</h2>
              <p className="text-center text-sm text-gray-600 mb-6">
                Role: <span className="font-semibold text-indigo-700">{role}</span>
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                
                {/* School */}
                <div>
                  <Label htmlFor="school" className="flex items-center gap-2 text-gray-800 mb-2">
                    <School className="h-4 w-4" /> School Name
                  </Label>

                  <Input
                  id="schoolName"
                    placeholder="school name"
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

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 text-gray-800 mb-2">
                    <Mail className="h-4 w-4" /> Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="info@school.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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

                {/* Password */}
                <div className="relative">
                  <Label htmlFor="password" className="flex items-center gap-2 text-gray-800 mb-2">
                    <Lock className="h-4 w-4" /> Password
                  </Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-8 right-2"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                  </Button>
                </div>

                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}

                <Button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Create Account"}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-700">
                Already have an account?{" "}
                <button onClick={() => router.push("/auth/login")} className="text-indigo-600 font-medium hover:underline">
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-400 to-blue-200 bg-opacity-30 backdrop-blur-lg p-10 text-center text-black">
          <h2 className="text-2xl font-bold mb-2">A Smarter School System</h2>
          <p className="text-sm leading-relaxed text-black/90">
            Empower your learning with seamless digital access. Join a new era of education where everything you need is one click away.
          </p>
          <div className="mt-6">
            <img
              src="/space02.png"
              alt="School Illustration"
              className="max-w-[240px] drop-shadow-xl opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
