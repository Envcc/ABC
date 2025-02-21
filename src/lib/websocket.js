const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
const activeClients = new Set();

// Handle WebSocket Connections
wss.on("connection", (ws) => {
    console.log("New WebSocket connection established.");
    activeClients.add(ws);

    ws.on("close", () => {
        activeClients.delete(ws);
        console.log("WebSocket connection closed.");
    });
});

// Function to Send Real-Time Notifications
exports.sendWebSocketNotification = (message) => {
    activeClients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "notification", data: message }));
        }
    });
    console.log("Notification sent via WebSocket:", message);
};
