"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menu,
  X,
  Home,
  Users,
  BookOpen,
  Calendar,
  ClipboardList,
  GraduationCap,
  MessageSquare,
  CreditCard,
  Settings,
  Building2,
  UserCheck,
  FileText,
  Bell,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const getNavigationItems = () => {
    const baseItems = [{ name: "Dashboard", href: `/dashboard/${user?.role?.replace("_", "-")}`, icon: Home }]

    switch (user?.role) {
      case "super_admin":
        return [
          ...baseItems,
          { name: "Schools", href: "/dashboard/super-admin/schools", icon: Building2 },
          { name: "Billing", href: "/dashboard/super-admin/billing", icon: CreditCard },
          { name: "Analytics", href: "/dashboard/super-admin/analytics", icon: FileText },
        ]
      case "school_admin":
        return [
          ...baseItems,
          { name: "Students", href: "/dashboard/admin/students", icon: Users },
          { name: "Teachers", href: "/dashboard/admin/teachers", icon: UserCheck },
          { name: "Classes", href: "/dashboard/admin/classes", icon: BookOpen },
          { name: "Subjects", href: "/dashboard/admin/subjects", icon: GraduationCap },
          { name: "Attendance", href: "/dashboard/admin/attendance", icon: ClipboardList },
          { name: "Announcements", href: "/dashboard/admin/announcements", icon: MessageSquare },
          { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
        ]
      case "teacher":
        return [
          ...baseItems,
          { name: "My Classes", href: "/dashboard/teacher/classes", icon: BookOpen },
          { name: "Attendance", href: "/dashboard/teacher/attendance", icon: ClipboardList },
          { name: "Grades", href: "/dashboard/teacher/grades", icon: GraduationCap },
          { name: "Assignments", href: "/dashboard/teacher/assignments", icon: FileText },
          { name: "Timetable", href: "/dashboard/teacher/timetable", icon: Calendar },
        ]
      case "student":
        return [
          ...baseItems,
          { name: "Timetable", href: "/dashboard/student/timetable", icon: Calendar },
          { name: "Grades", href: "/dashboard/student/grades", icon: GraduationCap },
          { name: "Assignments", href: "/dashboard/student/assignments", icon: FileText },
          // { name: "Attendance", href: "/dashboard/student/attendance", icon: ClipboardList },
          { name: "school notices", href: "/dashboard/student/notices", icon: MessageSquare },
        ]
      case "parent":
        return [
          ...baseItems,
          { name: "Children", href: "/dashboard/parent/children", icon: Users },
          { name: "Attendance", href: "/dashboard/parent/attendance", icon: ClipboardList },
          { name: "Grades", href: "/dashboard/parent/grades", icon: GraduationCap },
          { name: "Announcements", href: "/dashboard/parent/announcements", icon: MessageSquare },
        ]
      default:
        return baseItems
    }
  }

  const navigationItems = getNavigationItems()

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-primary">EduManage</h1>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-6">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
