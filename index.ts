import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import pool from "./db"

dotenv.config();

const app: Express = express();

app.use(cors())
app.use(express.json())

const port:string = process.env.PORT || '5678';

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post("/todos",async(req:Request,res:Response)=>{
  try{
    const { description } = req.body;
    console.log(req.body)
    
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1)",[description]);

    res.json(newTodo)

  }catch(err){
    console.log("----",err)
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});