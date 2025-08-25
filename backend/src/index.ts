import express from "express"
import cors from "cors";
import mongoose from "mongoose";

import { PORT, MONGO_URI, FRONTEND_URI } from "./config";

import rootRouter from "./routes";
import redirectRouter from "./routes/redirect.route";

const app = express();

app.use(express.json());

app.use(cors({ origin: [FRONTEND_URI], credentials: true }));

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: unknown) => console.log("Error connecting to MongoDB", err));

app.use("/api", rootRouter);
app.use("/", redirectRouter);

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));