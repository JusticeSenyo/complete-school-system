"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, ClipboardList, GraduationCap, Calendar, FileText, Plus, Eye } from "lucide-react"
import Link from "next/link"

interface TeacherStats {
  totalClasses: number
  totalStudents: number
  pendingGrades: number
  todayAttendance: number
}

interface ClassSchedule {
  id: string
  subject: string
  class: string
  time: string
  room: string
  status: "upcoming" | "ongoing" | "completed"
}

interface RecentActivity {
  id: string
  type: "attendance" | "grade" | "assignment" | "announcement"
  message: string
  timestamp: string
}

export default function TeacherDashboard() {
  const [stats, setStats] = useState<TeacherStats>({
    totalClasses: 0,
    totalStudents: 0,
    pendingGrades: 0,
    todayAttendance: 0,
  })
  const [todaySchedule, setTodaySchedule] = useState<ClassSchedule[]>([])
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, scheduleResponse, activityResponse] = await Promise.all([
        fetch("/api/teacher/dashboard/stats"),
        fetch("/api/teacher/dashboard/schedule"),
        fetch("/api/teacher/dashboard/activity"),
      ])

      if (statsResponse.ok && scheduleResponse.ok && activityResponse.ok) {
        const statsData = await statsResponse.json()
        const scheduleData = await scheduleResponse.json()
        const activityData = await activityResponse.json()

        setStats(statsData)
        setTodaySchedule(scheduleData.schedule)
        setRecentActivity(activityData.activities)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      // Mock data for demo
      setStats({
        totalClasses: 6,
        totalStudents: 180,
        pendingGrades: 12,
        todayAttendance: 5,
      })
      setTodaySchedule([
        {
          id: "1",
          subject: "Mathematics",
          class: "Grade 10A",
          time: "09:00 - 09:45",
          room: "Room 101",
          status: "completed",
        },
        {
          id: "2",
          subject: "Mathematics",
          class: "Grade 10B",
          time: "10:00 - 10:45",
          room: "Room 101",
          status: "ongoing",
        },
        {
          id: "3",
          subject: "Algebra",
          class: "Grade 11A",
          time: "11:00 - 11:45",
          room: "Room 101",
          status: "upcoming",
        },
        {
          id: "4",
          subject: "Calculus",
          class: "Grade 12A",
          time: "14:00 - 14:45",
          room: "Room 101",
          status: "upcoming",
        },
      ])
      setRecentActivity([
        {
          id: "1",
          type: "attendance",
          message: "Attendance marked for Grade 10A - 28/30 present",
          timestamp: "2024-01-20T09:45:00Z",
        },
        {
          id: "2",
          type: "grade",
          message: "Grades submitted for Mathematics Quiz - Grade 10B",
          timestamp: "2024-01-19T16:30:00Z",
        },
        {
          id: "3",
          type: "assignment",
          message: "New assignment created: Quadratic Equations",
          timestamp: "2024-01-19T14:20:00Z",
        },
        {
          id: "4",
          type: "announcement",
          message: "Announced: Extra class on Friday for Grade 11A",
          timestamp: "2024-01-18T11:15:00Z",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "ongoing":
        return "bg-blue-100 text-blue-800"
      case "upcoming":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "attendance":
        return <ClipboardList className="w-4 h-4 text-green-600" />
      case "grade":
        return <GraduationCap className="w-4 h-4 text-purple-600" />
      case "assignment":
        return <FileText className="w-4 h-4 text-blue-600" />
      case "announcement":
        return <Calendar className="w-4 h-4 text-orange-600" />
      default:
        return <Eye className="w-4 h-4 text-gray-600" />
    }
  }

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["teacher"]}>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
              <p className="text-gray-600">Manage your classes, students, and academic activities</p>
            </div>
            <div className="flex space-x-2">
              <Link href="/dashboard/teacher/assignments/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Assignment
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Classes</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalClasses}</div>
                <p className="text-xs text-muted-foreground">Active classes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalStudents}</div>
                <p className="text-xs text-muted-foreground">Across all classes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingGrades}</div>
                <p className="text-xs text-muted-foreground">Need to be graded</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.todayAttendance}</div>
                <p className="text-xs text-muted-foreground">Attendance pending</p>
              </CardContent>
            </Card>
          </div>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your classes for today</CardDescription>
                </div>
                <Link href="/dashboard/teacher/timetable">
                  <Button variant="outline">View Full Timetable</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{schedule.subject}</h3>
                        <p className="text-sm text-gray-600">
                          {schedule.class} • {schedule.room}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">{schedule.time}</p>
                      </div>
                      <Badge className={getStatusColor(schedule.status)}>{schedule.status}</Badge>
                      {schedule.status === "upcoming" && (
                        <Link href={`/dashboard/teacher/attendance/${schedule.id}`}>
                          <Button size="sm">Take Attendance</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common teaching tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/dashboard/teacher/attendance">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <ClipboardList className="w-6 h-6 mb-2" />
                    Take Attendance
                  </Button>
                </Link>
                <Link href="/dashboard/teacher/grades">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <GraduationCap className="w-6 h-6 mb-2" />
                    Grade Students
                  </Button>
                </Link>
                <Link href="/dashboard/teacher/assignments">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <FileText className="w-6 h-6 mb-2" />
                    Manage Assignments
                  </Button>
                </Link>
                <Link href="/dashboard/teacher/classes">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <BookOpen className="w-6 h-6 mb-2" />
                    My Classes
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
                  <CardDescription>Your latest teaching activities</CardDescription>
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
