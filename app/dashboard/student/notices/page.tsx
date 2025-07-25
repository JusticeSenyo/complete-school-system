"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ClipboardList } from "lucide-react"
import Link from "next/link"

interface Notice {
  id: string
  title: string
  description: string
  date: string
  type: "general" | "exam" | "event"
}

export default function StudentNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    try {
      const response = await fetch("/api/student/notices")
      if (response.ok) {
        const data = await response.json()
        setNotices(data.notices)
      }
    } catch (error) {
      console.error("Error fetching notices:", error)
      // Fallback mock data
      setNotices([
        {
          id: "1",
          title: "Midterm Exam Week",
          description: "All midterm exams will begin on Monday. Please check your timetable.",
          date: "2024-01-20",
          type: "exam",
        },
        {
          id: "2",
          title: "Independence Day Celebration",
          description: "Join us in the school auditorium for a cultural event.",
          date: "2024-01-25",
          type: "event",
        },
        {
          id: "3",
          title: "Library Book Returns",
          description: "All overdue library books should be returned this week.",
          date: "2024-01-22",
          type: "general",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-800"
      case "event":
        return "bg-blue-100 text-blue-800"
      case "general":
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["student"]}>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">School Notices</h1>
              <p className="text-gray-600">Important announcements and updates</p>
            </div>
          </div>

          {/* Notices Section */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Notices</CardTitle>
              <CardDescription>Stay informed about school events and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div key={notice.id} className="flex justify-between items-start p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-lg">{notice.title}</h4>
                      <p className="text-sm text-gray-600 mb-1">{notice.description}</p>
                      <p className="text-xs text-gray-500">{new Date(notice.date).toLocaleDateString()}</p>
                    </div>
                    <Badge className={getTypeColor(notice.type)}>{notice.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common student activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/dashboard/student/assignments">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <ClipboardList className="w-6 h-6 mb-2" />
                    View Assignments
                  </Button>
                </Link>
                <Link href="/dashboard/student/grades">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <ClipboardList className="w-6 h-6 mb-2" />
                    Check Grades
                  </Button>
                </Link>
                <Link href="/dashboard/student/notices">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <ClipboardList className="w-6 h-6 mb-2" />
                    School Notices
                  </Button>
                </Link>
                <Link href="/dashboard/student/timetable">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <Calendar className="w-6 h-6 mb-2" />
                    My Timetable
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
