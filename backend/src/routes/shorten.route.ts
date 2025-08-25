import { Router } from "express";
import { shorten } from "../controllers/shorten.controller";

const shortenRouter = Router();

shortenRouter.use("/", shorten)

export default shortenRouter;
