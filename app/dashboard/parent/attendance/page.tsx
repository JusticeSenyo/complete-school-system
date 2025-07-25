"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface AttendanceRecord {
  date: string
  status: "present" | "absent" | "late" | "excused"
  reason?: string
  semester: string
}

interface Child {
  id: string
  name: string
}

export default function ParentAttendancePage() {
  const [children, setChildren] = useState<Child[]>([])
  const [selectedChildId, setSelectedChildId] = useState<string>("")
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])

  useEffect(() => {
    fetchChildren()
  }, [])

  useEffect(() => {
    if (selectedChildId) {
      fetchAttendance(selectedChildId)
    }
  }, [selectedChildId])

  const fetchChildren = async () => {
    setChildren([
      { id: "1", name: "Emmanuel Mensah" },
      { id: "2", name: "Sandra Akua" },
    ])
  }

  const fetchAttendance = async (childId: string) => {
    const dataMap: Record<string, AttendanceRecord[]> = {
      "1": [
        { date: "2025-07-01", status: "present", semester: "Semester 1" },
        { date: "2025-07-02", status: "late", semester: "Semester 1" },
        { date: "2025-07-03", status: "absent", reason: "Sick", semester: "Semester 2" },
        { date: "2025-07-04", status: "present", semester: "Semester 2" },
      ],
      "2": [
        { date: "2025-07-01", status: "absent", reason: "Family Emergency", semester: "Semester 1" },
        { date: "2025-07-02", status: "present", semester: "Semester 1" },
        { date: "2025-07-03", status: "late", semester: "Semester 2" },
        { date: "2025-07-04", status: "excused", reason: "Medical Appointment", semester: "Semester 2" },
      ]
    }
    setAttendance(dataMap[childId] || [])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800"
      case "absent":
        return "bg-red-100 text-red-800"
      case "late":
        return "bg-yellow-100 text-yellow-800"
      case "excused":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDownload = () => {
    const data = attendance
      .filter((r) => !selectedSemester || r.semester === selectedSemester)
      .map((r) => `${r.date},${r.status},${r.reason || ""},${r.semester}`)
      .join("\n")
    const blob = new Blob(["Date,Status,Reason,Semester\n" + data], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "attendance.csv"
    link.click()
  }

  const filteredAttendance = selectedSemester
    ? attendance.filter((record) => record.semester === selectedSemester)
    : attendance

  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Child Attendance Tracker</h1>
            <p className="text-gray-600">Monitor your children's school attendance</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Select Child</CardTitle>
              <CardDescription>View attendance by child</CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedChildId} value={selectedChildId}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Choose a child" />
                </SelectTrigger>
                <SelectContent>
                  {children.map((child) => (
                    <SelectItem key={child.id} value={child.id}>
                      {child.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {selectedChildId && (
            <Card>
              <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Attendance Records</CardTitle>
                  <CardDescription>Detailed history of attendance</CardDescription>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <Select onValueChange={setSelectedSemester} value={selectedSemester}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Semester 1">Semester 1</SelectItem>
                      <SelectItem value="Semester 2">Semester 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleDownload} variant="outline">
                    <Download className="w-4 h-4 mr-2" /> Download CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAttendance.map((record, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 border rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-600">
                          {record.reason ? `Reason: ${record.reason}` : "No reason provided"}
                        </p>
                      </div>
                      <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
