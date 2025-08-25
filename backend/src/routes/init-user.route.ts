import { Router } from "express";
import { initUser } from "../controllers/init-user.controller";

const initUserRouter = Router();

initUserRouter.route("/").post(initUser)

export default initUserRouter;