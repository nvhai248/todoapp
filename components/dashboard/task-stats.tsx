"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, AlertTriangle, ListTodo } from "lucide-react"

interface TaskStats {
  totalTasks: number
  completedTasks: number
  pendingTasks: number
  overdueTasks: number
}

export function TaskStats() {
  const [stats, setStats] = useState<TaskStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/analytics?period=week")
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: ListTodo,
      color: "text-blue-600",
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Pending",
      value: stats.pendingTasks,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Overdue",
      value: stats.overdueTasks,
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ]

  return (
    <>
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
