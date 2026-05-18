import "dotenv/config";
import express from "express";
import cors from "cors";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registerApiRoutes } from "./routes/api.js";
import supabase from "./db.js"; // Import the Supabase client
import { registerAuthRoutes } from "./routes/auth.js";


const app = express();
const port = process.env.PORT || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "../dist");
const hasClientBuild = existsSync(distPath);

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3001'], credentials: true }));
registerApiRoutes(app);
registerAuthRoutes(app);

// Database connection check
app.get("/db-health", async (_req, res) => {
  try {
    await supabase.from('users').select('id').limit(1);
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
  console.log(`🚀 API Server ready at http://localhost:${port}`);
  if (!hasClientBuild) console.log(`💡 Note: Use http://localhost:5173 for Frontend development`);
});

