"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, TrendingUp, Download, BookOpen } from "lucide-react"

interface Child {
  id: string
  name: string
  grade: string
  class: string
  avatar: string
}

interface Grade {
  id: string
  subject: string
  assignment: string
  grade: string
  maxGrade: string
  percentage: number
  date: string
  type: "quiz" | "exam" | "assignment" | "project"
}

interface SubjectGrade {
  subject: string
  currentGrade: string
  percentage: number
  assignments: Grade[]
}

export default function ParentGradesPage() {
  const [children, setChildren] = useState<Child[]>([])
  const [selectedChild, setSelectedChild] = useState<string>("")
  const [subjectGrades, setSubjectGrades] = useState<SubjectGrade[]>([])
  const [loading, setLoading] = useState(true)
  const [semester, setSemester] = useState("current")

  useEffect(() => {
    fetchChildren()
  }, [])

  useEffect(() => {
    if (selectedChild) {
      fetchGrades(selectedChild, semester)
    }
  }, [selectedChild, semester])

  const fetchChildren = async () => {
    try {
      const response = await fetch("/api/parent/children")
      if (response.ok) {
        const data = await response.json()
        setChildren(data.children)
        if (data.children.length > 0) {
          setSelectedChild(data.children[0].id)
        }
      }
    } catch (error) {
      console.error("Error fetching children:", error)
      // Mock data
      const mockChildren = [
        {
          id: "1",
          name: "Emma Smith",
          grade: "Grade 10",
          class: "10A",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "2",
          name: "James Smith",
          grade: "Grade 8",
          class: "8B",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ]
      setChildren(mockChildren)
      setSelectedChild(mockChildren[0].id)
    } finally {
      setLoading(false)
    }
  }

  const fetchGrades = async (childId: string, sem: string) => {
    try {
      const response = await fetch(`/api/parent/grades/${childId}?semester=${sem}`)
      if (response.ok) {
        const data = await response.json()
        setSubjectGrades(data.subjects)
      }
    } catch (error) {
      console.error("Error fetching grades:", error)
      // Mock data
      setSubjectGrades([
        {
          subject: "Mathematics",
          currentGrade: "A-",
          percentage: 88.5,
          assignments: [
            {
              id: "1",
              subject: "Mathematics",
              assignment: "Algebra Quiz",
              grade: "A",
              maxGrade: "A",
              percentage: 95,
              date: "2024-01-18",
              type: "quiz",
            },
            {
              id: "2",
              subject: "Mathematics",
              assignment: "Calculus Test",
              grade: "B+",
              maxGrade: "A",
              percentage: 87,
              date: "2024-01-15",
              type: "exam",
            },
            {
              id: "3",
              subject: "Mathematics",
              assignment: "Problem Set 1",
              grade: "A-",
              maxGrade: "A",
              percentage: 90,
              date: "2024-01-10",
              type: "assignment",
            },
          ],
        },
        {
          subject: "Physics",
          currentGrade: "B+",
          percentage: 85.2,
          assignments: [
            {
              id: "4",
              subject: "Physics",
              assignment: "Lab Report #3",
              grade: "B+",
              maxGrade: "A",
              percentage: 85,
              date: "2024-01-17",
              type: "assignment",
            },
            {
              id: "5",
              subject: "Physics",
              assignment: "Motion Quiz",
              grade: "A",
              maxGrade: "A",
              percentage: 92,
              date: "2024-01-12",
              type: "quiz",
            },
            {
              id: "6",
              subject: "Physics",
              assignment: "Mechanics Project",
              grade: "B",
              maxGrade: "A",
              percentage: 78,
              date: "2024-01-08",
              type: "project",
            },
          ],
        },
        {
          subject: "English",
          currentGrade: "A",
          percentage: 92.3,
          assignments: [
            {
              id: "7",
              subject: "English",
              assignment: "Shakespeare Essay",
              grade: "A-",
              maxGrade: "A",
              percentage: 90,
              date: "2024-01-15",
              type: "assignment",
            },
            {
              id: "8",
              subject: "English",
              assignment: "Literature Quiz",
              grade: "A",
              maxGrade: "A",
              percentage: 95,
              date: "2024-01-11",
              type: "quiz",
            },
            {
              id: "9",
              subject: "English",
              assignment: "Poetry Analysis",
              grade: "A",
              maxGrade: "A",
              percentage: 92,
              date: "2024-01-05",
              type: "assignment",
            },
          ],
        },
        {
          subject: "Chemistry",
          currentGrade: "B",
          percentage: 82.1,
          assignments: [
            {
              id: "10",
              subject: "Chemistry",
              assignment: "Organic Lab",
              grade: "B",
              maxGrade: "A",
              percentage: 80,
              date: "2024-01-16",
              type: "assignment",
            },
            {
              id: "11",
              subject: "Chemistry",
              assignment: "Periodic Table Quiz",
              grade: "B+",
              maxGrade: "A",
              percentage: 85,
              date: "2024-01-09",
              type: "quiz",
            },
            {
              id: "12",
              subject: "Chemistry",
              assignment: "Bonding Test",
              grade: "B-",
              maxGrade: "A",
              percentage: 81,
              date: "2024-01-03",
              type: "exam",
            },
          ],
        },
      ])
    }
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-600"
    if (grade.startsWith("B")) return "text-blue-600"
    if (grade.startsWith("C")) return "text-yellow-600"
    return "text-red-600"
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "quiz":
        return "bg-blue-100 text-blue-800"
      case "exam":
        return "bg-red-100 text-red-800"
      case "assignment":
        return "bg-green-100 text-green-800"
      case "project":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const selectedChildData = children.find((c) => c.id === selectedChild)
  const overallGPA = subjectGrades.reduce((acc, subject) => acc + subject.percentage, 0) / subjectGrades.length

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
              <h1 className="text-3xl font-bold text-gray-900">Academic Grades</h1>
              <p className="text-gray-600">Monitor your child's academic performance and progress</p>
            </div>
            <div className="flex space-x-2">
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Semester</SelectItem>
                  <SelectItem value="previous">Previous Semester</SelectItem>
                  <SelectItem value="year">Full Year</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Report Card
              </Button>
            </div>
          </div>

          {/* Child Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Child</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedChildData && (
            <>
              {/* Overall Performance */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{(overallGPA / 20).toFixed(2)}</div>
                    <Progress value={overallGPA} className="mt-2" />
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
                    <CardTitle className="text-sm font-medium">Subjects</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{subjectGrades.length}</div>
                    <p className="text-xs text-muted-foreground">Active subjects</p>
                  </CardContent>
                </Card>
              </div>

              {/* Subject Grades */}
              <div className="space-y-6">
                {subjectGrades.map((subject, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            {subject.subject}
                          </CardTitle>
                          <CardDescription>Current grade and assignment history</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getGradeColor(subject.currentGrade)}`}>
                            {subject.currentGrade}
                          </div>
                          <p className="text-sm text-gray-600">{subject.percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {subject.assignments.map((assignment) => (
                          <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Badge className={getTypeColor(assignment.type)}>{assignment.type}</Badge>
                              <div>
                                <h4 className="font-medium">{assignment.assignment}</h4>
                                <p className="text-sm text-gray-600">
                                  {new Date(assignment.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-lg font-bold ${getGradeColor(assignment.grade)}`}>
                                {assignment.grade}
                              </div>
                              <p className="text-sm text-gray-600">{assignment.percentage}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
