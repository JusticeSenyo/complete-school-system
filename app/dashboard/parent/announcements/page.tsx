"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Search, Calendar, Bell, Filter } from "lucide-react"

interface Announcement {
  id: string
  title: string
  message: string
  date: string
  priority: "high" | "medium" | "low"
  category: "general" | "academic" | "event" | "urgent" | "sports"
  author: string
  read: boolean
}

export default function ParentAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  useEffect(() => {
    filterAnnouncements()
  }, [announcements, searchTerm, priorityFilter, categoryFilter])

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("/api/parent/announcements")
      if (response.ok) {
        const data = await response.json()
        setAnnouncements(data.announcements)
      }
    } catch (error) {
      console.error("Error fetching announcements:", error)
      // Mock data
      setAnnouncements([
        {
          id: "1",
          title: "Parent-Teacher Conference",
          message:
            "Dear parents, we are pleased to announce our upcoming Parent-Teacher Conference scheduled for next week. This is an excellent opportunity to discuss your child's academic progress, address any concerns, and collaborate on strategies to support their learning journey. Please confirm your attendance by replying to this announcement.",
          date: "2024-01-22",
          priority: "high",
          category: "academic",
          author: "Principal Johnson",
          read: false,
        },
        {
          id: "2",
          title: "School Sports Day 2024",
          message:
            "We are excited to announce our Annual Sports Day will be held on February 15th, 2024. Students from all grades will participate in various sporting events. Parents are invited to attend and cheer for their children. The event will start at 9:00 AM and conclude by 4:00 PM.",
          date: "2024-01-20",
          priority: "medium",
          category: "sports",
          author: "Sports Coordinator",
          read: true,
        },
        {
          id: "3",
          title: "Library Book Return Reminder",
          message:
            "This is a friendly reminder that all library books borrowed during this semester must be returned by January 31st, 2024. Late returns will incur a fine of $1 per day. Please check with your child to ensure all books are returned on time.",
          date: "2024-01-18",
          priority: "low",
          category: "general",
          author: "Librarian",
          read: true,
        },
        {
          id: "4",
          title: "Science Fair Registration Open",
          message:
            "Registration for the Annual Science Fair is now open! Students interested in participating should submit their project proposals by February 1st. This is a great opportunity for students to showcase their scientific knowledge and creativity. Prizes will be awarded for outstanding projects.",
          date: "2024-01-17",
          priority: "medium",
          category: "academic",
          author: "Science Department",
          read: false,
        },
        {
          id: "5",
          title: "School Closure - Weather Alert",
          message:
            "Due to severe weather conditions forecasted for tomorrow, January 16th, the school will remain closed for the safety of our students and staff. All classes and activities are cancelled. Please stay safe and warm. Regular classes will resume on January 17th.",
          date: "2024-01-15",
          priority: "high",
          category: "urgent",
          author: "Administration",
          read: true,
        },
        {
          id: "6",
          title: "New Lunch Menu Available",
          message:
            "We're pleased to introduce our new lunch menu featuring healthier options and diverse cuisines. The new menu will be effective from February 1st. Please review the menu with your child and update any dietary preferences or restrictions in their profile.",
          date: "2024-01-14",
          priority: "low",
          category: "general",
          author: "Cafeteria Manager",
          read: false,
        },
        {
          id: "7",
          title: "Drama Club Performance",
          message:
            "The Drama Club will be performing 'Romeo and Juliet' on February 10th at 7:00 PM in the school auditorium. Tickets are available at the school office for $10 each. Come support our talented students in this classic Shakespearean production!",
          date: "2024-01-12",
          priority: "medium",
          category: "event",
          author: "Drama Teacher",
          read: true,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const filterAnnouncements = () => {
    let filtered = announcements

    if (searchTerm) {
      filtered = filtered.filter(
        (announcement) =>
          announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          announcement.message.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((announcement) => announcement.priority === priorityFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((announcement) => announcement.category === categoryFilter)
    }

    setFilteredAnnouncements(filtered)
  }

  const markAsRead = async (announcementId: string) => {
    try {
      await fetch(`/api/parent/announcements/${announcementId}/read`, {
        method: "POST",
      })
      setAnnouncements((prev) =>
        prev.map((announcement) =>
          announcement.id === announcementId ? { ...announcement, read: true } : announcement,
        ),
      )
    } catch (error) {
      console.error("Error marking announcement as read:", error)
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800"
      case "event":
        return "bg-purple-100 text-purple-800"
      case "urgent":
        return "bg-red-100 text-red-800"
      case "sports":
        return "bg-orange-100 text-orange-800"
      case "general":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const unreadCount = announcements.filter((a) => !a.read).length

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
              <h1 className="text-3xl font-bold text-gray-900">School Announcements</h1>
              <p className="text-gray-600">
                Stay updated with important school news and events
                {unreadCount > 0 && <Badge className="ml-2 bg-red-100 text-red-800">{unreadCount} unread</Badge>}
              </p>
            </div>
            <Button onClick={() => window.location.reload()}>
              <Bell className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search announcements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="event">Events</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Announcements List */}
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => (
              <Card
                key={announcement.id}
                className={`cursor-pointer transition-colors ${
                  !announcement.read ? "border-primary/50 bg-primary/5" : "hover:bg-gray-50"
                }`}
                onClick={() => !announcement.read && markAsRead(announcement.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        <CardTitle className={!announcement.read ? "font-bold" : "font-medium"}>
                          {announcement.title}
                        </CardTitle>
                        {!announcement.read && <Badge className="bg-blue-100 text-blue-800 text-xs">NEW</Badge>}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(announcement.date).toLocaleDateString()}
                        <span>•</span>
                        <span>By {announcement.author}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(announcement.priority)}>{announcement.priority}</Badge>
                      <Badge className={getCategoryColor(announcement.category)}>{announcement.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{announcement.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAnnouncements.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
                <p className="text-gray-600">
                  {searchTerm || priorityFilter !== "all" || categoryFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "No announcements available at this time"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
