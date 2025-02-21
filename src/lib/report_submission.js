const crypto = require("crypto");
const { sendAdminEmail } = require("../mailer");
const { sendWebSocketNotification } = require("./websocket");

exports.submitReport = async (req, res) => {
    const { description, video_url } = req.body;

    if (!description || !video_url) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const severity = description.includes("threat") ? "High" : "Low";
    const encryptedVideo = `encrypted:${crypto.createHash("sha256").update(video_url).digest("hex")}`;

    // Simulated DB Save (Replace with actual DB call)
    const report = {
        id: crypto.randomBytes(8).toString("hex"),
        description,
        severity,
        video_url: encryptedVideo,
        submitted_at: new Date()
    };

    console.log("Report submitted:", report);

    if (severity === "High") {
        await sendAdminEmail({
            to_emails: ["admin@example.com"],
            subject: "🚨 High-Risk Report Submitted",
            body: `A new high-risk report was submitted. Description: ${description}`
        });
    }

    // Send Real-Time Notification via WebSocket
    sendWebSocketNotification(report);

    res.status(201).json({ message: "Report submitted successfully", report });
};
