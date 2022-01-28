import express, {Router} from "express";
import env from "../env";

export const StaticRouter = Router()

StaticRouter.use('/public/javascript', express.static(env.CLIENT_JAVASCRIPT_PATH))
StaticRouter.use('/public/css', express.static(env.CLIENT_CSS_PATH))
StaticRouter.use('/', express.static(env.CLIENT_BUNDLE_PATH))
