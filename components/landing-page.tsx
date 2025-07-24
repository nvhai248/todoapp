import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, BarChart3, Mail } from "lucide-react"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">TaskFlow</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            The ultimate task management solution to boost your productivity and keep you organized.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/auth/register">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle>Task Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create, organize, and track your tasks with ease. Set priorities and due dates.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Get insights into your productivity with detailed analytics and charts.</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Mail className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle>Email Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Never miss a deadline with automatic email reminders for upcoming tasks.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle>Smart Filtering</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Quickly find tasks with powerful filtering by status, priority, and due date.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to get organized?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of users who have improved their productivity with TaskFlow.
          </p>
          <Button asChild size="lg">
            <Link href="/auth/register">Start Your Free Account</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
