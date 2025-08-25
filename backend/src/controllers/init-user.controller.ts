import { Request, Response } from "express";
import { User } from "../models/user.model";

export const initUser = async (req:Request, res:Response) => {
  try {
      const { clerkId, email, firstName, lastName } = req.body
      if (!clerkId || !email) {
        return res.status(400).json({ error: "clerkId and email are required" });
      }
      let user = await User.findOne({ clerkId });
      if (!user) {
        user = await User.create({ clerkId, email, firstName, lastName });
      }
  
      return res.json({ user });
    } catch (e) {
      console.error("/api/init-user error", e);
      return res.status(500).json({ error: "Internal server error" });
    }
}