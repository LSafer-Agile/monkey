import express from 'express';
import cookieParser from 'cookie-parser'
import {router} from "./router";
import env from "./env";

export const app = express();

// views path
app.set('views', env.VIEWS_PATH)
// view engine name
app.set('view engine', 'pug')
// parsing cookies
app.use(cookieParser())
// main router
app.use('/', router)
