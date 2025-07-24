"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Filter, BarChart3, Calendar } from "lucide-react"
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog"
import Link from "next/link"

export function QuickActions() {
  const [showCreateTask, setShowCreateTask] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
            onClick={() => setShowCreateTask(true)}
          >
            <Plus className="h-6 w-6" />
            <span>New Task</span>
          </Button>

          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
            asChild
          >
            <Link href="/dashboard/tasks?filter=today">
              <Calendar className="h-6 w-6" />
              <span>Today's Tasks</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
            asChild
          >
            <Link href="/dashboard/tasks?status=todo">
              <Filter className="h-6 w-6" />
              <span>Filter Tasks</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
            asChild
          >
            <Link href="/dashboard/analytics">
              <BarChart3 className="h-6 w-6" />
              <span>View Analytics</span>
            </Link>
          </Button>
        </div>

        <CreateTaskDialog open={showCreateTask} onOpenChange={setShowCreateTask} />
      </CardContent>
    </Card>
  )
}
