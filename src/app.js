import express from "express";
import cors from "cors";
import missionsRouter from "./routes/missions.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

//Healthcheck
app.get("/health", (req, res) => {
  res.json({ status: "OK", service: "missions-api" });
});

// API routes
app.use("/api/missions", missionsRouter);

app.get("/", (req, res) => {
  res.json({
    service: "missions-api",
    status: "running",
    description: "API REST de démonstration (CRUD missions)",
    endpoints: {
      health: "/health",
      missions: "/api/missions"
    },
    usage: {
      list: "GET /api/missions",
      create: "POST /api/missions",
      update: "PUT /api/missions/:id",
      delete: "DELETE /api/missions/:id"
    }
  });
});

//404 fallback
app.use( (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;