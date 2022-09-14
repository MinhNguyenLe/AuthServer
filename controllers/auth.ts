import {pool} from "../db"

import {sign} from "jsonwebtoken"
import {hash} from "bcryptjs"
import {  Request, Response } from 'express';

export const getUsers = async (req:Request, res:Response) => {
  try {
    const { rows } = await pool.query('select account_id, email from account')

    return res.status(200).json({
      success: true,
      account: rows,
    })
  } catch (error:any) {
    console.log(error.message)
  }
}

export const register = async(req:Request, res:Response) => {
  const { email, password } = req.body
  try {
    const hashedPassword = await hash(password, 10)

    await pool.query('insert into account(email,password) values ($1 , $2)', [
      email,
      hashedPassword,
    ])

    return res.status(201).json({
      success: true,
      message: 'The registraion was succefull',
    })
  } catch (error:any) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}
export const login = async(req:Request, res:Response) => {
  let user = req.body.user

  let payload = {
    id: user.user_id,
    email: user.email,
  }

  try {
    const token = await sign(payload, process.env.SECRET || "secret")

    return res.status(200).cookie('token', token, { httpOnly: true }).json({
      success: true,
      message: 'Logged in succefully',
    })
  } catch (error:any) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

export const protectedAuth = async(req:Request, res:Response) => {
  try {
    return res.status(200).json({
      info: 'protected info',
    })
  } catch (error:any) {
    console.log(error.message)
  }
}

export const logout =  async(req:Request, res:Response) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out succefully',
    })
  } catch (error:any) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}