import { Request, Response } from "express";
import { Url } from "../models/url.model";

export const redirect = async (req: Request, res: Response) => {
  try {
    const { shortcode } = req.params;
    const url = await Url.findOne({ shortUrl: shortcode });
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }
    res.redirect(url.longUrl);

  } catch (error) {
    console.log("/api/redirect error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}