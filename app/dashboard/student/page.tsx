"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Calendar, GraduationCap, FileText, ClipboardList, TrendingUp } from "lucide-react"
import Link from "next/link"

interface StudentStats {
  overallGrade: string
  // attendanceRate: number
  pendingAssignments: number
  completedAssignments: number
}

interface TodaySchedule {
  id: string
  subject: string
  teacher: string
  time: string
  room: string
  type: "class" | "exam" | "lab"
}

interface RecentGrade {
  id: string
  subject: string
  assignment: string
  grade: string
  maxGrade: string
  date: string
}

interface UpcomingAssignment {
  id: string
  subject: string
  title: string
  dueDate: string
  status: "pending" | "submitted" | "overdue"
}

export default function StudentDashboard() {
  const [stats, setStats] = useState<StudentStats>({
    overallGrade: "A",
    // attendanceRate: 0,
    pendingAssignments: 0,
    completedAssignments: 0,
  })
  const [todaySchedule, setTodaySchedule] = useState<TodaySchedule[]>([])
  const [recentGrades, setRecentGrades] = useState<RecentGrade[]>([])
  const [upcomingAssignments, setUpcomingAssignments] = useState<UpcomingAssignment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, scheduleResponse, gradesResponse, assignmentsResponse] = await Promise.all([
        fetch("/api/student/dashboard/stats"),
        fetch("/api/student/dashboard/schedule"),
        fetch("/api/student/dashboard/grades"),
        fetch("/api/student/dashboard/assignments"),
      ])

      if (statsResponse.ok && scheduleResponse.ok && gradesResponse.ok && assignmentsResponse.ok) {
        const statsData = await statsResponse.json()
        const scheduleData = await scheduleResponse.json()
        const gradesData = await gradesResponse.json()
        const assignmentsData = await assignmentsResponse.json()

        setStats(statsData)
        setTodaySchedule(scheduleData.schedule)
        setRecentGrades(gradesData.grades)
        setUpcomingAssignments(assignmentsData.assignments)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      // Mock data for demo
      setStats({
        overallGrade: "A-",
        // attendanceRate: 92.5,
        pendingAssignments: 3,
        completedAssignments: 15,
      })
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
              <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-gray-600">Track your academic progress and upcoming activities</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.overallGrade}</div>
                <p className="text-xs text-muted-foreground">Current semester</p>
              </CardContent>
            </Card>
{/* 
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.attendanceRate}%</div>
                <Progress value={stats.attendanceRate} className="mt-2" />
              </CardContent>
            </Card> */}

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingAssignments}</div>
                <p className="text-xs text-muted-foreground">Due soon</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedAssignments}</div>
                <p className="text-xs text-muted-foreground">This semester</p>
              </CardContent>
            </Card>
          </div>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your classes and activities for today</CardDescription>
                </div>
                <Link href="/dashboard/student/timetable">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Grades */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Grades</CardTitle>
                    <CardDescription>Your latest assignment results</CardDescription>
                  </div>
                  <Link href="/dashboard/student/grades">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
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

            {/* Upcoming Assignments */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Upcoming Assignments</CardTitle>
                    <CardDescription>Assignments due soon</CardDescription>
                  </div>
                  <Link href="/dashboard/student/assignments">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
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
          </div>

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
                    school notices
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
