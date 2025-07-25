"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Building2 } from "lucide-react"
import Link from "next/link"

export default function NewSchoolPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    schoolName: "",
    adminName: "",
    adminEmail: "",
    adminPhone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    plan: "",
    maxStudents: "",
    maxTeachers: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/super-admin/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/dashboard/super-admin/schools")
      } else {
        setError("Failed to create school. Please try again.")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute allowedRoles={["super_admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/super-admin/schools">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New School</h1>
              <p className="text-gray-600">Create a new school account on the platform</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Building2 className="w-6 h-6 text-primary" />
                <CardTitle>School Information</CardTitle>
              </div>
              <CardDescription>Enter the details for the new school and administrator account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* School Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">School Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schoolName">School Name *</Label>
                      <Input
                        id="schoolName"
                        value={formData.schoolName}
                        onChange={(e) => handleInputChange("schoolName", e.target.value)}
                        placeholder="Enter school name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plan">Subscription Plan *</Label>
                      <Select value={formData.plan} onValueChange={(value) => handleInputChange("plan", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic - $99/month</SelectItem>
                          <SelectItem value="standard">Standard - $199/month</SelectItem>
                          <SelectItem value="premium">Premium - $299/month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxStudents">Max Students</Label>
                      <Input
                        id="maxStudents"
                        type="number"
                        value={formData.maxStudents}
                        onChange={(e) => handleInputChange("maxStudents", e.target.value)}
                        placeholder="Maximum number of students"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxTeachers">Max Teachers</Label>
                      <Input
                        id="maxTeachers"
                        type="number"
                        value={formData.maxTeachers}
                        onChange={(e) => handleInputChange("maxTeachers", e.target.value)}
                        placeholder="Maximum number of teachers"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter school address"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        placeholder="State"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>
                </div>

                {/* Administrator Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Administrator Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="adminName">Administrator Name *</Label>
                      <Input
                        id="adminName"
                        value={formData.adminName}
                        onChange={(e) => handleInputChange("adminName", e.target.value)}
                        placeholder="Enter administrator name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">Administrator Email *</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        value={formData.adminEmail}
                        onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                        placeholder="Enter administrator email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminPhone">Administrator Phone</Label>
                    <Input
                      id="adminPhone"
                      type="tel"
                      value={formData.adminPhone}
                      onChange={(e) => handleInputChange("adminPhone", e.target.value)}
                      placeholder="Enter administrator phone"
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-end space-x-4">
                  <Link href="/dashboard/super-admin/schools">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create School"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
