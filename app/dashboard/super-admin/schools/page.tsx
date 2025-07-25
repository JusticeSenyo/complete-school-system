"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Building2, Plus, Search, Eye, Edit, Trash2, Users, GraduationCap } from "lucide-react"
import Link from "next/link"

interface School {
  id: string
  name: string
  adminName: string
  adminEmail: string
  students: number
  teachers: number
  plan: string
  status: "active" | "inactive" | "suspended"
  createdAt: string
  lastLogin: string
}

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchSchools()
  }, [])

  const fetchSchools = async () => {
    try {
      const response = await fetch("/api/super-admin/schools")
      if (response.ok) {
        const data = await response.json()
        setSchools(data.schools)
      }
    } catch (error) {
      console.error("Error fetching schools:", error)
      // Mock data for demo
      setSchools([
        {
          id: "1",
          name: "Greenwood High School",
          adminName: "John Smith",
          adminEmail: "john@greenwood.edu",
          students: 850,
          teachers: 45,
          plan: "Premium",
          status: "active",
          createdAt: "2024-01-15",
          lastLogin: "2024-01-20",
        },
        {
          id: "2",
          name: "Riverside Academy",
          adminName: "Sarah Johnson",
          adminEmail: "sarah@riverside.edu",
          students: 620,
          teachers: 32,
          plan: "Standard",
          status: "active",
          createdAt: "2024-01-10",
          lastLogin: "2024-01-19",
        },
        {
          id: "3",
          name: "Mountain View School",
          adminName: "Mike Davis",
          adminEmail: "mike@mountainview.edu",
          students: 450,
          teachers: 28,
          plan: "Basic",
          status: "active",
          createdAt: "2024-01-08",
          lastLogin: "2024-01-18",
        },
        {
          id: "4",
          name: "Sunset Elementary",
          adminName: "Lisa Brown",
          adminEmail: "lisa@sunset.edu",
          students: 320,
          teachers: 18,
          plan: "Basic",
          status: "inactive",
          createdAt: "2023-12-20",
          lastLogin: "2024-01-05",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.adminName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Premium":
        return "bg-purple-100 text-purple-800"
      case "Standard":
        return "bg-blue-100 text-blue-800"
      case "Basic":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["super_admin"]}>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["super_admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Schools Management</h1>
              <p className="text-gray-600">Manage all schools on the platform</p>
            </div>
            <Link href="/dashboard/super-admin/schools/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add School
              </Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search schools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schools List */}
          <Card>
            <CardHeader>
              <CardTitle>All Schools ({filteredSchools.length})</CardTitle>
              <CardDescription>Complete list of schools registered on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSchools.map((school) => (
                  <div
                    key={school.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{school.name}</h3>
                        <p className="text-sm text-gray-600">Admin: {school.adminName}</p>
                        <p className="text-sm text-gray-500">{school.adminEmail}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          {school.students}
                        </div>
                        <p className="text-xs text-gray-500">Students</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center text-sm text-gray-600">
                          <GraduationCap className="w-4 h-4 mr-1" />
                          {school.teachers}
                        </div>
                        <p className="text-xs text-gray-500">Teachers</p>
                      </div>

                      <div className="text-center">
                        <Badge className={getPlanColor(school.plan)}>{school.plan}</Badge>
                      </div>

                      <div className="text-center">
                        <Badge className={getStatusColor(school.status)}>{school.status}</Badge>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Link href={`/dashboard/super-admin/schools/${school.id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/dashboard/super-admin/schools/${school.id}/edit`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
