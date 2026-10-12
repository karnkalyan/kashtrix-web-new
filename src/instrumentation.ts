export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      // Automatically spin up real-time WebSocket server alongside Next.js
      const { startWsServer } = require("../scripts/ws-server");
      startWsServer();
    } catch (err: any) {
      if (err?.code !== "EADDRINUSE") {
        console.warn("[Instrumentation] WS server startup check:", err?.message || err);
      }
    }
  }
}
