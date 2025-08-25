import express from "express"
import cors from "cors";
import mongoose from "mongoose";

import { PORT, MONGO_URI, ALLOWED_ORIGINS } from "./config";

import rootRouter from "./routes";
import redirectRouter from "./routes/redirect.route";

const app = express();

app.use(express.json());

// Normalize and build allowlist
const normalizeOrigin = (o?: string | null) => (o || "").trim().replace(/\/$/, "");
const allowedOrigins = new Set<string>([
  ...ALLOWED_ORIGINS.map(o => normalizeOrigin(o)),
]);

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    const normalized = normalizeOrigin(origin);
    if (allowedOrigins.has(normalized)) return callback(null, true);
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: unknown) => console.log("Error connecting to MongoDB", err));

app.use("/api", rootRouter);
app.use("/", redirectRouter);

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));