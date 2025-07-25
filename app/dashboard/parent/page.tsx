"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, ClipboardList, Calendar, MessageSquare, TrendingUp, Phone } from "lucide-react"
import Link from "next/link"

interface Child {
  id: string
  name: string
  grade: string
  class: string
  avatar: string
  overallGrade: string
  attendanceRate: number
}

interface ChildPerformance {
  childId: string
  childName: string
  recentGrades: Array<{
    subject: string
    grade: string
    date: string
  }>
  upcomingEvents: Array<{
    type: "exam" | "assignment" | "meeting"
    title: string
    date: string
  }>
}

interface Announcement {
  id: string
  title: string
  message: string
  date: string
  priority: "high" | "medium" | "low"
}

export default function ParentDashboard() {
  const [children, setChildren] = useState<Child[]>([])
  const [selectedChild, setSelectedChild] = useState<string>("")
  const [performance, setPerformance] = useState<ChildPerformance | null>(null)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  useEffect(() => {
    if (selectedChild) {
      fetchChildPerformance(selectedChild)
    }
  }, [selectedChild])

  const fetchDashboardData = async () => {
    try {
      const [childrenResponse, announcementsResponse] = await Promise.all([
        fetch("/api/parent/dashboard/children"),
        fetch("/api/parent/dashboard/announcements"),
      ])

      if (childrenResponse.ok && announcementsResponse.ok) {
        const childrenData = await childrenResponse.json()
        const announcementsData = await announcementsResponse.json()

        setChildren(childrenData.children)
        setAnnouncements(announcementsData.announcements)

        if (childrenData.children.length > 0) {
          setSelectedChild(childrenData.children[0].id)
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      // Mock data for demo
      const mockChildren = [
        {
          id: "1",
          name: "Emma Smith",
          grade: "Grade 10",
          class: "10A",
          avatar: "/placeholder.svg?height=40&width=40",
          overallGrade: "A-",
          attendanceRate: 94.5,
        },
        {
          id: "2",
          name: "James Smith",
          grade: "Grade 8",
          class: "8B",
          avatar: "/placeholder.svg?height=40&width=40",
          overallGrade: "B+",
          attendanceRate: 91.2,
        },
      ]
      setChildren(mockChildren)
      setSelectedChild(mockChildren[0].id)
      setAnnouncements([
        {
          id: "1",
          title: "Parent-Teacher Conference",
          message: "Scheduled for next week. Please confirm your attendance.",
          date: "2024-01-22",
          priority: "high",
        },
        {
          id: "2",
          title: "School Sports Day",
          message: "Annual sports day will be held on February 15th.",
          date: "2024-01-20",
          priority: "medium",
        },
        {
          id: "3",
          title: "Library Book Return",
          message: "Please ensure all library books are returned by month end.",
          date: "2024-01-18",
          priority: "low",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const fetchChildPerformance = async (childId: string) => {
    try {
      const response = await fetch(`/api/parent/dashboard/performance/${childId}`)
      if (response.ok) {
        const data = await response.json()
        setPerformance(data)
      }
    } catch (error) {
      console.error("Error fetching child performance:", error)
      // Mock data for demo
      setPerformance({
        childId,
        childName: children.find((c) => c.id === childId)?.name || "",
        recentGrades: [
          { subject: "Mathematics", grade: "A", date: "2024-01-18" },
          { subject: "Physics", grade: "B+", date: "2024-01-17" },
          { subject: "English", grade: "A-", date: "2024-01-15" },
          { subject: "Chemistry", grade: "B", date: "2024-01-14" },
        ],
        upcomingEvents: [
          { type: "exam", title: "Mathematics Final Exam", date: "2024-01-25" },
          { type: "assignment", title: "Physics Lab Report", date: "2024-01-23" },
          { type: "meeting", title: "Parent-Teacher Meeting", date: "2024-01-22" },
        ],
      })
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-800"
      case "assignment":
        return "bg-blue-100 text-blue-800"
      case "meeting":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-600"
    if (grade.startsWith("B")) return "text-blue-600"
    if (grade.startsWith("C")) return "text-yellow-600"
    return "text-red-600"
  }

  const selectedChildData = children.find((c) => c.id === selectedChild)

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["parent"]}>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
              <p className="text-gray-600">Monitor your children's academic progress and school activities</p>
            </div>
            <Button>
              <Phone className="w-4 h-4 mr-2" />
              Contact School
            </Button>
          </div>

          {/* Children Selection */}
          <Card>
            <CardHeader>
              <CardTitle>My Children</CardTitle>
              <CardDescription>Select a child to view their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {children.map((child) => (
                  <div
                    key={child.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedChild === child.id ? "border-primary bg-primary/5" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedChild(child.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={child.avatar || "/placeholder.svg"} alt={child.name} />
                        <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{child.name}</h3>
                        <p className="text-sm text-gray-600">
                          {child.grade} - {child.class}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600">Grade</p>
                        <p className={`font-semibold ${getGradeColor(child.overallGrade)}`}>{child.overallGrade}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Attendance</p>
                        <p className="font-semibold">{child.attendanceRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedChildData && (
            <>
              {/* Selected Child Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedChildData.overallGrade}</div>
                    <p className="text-xs text-muted-foreground">Current semester</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                    <ClipboardList className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedChildData.attendanceRate}%</div>
                    <Progress value={selectedChildData.attendanceRate} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5th</div>
                    <p className="text-xs text-muted-foreground">Out of 30 students</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{performance?.upcomingEvents.length || 0}</div>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Grades */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Recent Grades</CardTitle>
                        <CardDescription>{selectedChildData.name}'s latest results</CardDescription>
                      </div>
                      <Link href={`/dashboard/parent/grades?child=${selectedChild}`}>
                        <Button variant="outline" size="sm">
                          View All
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {performance?.recentGrades.map((grade, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{grade.subject}</h4>
                            <p className="text-sm text-gray-600">{new Date(grade.date).toLocaleDateString()}</p>
                          </div>
                          <div className={`text-lg font-bold ${getGradeColor(grade.grade)}`}>{grade.grade}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Upcoming Events</CardTitle>
                        <CardDescription>Important dates for {selectedChildData.name}</CardDescription>
                      </div>
                      <Link href={`/dashboard/parent/calendar?child=${selectedChild}`}>
                        <Button variant="outline" size="sm">
                          View Calendar
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {performance?.upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                          </div>
                          <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* School Announcements */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>School Announcements</CardTitle>
                  <CardDescription>Important updates from the school</CardDescription>
                </div>
                <Link href="/dashboard/parent/announcements">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{announcement.title}</h4>
                        <Badge className={getPriorityColor(announcement.priority)}>{announcement.priority}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{announcement.message}</p>
                      <p className="text-xs text-gray-500">{new Date(announcement.date).toLocaleDateString()}</p>
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
              <CardDescription>Common parent activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/dashboard/parent/attendance">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <ClipboardList className="w-6 h-6 mb-2" />
                    View Attendance
                  </Button>
                </Link>
                <Link href="/dashboard/parent/grades">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <GraduationCap className="w-6 h-6 mb-2" />
                    Check Grades
                  </Button>
                </Link>
                <Link href="/dashboard/parent/announcements">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <MessageSquare className="w-6 h-6 mb-2" />
                    Announcements
                  </Button>
                </Link>
                <Link href="/dashboard/parent/contact">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <Phone className="w-6 h-6 mb-2" />
                    Contact Teachers
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
