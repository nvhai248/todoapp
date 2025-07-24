"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { TaskPriority, TaskStatus } from "@prisma/client"

interface Task {
  id: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string | null
  createdAt: string
}

export function RecentTasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks")
        if (response.ok) {
          const data = await response.json()
          setTasks(data.slice(0, 5)) // Show only 5 recent tasks
        }
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    }

    fetchTasks()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case TaskStatus.NEW:
        return "bg-blue-100 text-blue-800"
      case TaskStatus.TODO:
        return "bg-yellow-100 text-yellow-800"
      case TaskStatus.DONE:
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "P0":
        return "bg-red-100 text-red-800"
      case "P1":
        return "bg-orange-100 text-orange-800"
      case "P2":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No tasks found. Create your first task!</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Created {formatDistanceToNow(new Date(task.createdAt))} ago
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                  <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
