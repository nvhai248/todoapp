import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { TaskStats } from "@/components/dashboard/task-stats"
import { RecentTasks } from "@/components/dashboard/recent-tasks"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here is an overview of your tasks.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <TaskStats />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <QuickActions />
          <RecentTasks />
        </div>
      </div>
    </DashboardLayout>
  )
}
