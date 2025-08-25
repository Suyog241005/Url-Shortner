import { Router } from "express";
import { deleteUrls, urls } from "../controllers/urls.controller";

const urlsRouter = Router();

urlsRouter.delete("/:id", deleteUrls);
urlsRouter.get("/:userId", urls);

export default urlsRouter