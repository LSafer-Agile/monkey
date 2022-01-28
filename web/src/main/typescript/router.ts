import {Router} from "express";
import {IndexRouter} from "./routes/IndexRouter";
import {StaticRouter} from "./routes/StaticRouter";

export const router = Router()

router.use('/', IndexRouter)
router.use('/', StaticRouter)
