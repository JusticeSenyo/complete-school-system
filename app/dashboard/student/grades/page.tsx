"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  FileText,
  ClipboardList,
  Calendar,
} from "lucide-react"
import Link from "next/link"

interface RecentGrade {
  id: string
  subject: string
  assignment: string
  grade: string
  maxGrade: string
  date: string
}

export default function StudentGradesPage() {
  const [recentGrades, setRecentGrades] = useState<RecentGrade[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGrades()
  }, [])

  const fetchGrades = async () => {
    try {
      const gradesResponse = await fetch("/api/student/dashboard/grades")
      if (gradesResponse.ok) {
        const gradesData = await gradesResponse.json()
        setRecentGrades(gradesData.grades)
      }
    } catch (error) {
      console.error("Error fetching grades:", error)
      // Demo fallback
      setRecentGrades([
        {
          id: "1",
          subject: "Mathematics",
          assignment: "Algebra Quiz",
          grade: "A",
          maxGrade: "A",
          date: "2024-01-18",
        },
        {
          id: "2",
          subject: "Physics",
          assignment: "Lab Report #3",
          grade: "B+",
          maxGrade: "A",
          date: "2024-01-17",
        },
        {
          id: "3",
          subject: "English",
          assignment: "Essay: Shakespeare",
          grade: "A-",
          maxGrade: "A",
          date: "2024-01-15",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-600"
    if (grade.startsWith("B")) return "text-blue-600"
    if (grade.startsWith("C")) return "text-yellow-600"
    return "text-red-600"
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
              <h1 className="text-3xl font-bold text-gray-900">Grades Overview</h1>
              <p className="text-gray-600">Your latest assignment results</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Grades</CardTitle>
              <CardDescription>Review your recent academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentGrades.map((grade) => (
                  <div key={grade.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{grade.assignment}</h4>
                      <p className="text-sm text-gray-600">{grade.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${getGradeColor(grade.grade)}`}>
                        {grade.grade}/{grade.maxGrade}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(grade.date).toLocaleDateString()}</p>
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