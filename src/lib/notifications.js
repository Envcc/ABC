const { sendAdminEmail } = require("../mailer");
const { sendWebSocketNotification } = require("./websocket");
const crypto = require("crypto");

exports.sendNotification = async (req, res) => {
    const { user_id, message } = req.body;
    if (!user_id || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Simulated DB Save (Replace with actual DB call)
    const notification = {
        id: crypto.randomBytes(8).toString("hex"),
        user_id,
        message,
        status: "pending",
        created_at: new Date()
    };

    console.log("Notification Created:", notification);

    // Send Email for Critical Alerts
    if (message.includes("High Risk")) {
        await sendAdminEmail({
            to_emails: ["admin@example.com"],
            subject: "🚨 High-Risk Report Alert",
            body: `A high-risk report requires attention: ${message}`
        });
    }

    // Send Real-Time Notification via WebSocket
    sendWebSocketNotification(notification);

    res.status(201).json({ message: "Notification sent successfully", notification });
};
