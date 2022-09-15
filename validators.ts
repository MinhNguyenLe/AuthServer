import { pool } from "./db";
import { compare } from "bcryptjs";
import { check } from "express-validator";

//password
const password = check("password")
  .isLength({ min: 6, max: 15 })
  .withMessage("Password has to be between 6 and 15 characters.");

//email
const email = check("email")
  .isEmail()
  .withMessage("Please provide a valid email.");

//check if email exists
const emailExists = check("email").custom(async (value) => {
  const { rows } = await pool.query("SELECT * from account WHERE email = $1", [
    value,
  ]);

  if (rows.length) {
    throw new Error("Email already exists.");
  }
});

//login validation
const loginFieldsCheck = check("email").custom(async (value, { req }) => {
  const user = await pool.query("SELECT * from ACCOUNT WHERE email = $1", [
    req.body.account.email,
  ]);

  if (!user.rows.length) {
    throw new Error("Email does not exists.");
  }

  const validPassword = await compare(
    req.body.account.password,
    user.rows[0].password
  );

  if (!validPassword) {
    throw new Error("Wrong password");
  }

  req.user = user.rows[0];
});

export const registerValidation = [email, password, emailExists];
export const loginValidation = [loginFieldsCheck];
