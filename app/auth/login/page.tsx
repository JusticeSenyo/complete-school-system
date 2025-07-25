"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, Eye, EyeOff, Mail, Lock, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showDemos, setShowDemos] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  useEffect(() => {
    setError("")
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const success = await login(email, password)
      if (!success) setError("Invalid email or password")
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const demoAccounts = [
    { role: "Super Admin", email: "super@edumanage.com", password: "demo123" },
    { role: "School Admin", email: "admin@school.com", password: "demo123" },
    { role: "Teacher", email: "teacher@school.com", password: "demo123" },
    { role: "Student", email: "student@school.com", password: "demo123" },
    { role: "Parent", email: "parent@school.com", password: "demo123" },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-400 px-4">


      {/* Floating Decorative Images */}
      <img src="/space02.png" alt="" className="hidden md:block absolute top-10 left-10 w-32 opacity-10 animate-float-slow pointer-events-none" />
      <img src="/space04.png" alt="" className="hidden md:block absolute bottom-16 right-8 w-24 opacity-10 animate-float-medium pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 z-10">
        {/* Left Login Card */}
        <div className="w-full lg:w-1/2 backdrop-blur-md bg-white/70 p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-6">
            <GraduationCap className="mx-auto h-12 w-12 text-primary" />
            <h3 className="text-2xl font-semibold text-gray-800">Sign in to your account</h3>
            <p className="text-sm text-gray-600 mt-1">Access your personalized dashboard</p>
          </div>

          <Card className="bg-transparent shadow-none">
            <CardContent className="px-0 py-0">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="email" className="text-black">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-black">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="pl-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(prev => !prev)}
                      className="absolute right-2 top-2"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full py-2 bg-primary text-white font-medium rounded-md"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <Link href="/auth/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
                <span className="mx-2">·</span>
                <Link href="/auth/signup" className="text-primary hover:underline">Sign up</Link>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center"
                  onClick={() => setShowDemos(prev => !prev)}
                >
                  Try Demo Accounts <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
                {showDemos && (
                  <div className="mt-4 space-y-2">
                    {demoAccounts.map((a, i) => (
                      <Button
                        key={i}
                        variant="secondary"
                        size="sm"
                        className="w-full text-sm"
                        onClick={() => { setEmail(a.email); setPassword(a.password); }}
                      >
                        {a.role}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Info Panel */}
        <div className="w-full lg:w-1/2 p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl text-center flex flex-col justify-center bg-gradient-to-br from-blue-100 to-blue-300 bg-opacity-30">
          <h3 className="text-3xl font-bold text-primary mb-4">schoolmaster Hub </h3>
          <p className="text-gray-700 text-md leading-relaxed">
            Our all-in-one platform empowers administrators, teachers, students, and parents with real-time insights, streamlined communication, and smarter tools for academic success. <br /><br />
            Experience a seamless journey from admissions to graduation with EduManage — where innovation meets education.
          </p>
          <img src="/space01.png" alt="School System" className="mt-8 mx-auto w-64 md:w-72 lg:w-80 animate-fade-in" />
        </div>
      </div>
    </div>
  )
}
