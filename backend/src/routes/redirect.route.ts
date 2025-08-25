import { Router } from "express";
import { redirect } from "../controllers/redirect.controller";

const redirectRouter = Router();

redirectRouter.route("/:shortcode").get(redirect)

export default redirectRouter;