"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CreditCard, DollarSign, TrendingUp, Calendar, Search, Download, Eye } from "lucide-react"

interface BillingStats {
  totalRevenue: number
  monthlyRevenue: number
  activeSubscriptions: number
  pendingPayments: number
}

interface Subscription {
  id: string
  schoolName: string
  plan: string
  amount: number
  status: "active" | "pending" | "overdue" | "cancelled"
  nextBilling: string
  lastPayment: string
}

export default function BillingPage() {
  const [stats, setStats] = useState<BillingStats>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    activeSubscriptions: 0,
    pendingPayments: 0,
  })
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchBillingData()
  }, [])

  const fetchBillingData = async () => {
    try {
      const [statsResponse, subscriptionsResponse] = await Promise.all([
        fetch("/api/super-admin/billing/stats"),
        fetch("/api/super-admin/billing/subscriptions"),
      ])

      if (statsResponse.ok && subscriptionsResponse.ok) {
        const statsData = await statsResponse.json()
        const subscriptionsData = await subscriptionsResponse.json()

        setStats(statsData)
        setSubscriptions(subscriptionsData.subscriptions)
      }
    } catch (error) {
      console.error("Error fetching billing data:", error)
      // Mock data for demo
      setStats({
        totalRevenue: 1250000,
        monthlyRevenue: 125000,
        activeSubscriptions: 42,
        pendingPayments: 3,
      })
      setSubscriptions([
        {
          id: "1",
          schoolName: "Greenwood High School",
          plan: "Premium",
          amount: 299,
          status: "active",
          nextBilling: "2024-02-15",
          lastPayment: "2024-01-15",
        },
        {
          id: "2",
          schoolName: "Riverside Academy",
          plan: "Standard",
          amount: 199,
          status: "active",
          nextBilling: "2024-02-10",
          lastPayment: "2024-01-10",
        },
        {
          id: "3",
          schoolName: "Mountain View School",
          plan: "Basic",
          amount: 99,
          status: "pending",
          nextBilling: "2024-02-08",
          lastPayment: "2024-01-08",
        },
        {
          id: "4",
          schoolName: "Sunset Elementary",
          plan: "Basic",
          amount: 99,
          status: "overdue",
          nextBilling: "2024-01-20",
          lastPayment: "2023-12-20",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredSubscriptions = subscriptions.filter((subscription) =>
    subscription.schoolName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Premium":
        return "bg-purple-100 text-purple-800"
      case "Standard":
        return "bg-blue-100 text-blue-800"
      case "Basic":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
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
              <h1 className="text-3xl font-bold text-gray-900">Billing & Revenue</h1>
              <p className="text-gray-600">Monitor subscriptions and revenue across all schools</p>
            </div>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">All-time revenue</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
                <p className="text-xs text-muted-foreground">Currently active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingPayments}</div>
                <p className="text-xs text-muted-foreground">Require attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search schools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Subscriptions List */}
          <Card>
            <CardHeader>
              <CardTitle>All Subscriptions ({filteredSubscriptions.length})</CardTitle>
              <CardDescription>Manage billing for all school subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSubscriptions.map((subscription) => (
                  <div
                    key={subscription.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{subscription.schoolName}</h3>
                        <p className="text-sm text-gray-600">
                          Last payment: {new Date(subscription.lastPayment).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <Badge className={getPlanColor(subscription.plan)}>{subscription.plan}</Badge>
                      </div>

                      <div className="text-center">
                        <p className="font-semibold">${subscription.amount}/month</p>
                      </div>

                      <div className="text-center">
                        <Badge className={getStatusColor(subscription.status)}>{subscription.status}</Badge>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          Next: {new Date(subscription.nextBilling).toLocaleDateString()}
                        </p>
                      </div>

                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
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
