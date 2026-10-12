// scripts/ws-server.js
// Real-time WebSocket server for Kashtrix AI & Live Staff Customer Support
const http = require("http");
const { WebSocketServer, WebSocket } = require("ws");

const PORT = process.env.WS_PORT || 3001;

// Session rooms: sessionId -> Set of WebSocket clients
const sessionRooms = new Map();
// Staff connections: Set of WebSocket clients
const staffClients = new Set();

const server = http.createServer((req, res) => {
  // Simple HTTP webhook to allow Next.js server actions to broadcast to WS clients
  if (req.method === "POST" && req.url === "/broadcast") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const payload = JSON.parse(body);
        const { type, sessionId, data } = payload;

        if (sessionId && sessionRooms.has(sessionId)) {
          const clients = sessionRooms.get(sessionId);
          for (const client of clients) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type, sessionId, data }));
            }
          }
        }

        // Also broadcast to staff if it's an escalation or new message
        if (type === "escalation" || type === "new_message") {
          for (const staff of staffClients) {
            if (staff.readyState === WebSocket.OPEN) {
              staff.send(JSON.stringify({ type, sessionId, data }));
            }
          }
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  // Health check
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "running", port: PORT, staffOnline: staffClients.size }));
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  let currentSessionId = null;
  let isStaff = false;

  ws.on("message", (raw) => {
    try {
      const msg = JSON.parse(raw.toString());

      if (msg.type === "join") {
        currentSessionId = msg.sessionId;
        isStaff = msg.role === "staff";

        if (isStaff) {
          staffClients.add(ws);
        }

        if (currentSessionId) {
          if (!sessionRooms.has(currentSessionId)) {
            sessionRooms.set(currentSessionId, new Set());
          }
          sessionRooms.get(currentSessionId).add(ws);
        }

        ws.send(JSON.stringify({ type: "joined", sessionId: currentSessionId, role: msg.role }));
        return;
      }

      if (msg.type === "chat_message") {
        const { sessionId, sender, senderName, text, createdAt } = msg;
        const outMsg = JSON.stringify({
          type: "chat_message",
          sessionId,
          sender,
          senderName: senderName || (sender === "staff" ? "Kashtrix Support" : "Customer"),
          text,
          createdAt: createdAt || new Date().toISOString(),
        });

        // Broadcast to everyone in this session
        if (sessionRooms.has(sessionId)) {
          for (const client of sessionRooms.get(sessionId)) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(outMsg);
            }
          }
        }

        // Broadcast to all staff
        for (const staff of staffClients) {
          if (staff !== ws && staff.readyState === WebSocket.OPEN) {
            staff.send(outMsg);
          }
        }
        return;
      }

      if (msg.type === "escalate") {
        const { sessionId, userName, userEmail, userPhone, reason } = msg;
        const alertMsg = JSON.stringify({
          type: "escalation_alert",
          sessionId,
          userName,
          userEmail,
          userPhone,
          reason,
          timestamp: new Date().toISOString(),
        });

        for (const staff of staffClients) {
          if (staff.readyState === WebSocket.OPEN) {
            staff.send(alertMsg);
          }
        }
        return;
      }

      if (msg.type === "ping") {
        ws.send(JSON.stringify({ type: "pong" }));
      }
    } catch (err) {
      console.error("WS error processing message:", err);
    }
  });

  ws.on("close", () => {
    if (isStaff) {
      staffClients.delete(ws);
    }
    if (currentSessionId && sessionRooms.has(currentSessionId)) {
      sessionRooms.get(currentSessionId).delete(ws);
      if (sessionRooms.get(currentSessionId).size === 0) {
        sessionRooms.delete(currentSessionId);
      }
    }
  });

  ws.on("error", () => {
    // handled
  });
});

function startWsServer(port = PORT) {
  if (server.listening) return server;
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`[Kashtrix WS Server] Port ${port} is already in use by another instance.`);
    } else {
      console.error("[Kashtrix WS Server] Error:", err);
    }
  });

  server.listen(port, () => {
    console.log(`[Kashtrix WS Server] Live Staff Chat WebSocket listening on port ${port}`);
  });
  return server;
}

if (require.main === module) {
  startWsServer();
}

module.exports = { startWsServer, server, wss, sessionRooms, staffClients };

