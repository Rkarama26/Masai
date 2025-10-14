const nodemailer = require("nodemailer");
require("dotenv").config();

// Email Communication 
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // smtp protocol
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.GOOGLE_APP_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
});

/**
 * Send an email using nodemailer
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - Email HTML body
 */
const sendMail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Karma Foods" <${process.env.MAIL_USER}>`,
            to,
            subject,
            html,
        });
        console.log(" Email sent:", info.messageId);
        return true;
    } catch (error) {
        console.error(" Error sending email:", error.message);
        throw new Error("Failed to send email");
    }
};

module.exports = sendMail;
