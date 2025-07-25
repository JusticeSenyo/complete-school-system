"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Users,
  Building2,
  CreditCard,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"

interface AnalyticsData {
  userGrowth: Array<{
    month: string
    totalUsers: number
    newUsers: number
    activeUsers: number
  }>
  schoolMetrics: Array<{
    schoolName: string
    students: number
    teachers: number
    revenue: number
    plan: string
    growth: number
  }>
  revenueData: Array<{
    month: string
    revenue: number
    subscriptions: number
  }>
  platformStats: {
    totalRevenue: number
    totalSchools: number
    totalUsers: number
    averageRevenue: number
    churnRate: number
    growthRate: number
  }
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("6months")

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/super-admin/analytics?range=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error("Error fetching analytics:", error)
      // Mock data for demo
      setAnalytics({
        userGrowth: [
          { month: "Jan", totalUsers: 8500, newUsers: 450, activeUsers: 7200 },
          { month: "Feb", totalUsers: 9200, newUsers: 700, activeUsers: 7800 },
          { month: "Mar", totalUsers: 9800, newUsers: 600, activeUsers: 8300 },
          { month: "Apr", totalUsers: 10500, newUsers: 700, activeUsers: 8900 },
          { month: "May", totalUsers: 11200, newUsers: 700, activeUsers: 9500 },
          { month: "Jun", totalUsers: 12500, newUsers: 1300, activeUsers: 10800 },
        ],
        schoolMetrics: [
          { schoolName: "Greenwood High", students: 850, teachers: 45, revenue: 299, plan: "Premium", growth: 12.5 },
          { schoolName: "Riverside Academy", students: 620, teachers: 32, revenue: 199, plan: "Standard", growth: 8.3 },
          { schoolName: "Mountain View", students: 450, teachers: 28, revenue: 99, plan: "Basic", growth: 15.2 },
          { schoolName: "Sunset Elementary", students: 320, teachers: 18, revenue: 99, plan: "Basic", growth: -2.1 },
          { schoolName: "Oak Valley School", students: 780, teachers: 42, revenue: 299, plan: "Premium", growth: 18.7 },
        ],
        revenueData: [
          { month: "Jan", revenue: 98500, subscriptions: 38 },
          { month: "Feb", revenue: 105200, subscriptions: 40 },
          { month: "Mar", revenue: 112800, subscriptions: 41 },
          { month: "Apr", revenue: 118500, subscriptions: 42 },
          { month: "May", revenue: 122300, subscriptions: 43 },
          { month: "Jun", revenue: 125000, subscriptions: 45 },
        ],
        platformStats: {
          totalRevenue: 1250000,
          totalSchools: 45,
          totalUsers: 12500,
          averageRevenue: 2777,
          churnRate: 2.3,
          growthRate: 15.8,
        },
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["super_admin"]}>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["super_admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
              <p className="text-gray-600">Comprehensive insights into platform performance and growth</p>
            </div>
            <div className="flex space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="12months">Last 12 Months</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analytics?.platformStats.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +{analytics?.platformStats.growthRate}% from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Schools</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.platformStats.totalSchools}</div>
                <p className="text-xs text-muted-foreground">Paying subscribers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.platformStats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Across all schools</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.platformStats.churnRate}%</div>
                <p className="text-xs text-muted-foreground">Monthly churn rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Revenue Growth
                  </CardTitle>
                  <CardDescription>Monthly revenue and subscription trends</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.revenueData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{data.month} 2024</h3>
                        <p className="text-sm text-gray-600">{data.subscriptions} active subscriptions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${data.revenue.toLocaleString()}</p>
                      <p className="text-sm text-green-600">
                        +
                        {index > 0
                          ? (
                              ((data.revenue - analytics.revenueData[index - 1].revenue) /
                                analytics.revenueData[index - 1].revenue) *
                              100
                            ).toFixed(1)
                          : 0}
                        %
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* School Performance */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Top Performing Schools
                  </CardTitle>
                  <CardDescription>Schools ranked by growth and revenue</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.schoolMetrics.map((school, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{school.schoolName}</h3>
                        <p className="text-sm text-gray-600">
                          {school.students} students • {school.teachers} teachers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge
                        variant={
                          school.plan === "Premium" ? "default" : school.plan === "Standard" ? "secondary" : "outline"
                        }
                      >
                        {school.plan}
                      </Badge>
                      <div className="text-right">
                        <p className="font-semibold">${school.revenue}/month</p>
                        <p className={`text-sm ${school.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                          {school.growth > 0 ? "+" : ""}
                          {school.growth}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Growth */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    User Growth Analytics
                  </CardTitle>
                  <CardDescription>Monthly user acquisition and engagement</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.userGrowth.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{data.month} 2024</h3>
                        <p className="text-sm text-gray-600">+{data.newUsers} new users</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-right">
                      <div>
                        <p className="text-sm text-gray-600">Total Users</p>
                        <p className="font-semibold">{data.totalUsers.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Active Users</p>
                        <p className="font-semibold">{data.activeUsers.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
