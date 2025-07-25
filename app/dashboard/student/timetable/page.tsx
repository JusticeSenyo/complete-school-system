"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, GraduationCap, FileText, ClipboardList, TrendingUp } from "lucide-react"
import Link from "next/link"

interface TodaySchedule {
  id: string
  subject: string
  teacher: string
  time: string
  room: string
  type: "class" | "exam" | "lab"
}

export default function StudentTimetable() {
  const [todaySchedule, setTodaySchedule] = useState<TodaySchedule[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTimetable()
  }, [])

  const fetchTimetable = async () => {
    try {
      const res = await fetch("/api/student/dashboard/schedule")
      if (res.ok) {
        const data = await res.json()
        setTodaySchedule(data.schedule)
      }
    } catch (error) {
      console.error("Error fetching schedule:", error)
      setTodaySchedule([
        {
          id: "1",
          subject: "Mathematics",
          teacher: "Mr. Johnson",
          time: "09:00 - 09:45",
          room: "Room 101",
          type: "class",
        },
        {
          id: "2",
          subject: "Physics",
          teacher: "Dr. Smith",
          time: "10:00 - 10:45",
          room: "Lab 201",
          type: "lab",
        },
        {
          id: "3",
          subject: "English",
          teacher: "Ms. Davis",
          time: "11:00 - 11:45",
          room: "Room 205",
          type: "class",
        },
        {
          id: "4",
          subject: "Chemistry",
          teacher: "Dr. Wilson",
          time: "14:00 - 15:30",
          room: "Lab 301",
          type: "exam",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "class":
        return "bg-blue-100 text-blue-800"
      case "exam":
        return "bg-red-100 text-red-800"
      case "lab":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["student"]}>
        <DashboardLayout active="timetable">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <DashboardLayout active="timetable">
        <div className="space-y-6">
          {/* Timetable */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your classes and activities for today</CardDescription>
                </div>
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
                          {schedule.teacher} • {schedule.room}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">{schedule.time}</p>
                      </div>
                      <Badge className={getTypeColor(schedule.type)}>{schedule.type}</Badge>
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
              <CardDescription>Common student activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/dashboard/student/assignments">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <FileText className="w-6 h-6 mb-2" />
                    View Assignments
                  </Button>
                </Link>
                <Link href="/dashboard/student/grades">
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <GraduationCap className="w-6 h-6 mb-2" />
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
