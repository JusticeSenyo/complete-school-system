"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export type UserRole = "super_admin" | "school_admin" | "teacher" | "student" | "parent"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  schoolId?: string
  schoolName?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  signup: (
    email: string,
    fullName: string,
    phone: string,
    schoolName: string,
    role: string
  ) => Promise<boolean>
  verifyCode: (email: string, code: string) => Promise<{ success: boolean; error?: string }>
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored auth token and validate
    const token = localStorage.getItem("auth_token")
    const userData = localStorage.getItem("user_data")

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        const userData: User = data.user

        localStorage.setItem("auth_token", data.token)
        localStorage.setItem("user_data", JSON.stringify(userData))
        setUser(userData)

        // Role-based redirection
        switch (userData.role) {
          case "super_admin":
            router.push("/dashboard/super-admin")
            break
          case "school_admin":
            router.push("/dashboard/admin")
            break
          case "teacher":
            router.push("/dashboard/teacher")
            break
          case "student":
            router.push("/dashboard/student")
            break
          case "parent":
            router.push("/dashboard/parent")
            break
        }
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  /**
   * Step 1: Signup → request a verification code
   */
  const signup = async (
    email: string,
    fullName: string,
    phone: string,
    schoolName: string,
    role: string
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullName, phone, schoolName, role }),
      })

      const data = await response.json()
      return data.success
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }

  /**
   * Step 2: Verify the code
   */
  const verifyCode = async (
    email: string,
    code: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Verify code error:", error)
      return { success: false, error: "Server error" }
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    setUser(null)
    router.push("/auth/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        verifyCode,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
