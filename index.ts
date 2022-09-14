import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from "cors";

import './middleware/passport'
import {router} from './routes'

dotenv.config();
const app: Express = express()

const PORT:string = process.env.PORT || '5678';

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: process.env.CLIENT_URL || `http://localhost:${PORT}`, credentials: true }))
app.use(passport.initialize())

app.use('/api', router)

//app start
const appStart = () => {
  app.listen(PORT, () => {
    console.log(`The app is running at http://localhost:${PORT}`)
  })
}

appStart()
