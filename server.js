// server.js - Unified Next.js + Real-Time WebSocket Server on the same single port
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { WebSocketServer, WebSocket } = require("ws");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = parseInt(process.env.PORT || "3077", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Live chat memory stores
const sessionRooms = new Map();
const staffClients = new Set();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      // Internal broadcast endpoint
      if (req.method === "POST" && req.url === "/api/ws/broadcast") {
        let body = "";
        req.on("data", (chunk) => { body += chunk; });
        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            const { type, sessionId, data } = payload;
            if (sessionId && sessionRooms.has(sessionId)) {
              for (const client of sessionRooms.get(sessionId)) {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({ type, sessionId, data }));
                }
              }
            }
            if (type === "escalation" || type === "new_message") {
              for (const staff of staffClients) {
                if (staff.readyState === WebSocket.OPEN) {
                  staff.send(JSON.stringify({ type, sessionId, data }));
                }
              }
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: true }));
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: false, error: e.message }));
          }
        });
        return;
      }

      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  // Attach WebSocketServer to the same HTTP server on path /ws
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    const { pathname } = parse(request.url || "");
    if (pathname === "/ws") {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    } else if (!dev) {
      socket.destroy();
    }
  });

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

          if (sessionRooms.has(sessionId)) {
            for (const client of sessionRooms.get(sessionId)) {
              if (client.readyState === WebSocket.OPEN) {
                client.send(outMsg);
              }
            }
          }

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

    ws.on("error", () => {});
  });

  server.listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Kashtrix Platform & Real-Time Chat online on http://${hostname}:${port}`);
    console.log(`> WebSocket listening on ws://${hostname}:${port}/ws (same port)`);
  });
});
