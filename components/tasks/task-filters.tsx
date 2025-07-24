"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { TaskPriority, TaskStatus } from "@prisma/client"

export function TaskFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentStatus = searchParams.get("status")
  const currentPriority = searchParams.get("priority")
  const currentFilter = searchParams.get("filter")

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`/dashboard/tasks?${params.toString()}`)
  }

  const clearAllFilters = () => {
    router.push("/dashboard/tasks")
  }

  const hasActiveFilters = currentStatus || currentPriority || currentFilter

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Quick Filters:</span>
          <Button
            variant={currentFilter === "today" ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilter("filter", currentFilter === "today" ? null : "today")}
          >
            Today
          </Button>
          <Button
            variant={currentFilter === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilter("filter", currentFilter === "week" ? null : "week")}
          >
            This Week
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Select value={currentStatus || TaskStatus.NEW} onValueChange={(value) => updateFilter("status", value || null)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TaskStatus.NEW}>New</SelectItem>
            <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
            <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
          </SelectContent>
        </Select>

        <Select value={currentPriority || TaskPriority.P0} onValueChange={(value) => updateFilter("priority", value || null)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TaskPriority.P0}>P0 (High)</SelectItem>
            <SelectItem value={TaskPriority.P1}>P1 (Medium)</SelectItem>
            <SelectItem value={TaskPriority.P2}>P2 (Low)</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {currentStatus && (
            <Badge variant="secondary" className="cursor-pointer" onClick={() => updateFilter("status", null)}>
              Status: {currentStatus}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          )}
          {currentPriority && (
            <Badge variant="secondary" className="cursor-pointer" onClick={() => updateFilter("priority", null)}>
              Priority: {currentPriority}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          )}
          {currentFilter && (
            <Badge variant="secondary" className="cursor-pointer" onClick={() => updateFilter("filter", null)}>
              Filter: {currentFilter}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
