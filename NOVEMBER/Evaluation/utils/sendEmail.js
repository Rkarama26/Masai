require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

//  Generic to send any email
async function sendEmail(to, subject, html, text) {
  const mailOptions = {
    from: `"${process.env.FROM_NAME || "Book_Your_Show"}" <${
      process.env.APP_EMAIL
    }>`,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(" Email sent to:", to);
    return info;
  } catch (err) {
    console.error("Error sending email:", err.message);
    throw err;
  }
}

//   Welcome Email function
async function sendWelcomeEmail(toEmail, username) {
  const subject = "🎉 Welcome to Book_Your_Show!";
  const text = `Hi ${
    username || ""
  },\n\nWelcome to Book_Your_Show! We're excited to have you on board.\n\nCheers,\nThe Book_Your_Show Team`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height:1.5;">
      <h2>Welcome, ${username || ""}! 👋</h2>
      <p>Thanks for signing up with <b>Book_Your_Show</b>!</p>
      <p>We’re thrilled to have you on board — enjoy browsing amazing events and booking tickets effortlessly!</p>
      <br/>
      <p>Cheers,<br/><strong>The Book_Your_Show Team</strong></p>
    </div>
  `;
  return sendEmail(toEmail, subject, html, text);
}

module.exports = { sendEmail, sendWelcomeEmail };
