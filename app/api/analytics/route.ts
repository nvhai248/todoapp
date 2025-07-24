import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { TaskStatus } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "week"

    let dateFilter: any = {}
    const now = new Date()

    switch (period) {
      case "day":
        const startOfDay = new Date(now)
        startOfDay.setHours(0, 0, 0, 0)
        dateFilter = { gte: startOfDay }
        break
      case "week":
        const startOfWeek = new Date(now)
        startOfWeek.setDate(now.getDate() - 7)
        dateFilter = { gte: startOfWeek }
        break
      case "month":
        const startOfMonth = new Date(now)
        startOfMonth.setDate(now.getDate() - 30)
        dateFilter = { gte: startOfMonth }
        break
      case "year":
        const startOfYear = new Date(now)
        startOfYear.setDate(now.getDate() - 365)
        dateFilter = { gte: startOfYear }
        break
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: user.id,
        createdAt: dateFilter,
      },
    })

    const analytics = {
      totalTasks: tasks.length,
      completedTasks: tasks.filter((task) => task.status === TaskStatus.DONE).length,
      pendingTasks: tasks.filter((task) => task.status !== TaskStatus.DONE).length,
      overdueTasks: tasks.filter((task) => task.dueDate && task.dueDate < now && task.status !== TaskStatus.DONE).length,
      tasksByStatus: {
        new: tasks.filter((task) => task.status === TaskStatus.NEW).length,
        todo: tasks.filter((task) => task.status === TaskStatus.TODO).length,
        done: tasks.filter((task) => task.status === TaskStatus.DONE).length,
      },
      tasksByPriority: {
        P0: tasks.filter((task) => task.priority === "P0").length,
        P1: tasks.filter((task) => task.priority === "P1").length,
        P2: tasks.filter((task) => task.priority === "P2").length,
      },
    }

    return NextResponse.json(analytics)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
