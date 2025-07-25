"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, CreditCard, TrendingUp, Plus, Eye } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalSchools: number
  totalUsers: number
  monthlyRevenue: number
  activeSubscriptions: number
}

interface School {
  id: string
  name: string
  adminName: string
  students: number
  teachers: number
  plan: string
  status: "active" | "inactive"
  createdAt: string
}

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSchools: 0,
    totalUsers: 0,
    monthlyRevenue: 0,
    activeSubscriptions: 0,
  })
  const [recentSchools, setRecentSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Mock API calls - replace with actual Oracle APEX REST API
      const [statsResponse, schoolsResponse] = await Promise.all([
        fetch("/api/super-admin/stats"),
        fetch("/api/super-admin/schools?limit=5"),
      ])

      if (statsResponse.ok && schoolsResponse.ok) {
        const statsData = await statsResponse.json()
        const schoolsData = await schoolsResponse.json()

        setStats(statsData)
        setRecentSchools(schoolsData.schools)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      // Set mock data for demo
      setStats({
        totalSchools: 45,
        totalUsers: 12500,
        monthlyRevenue: 125000,
        activeSubscriptions: 42,
      })
      setRecentSchools([
        {
          id: "1",
          name: "Greenwood High School",
          adminName: "John Smith",
          students: 850,
          teachers: 45,
          plan: "Premium",
          status: "active",
          createdAt: "2024-01-15",
        },
        {
          id: "2",
          name: "Riverside Academy",
          adminName: "Sarah Johnson",
          students: 620,
          teachers: 32,
          plan: "Standard",
          status: "active",
          createdAt: "2024-01-10",
        },
        {
          id: "3",
          name: "Mountain View School",
          adminName: "Mike Davis",
          students: 450,
          teachers: 28,
          plan: "Basic",
          status: "active",
          createdAt: "2024-01-08",
        },
      ])
    } finally {
      setLoading(false)
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
              <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
              <p className="text-gray-600">Manage all schools and monitor platform performance</p>
            </div>
            <Link href="/dashboard/super-admin/schools/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add School
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSchools}</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Schools */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Schools</CardTitle>
                  <CardDescription>Latest schools added to the platform</CardDescription>
                </div>
                <Link href="/dashboard/super-admin/schools">
                  <Button variant="outline">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSchools.map((school) => (
                  <div key={school.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{school.name}</h3>
                        <p className="text-sm text-gray-600">Admin: {school.adminName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{school.students} Students</p>
                        <p className="text-sm text-gray-600">{school.teachers} Teachers</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            school.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {school.status}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">{school.plan}</p>
                      </div>
                      <Link href={`/dashboard/super-admin/schools/${school.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
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
