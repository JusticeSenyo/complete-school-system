"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, GraduationCap, BookOpen, ClipboardList, TrendingUp, Calendar, Plus, Eye } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalClasses: number
  attendanceRate: number
}

interface RecentActivity {
  id: string
  type: "enrollment" | "attendance" | "grade" | "announcement"
  message: string
  timestamp: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    attendanceRate: 0,
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, activityResponse] = await Promise.all([
        fetch("/api/admin/dashboard/stats"),
        fetch("/api/admin/dashboard/activity"),
      ])

      if (statsResponse.ok && activityResponse.ok) {
        const statsData = await statsResponse.json()
        const activityData = await activityResponse.json()

        setStats(statsData)
        setRecentActivity(activityData.activities)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      // Mock data for demo
      setStats({
        totalStudents: 850,
        totalTeachers: 45,
        totalClasses: 32,
        attendanceRate: 94.5,
      })
      setRecentActivity([
        {
          id: "1",
          type: "enrollment",
          message: "New student John Doe enrolled in Grade 10",
          timestamp: "2024-01-20T10:30:00Z",
        },
        {
          id: "2",
          type: "attendance",
          message: "Attendance marked for Grade 9A - 28/30 present",
          timestamp: "2024-01-20T09:15:00Z",
        },
        {
          id: "3",
          type: "announcement",
          message: "New announcement posted: Parent-Teacher Meeting",
          timestamp: "2024-01-19T16:45:00Z",
        },
        {
          id: "4",
          type: "grade",
          message: "Grades updated for Mathematics - Grade 8B",
          timestamp: "2024-01-19T14:20:00Z",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "enrollment":
        return <Users className="w-4 h-4 text-blue-600" />
      case "attendance":
        return <ClipboardList className="w-4 h-4 text-green-600" />
      case "grade":
        return <GraduationCap className="w-4 h-4 text-purple-600" />
      case "announcement":
        return <Calendar className="w-4 h-4 text-orange-600" />
      default:
        return <Eye className="w-4 h-4 text-gray-600" />
    }
  }

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["school_admin"]}>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["school_admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">School Dashboard</h1>
              <p className="text-gray-600">Overview of your school's performance and activities</p>
            </div>
            <div className="flex space-x-2">
              <Link href="/dashboard/admin/students/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalStudents}</div>
                <p className="text-xs text-muted-foreground">+12 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalTeachers}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalClasses}</div>
                <p className="text-xs text-muted-foreground">Across all grades</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.attendanceRate}%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/dashboard/admin/students">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <Users className="w-6 h-6 mb-2" />
                    Manage Students
                  </Button>
                </Link>
                <Link href="/dashboard/admin/teachers">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <GraduationCap className="w-6 h-6 mb-2" />
                    Manage Teachers
                  </Button>
                </Link>
                <Link href="/dashboard/admin/classes">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <BookOpen className="w-6 h-6 mb-2" />
                    Manage Classes
                  </Button>
                </Link>
                <Link href="/dashboard/admin/attendance">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <ClipboardList className="w-6 h-6 mb-2" />
                    View Attendance
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and changes in your school</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
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
