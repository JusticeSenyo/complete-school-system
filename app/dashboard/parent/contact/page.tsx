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
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import {
  ClipboardList,
  GraduationCap,
  MessageSquare,
  Phone,
  Copy,
} from "lucide-react"
import Link from "next/link"

const teachers = [
  { id: 1, name: "Mr. Daniel Owusu", subject: "Math", phone: "+233501234567" },
  { id: 2, name: "Ms. Akosua Mensah", subject: "English", phone: "+233502345678" },
  { id: 3, name: "Mrs. Grace Boateng", subject: "Science", phone: "+233503456789" },
  { id: 4, name: "Mr. Kwame Nkrumah", subject: "History", phone: "+233504567890" },
]

export default function ParentDashboard() {
  const [search, setSearch] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState<typeof teachers[0] | null>(null)

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleCopy = () => {
    if (selectedTeacher?.phone) {
      navigator.clipboard.writeText(selectedTeacher.phone)
      toast({ title: "Copied", description: "Phone number copied to clipboard" })
    }
  }

  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
              <p className="text-gray-600">
                Monitor your children's academic progress and contact their teachers
              </p>
            </div>
            <Button>
              <Phone className="w-4 h-4 mr-2" />
              Contact School
            </Button>
          </div>



          {/* Teacher Contact Panel */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Teachers</h2>
            <div className="max-w-lg mb-6">
              <Input
                placeholder="Search by teacher's name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white/10 backdrop-blur-md border border-white/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachers.map((teacher) => (
                <Card
                  key={teacher.id}
                  className="bg-white/10 backdrop-blur-md border border-white/20 shadow-md text-black"
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{teacher.name}</CardTitle>
                    <p className="text-sm text-black">Subject: {teacher.subject}</p>
                  </CardHeader>
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full bg-white/20 text-black hover:bg-white/30"
                          onClick={() => setSelectedTeacher(teacher)}
                        >
                          Contact Teacher
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white/10 backdrop-blur-md border border-white/20 text-white max-w-sm">
                        <h2 className="text-lg font-semibold mb-2">
                          Contact Info – {selectedTeacher?.name}
                        </h2>
                        <p>Phone: {selectedTeacher?.phone}</p>
                        <div className="mt-4 flex gap-4">
                          <Button
                            variant="outline"
                            className="flex items-center gap-2 text-black"
                            onClick={handleCopy}
                          >
                            <Copy className="w-4 h-4 text-black" /> Copy
                          </Button>
                          <a href={`tel:${selectedTeacher?.phone}`} className="w-full">
                            <Button variant="outline" className="w-full flex items-center gap-2 text-black">
                              <Phone className="w-4 h-4 text-black" /> Call
                            </Button>
                          </a>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

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
