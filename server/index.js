import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registerApiRoutes } from "./routes/api.js";
import { query } from "./db.js"; // Import the database query function

const app = express();
const port = process.env.PORT || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "../dist");
const hasClientBuild = existsSync(distPath);

app.use(express.json());
registerApiRoutes(app);

// Database connection check
app.get("/db-health", async (_req, res) => {
  try {
    await query('SELECT 1');
    res.json({ ok: true, service: "nihongo-kawaii-server", database: "connected" });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ ok: false, service: "nihongo-kawaii-server", database: "disconnected", error: error.message });
  }
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "nihongo-kawaii-server" });
});

if (hasClientBuild) {
  app.use(express.static(distPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path === "/health") return next();
    res.sendFile(path.join(distPath, "index.html"), (error) => {
      if (error) next();
    });
  });
}

app.listen(port, () => {
  console.log(`Nihongo Kawaii server running on http://localhost:${port}`);
});
