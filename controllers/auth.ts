import { pool } from "../db";

import { sign } from "jsonwebtoken";
import { hash } from "bcryptjs";
import { Request, Response } from "express";

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(
      "select account_id, email, created_at, updated_at from account"
    );

    return res.status(200).json({
      success: true,
      account: rows,
    });
  } catch (error) {
    console.log(error);
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hash(password, 10);

    await pool.query("insert into account(email,password) values ($1 , $2)", [
      email,
      hashedPassword,
    ]);

    return res.status(201).json({
      success: true,
      message: "Register successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
};
export const login = async (req: Request, res: Response) => {
  const account = req.body;
  const payload = {
    // id: account.account_id,
    email: account.email,
  };

  try {
    const token = await sign(payload, process.env.SECRET || "secret");

    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
};

export const protectedAuth = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      info: "protected info",
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
};
