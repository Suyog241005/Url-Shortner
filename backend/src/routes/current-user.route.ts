import { Router } from "express";
import { currentUser } from "../controllers/current-user.controller";

const router = Router();

router.post("/", currentUser);

export default router;
