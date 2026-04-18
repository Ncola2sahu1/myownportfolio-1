const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route (optional but useful)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Contact form route
app.post("/contact", async (req, res) => {
  console.log("Received data:", req.body); // DEBUG

  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields required" });
  }

  try {
    // Email transporter (Gmail SMTP)
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "trykrkedekho2000@gmail.com",        // 👈 replace
        pass: "tnsbrwdiaezkhdet"            // 👈 replace (no spaces)
      }
    });

    // Email content
    let mailOptions = {
      from: `"Portfolio Contact" <YOUR_EMAIL@gmail.com>`,
      to: "YOUR_EMAIL@gmail.com", // 👈 you receive message here
      subject: subject || "New Contact Message",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully"); // DEBUG

    res.status(200).json({ success: true });

  } catch (error) {
    console.log("Error:", error); // VERY IMPORTANT
    res.status(500).json({ success: false });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});