"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, GraduationCap, ClipboardList, Calendar } from "lucide-react"
import Link from "next/link"

interface UpcomingAssignment {
  id: string
  subject: string
  title: string
  dueDate: string
  status: "pending" | "submitted" | "overdue"
}

export default function StudentAssignmentsPage() {
  const [upcomingAssignments, setUpcomingAssignments] = useState<UpcomingAssignment[]>([])

  useEffect(() => {
    fetchAssignments()
  }, [])

  const fetchAssignments = async () => {
    try {
      const response = await fetch("/api/student/dashboard/assignments")
      if (response.ok) {
        const data = await response.json()
        setUpcomingAssignments(data.assignments)
      } else {
        throw new Error("Failed to fetch assignments")
      }
    } catch (error) {
      console.error("Error fetching assignments:", error)
      setUpcomingAssignments([
        {
          id: "1",
          subject: "Mathematics",
          title: "Calculus Problem Set",
          dueDate: "2024-01-25",
          status: "pending",
        },
        {
          id: "2",
          subject: "Physics",
          title: "Motion Analysis Report",
          dueDate: "2024-01-23",
          status: "pending",
        },
        {
          id: "3",
          subject: "Chemistry",
          title: "Organic Compounds Lab",
          dueDate: "2024-01-22",
          status: "overdue",
        },
        {
          id: "4",
          subject: "English",
          title: "Essay on Modern Literature",
          dueDate: "2024-01-28",
          status: "submitted",
        },
        {
          id: "5",
          subject: "Biology",
          title: "Cell Division Worksheet",
          dueDate: "2024-01-29",
          status: "pending",
        },
        {
          id: "6",
          subject: "ICT",
          title: "Database Design Project",
          dueDate: "2024-01-30",
          status: "pending",
        },
      ])
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "submitted":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <DashboardLayout activeNav="assignments">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
              <p className="text-gray-600">Keep track of your upcoming and submitted assignments</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Assignments</CardTitle>
              <CardDescription>Here are all your assignment tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{assignment.title}</h4>
                      <p className="text-sm text-gray-600">{assignment.subject}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
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