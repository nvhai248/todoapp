import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AnalyticsCharts } from "@/components/analytics/analytics-charts"
import { AnalyticsStats } from "@/components/analytics/analytics-stats"

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Insights and statistics about your task management.</p>
        </div>

        <AnalyticsStats />
        <AnalyticsCharts />
      </div>
    </DashboardLayout>
  )
}
