import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendTaskReminder(
  email: string,
  taskTitle: string,
  dueDate: Date
) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Task Reminder: ${taskTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Task Reminder</h2>
        <p>Hi there!</p>
        <p>This is a friendly reminder that your task "<strong>${taskTitle}</strong>" is due soon.</p>
        <p><strong>Due Date:</strong> ${dueDate.toLocaleDateString()}</p>
        <p>Don't forget to complete it on time!</p>
        <p>Best regards,<br>TaskFlow Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${email} for task: ${taskTitle}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
