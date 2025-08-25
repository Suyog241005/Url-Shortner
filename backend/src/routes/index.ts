import { Router } from "express";
import initUserRouter from "./init-user.route";
import shortenRouter from "./shorten.route";
import redirectRouter from "./redirect.route";
import currentUserRouter from "./current-user.route";
import urlsRouter from "./urls.route";

const rootRouter = Router();

rootRouter.use("/init-user", initUserRouter);
rootRouter.use("/shorten", shortenRouter);
rootRouter.use("/current-user", currentUserRouter);
rootRouter.use("/urls", urlsRouter);

export default rootRouter;
