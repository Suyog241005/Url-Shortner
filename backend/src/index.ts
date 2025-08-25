import express from "express"
import cors from "cors";
import mongoose from "mongoose";

import { PORT, MONGO_URI, FRONTEND_URI } from "./config";

import rootRouter from "./routes";
import redirectRouter from "./routes/redirect.route";

const app = express();

app.use(express.json());

// Allow multiple exact origins (no wildcards with credentials)
const allowedOrigins = new Set<string>([
  FRONTEND_URI,
  "http://localhost:5173",
  "https://url-shortner-alpha-topaz.vercel.app",
]);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
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