import { Request, Response } from "express";
import { Url } from "../models/url.model";
import { nanoid } from "nanoid";
import { User } from "../models/user.model";

export const shorten = async (req: Request, res: Response) => {
  try {
    const { longUrl, userId } = req.body;
    if (!longUrl) return res.status(400).json({ error: "Long URL is required" });
    if (!userId) return res.status(400).json({ error: "userId is required" });

    const shortUrl = await nanoid(7);
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    await Url.create({ shortUrl, longUrl, userId });

    return res.json({ shortUrl });
  } catch (error) {
    console.log("/api/shorten error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}