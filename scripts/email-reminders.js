const { PrismaClient } = require("@prisma/client")
const nodemailer = require("nodemailer")

const prisma = new PrismaClient()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

async function sendTaskReminders() {
  try {
    console.log("Checking for tasks due within 24 hours...")

    const now = new Date()
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    const dueTasks = await prisma.task.findMany({
      where: {
        dueDate: {
          gte: now,
          lte: tomorrow,
        },
        status: {
          in: ["new", "todo"],
        },
      },
      include: {
        user: true,
      },
    })

    console.log(`Found ${dueTasks.length} tasks due within 24 hours`)

    for (const task of dueTasks) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: task.user.email,
        subject: `Task Reminder: ${task.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Task Reminder</h2>
            <p>Hi ${task.user.name}!</p>
            <p>This is a friendly reminder that your task "<strong>${task.title}</strong>" is due soon.</p>
            ${task.description ? `<p><strong>Description:</strong> ${task.description}</p>` : ""}
            <p><strong>Due Date:</strong> ${task.dueDate.toLocaleDateString()} at ${task.dueDate.toLocaleTimeString()}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p>Don't forget to complete it on time!</p>
            <p>Best regards,<br>TaskFlow Team</p>
          </div>
        `,
      }

      try {
        await transporter.sendMail(mailOptions)
        console.log(`Reminder email sent to ${task.user.email} for task: ${task.title}`)
      } catch (error) {
        console.error(`Error sending email to ${task.user.email}:`, error)
      }
    }

    console.log("Email reminder check completed")
  } catch (error) {
    console.error("Error in sendTaskReminders:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the function
sendTaskReminders()
