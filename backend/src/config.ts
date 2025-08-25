import dotenv from "dotenv";
dotenv.config();

export const PORT= process.env.PORT || 3000;
export const MONGO_URI= process.env.MONGO_URI!;
export const FRONTEND_URI= process.env.FRONTEND_URI!;

// Explicit allowlist of frontend origins to fix CORS issues
export const ALLOWED_ORIGINS = [
  process.env.FRONTEND_URI,
  "https://url-shortner-git-main-suyog241005s-projects.vercel.app",
  "https://url-shortner-8z7oexex5-suyog241005s-projects.vercel.app",
  "https://url-shortner-alpha-topaz.vercel.app",
  "http://localhost:5173",
].filter(Boolean) as string[];