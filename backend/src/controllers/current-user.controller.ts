import { Request, Response } from "express";
import { User } from "../models/user.model";

export const currentUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ clerkId: req.body.clerkId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json(user);
    } catch (error) {
        console.log("/api/current-user error", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
