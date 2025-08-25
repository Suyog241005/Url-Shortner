import { Request, Response } from "express";
import { Url } from "../models/url.model";

export const urls = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const urls = await Url.find({ userId });
        return res.json(urls);

    } catch (error) {
        console.log("/api/urls error", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteUrls = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await Url.deleteOne({ _id: id });
        return res.json({ message: "URL deleted successfully" });

    } catch (error) {
        console.log("/api/urls error", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}