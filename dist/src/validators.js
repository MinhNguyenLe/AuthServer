"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const db_1 = require("src/db");
const bcryptjs_1 = require("bcryptjs");
const express_validator_1 = require("express-validator");
//password
const password = (0, express_validator_1.check)("password")
  .isLength({ min: 6, max: 15 })
  .withMessage("Password has to be between 6 and 15 characters.");
//email
const email = (0, express_validator_1.check)("email")
  .isEmail()
  .withMessage("Please provide a valid email.");
//check if email exists
const emailExists = (0, express_validator_1.check)("email").custom((value) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield db_1.pool.query(
      "SELECT * from account WHERE email = $1",
      [value]
    );
    if (rows.length) {
      throw new Error("Email already exists.");
    }
  })
);
//login validation
const loginFieldsCheck = (0, express_validator_1.check)("email").custom(
  (value, { req }) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const user = yield db_1.pool.query(
        "SELECT * from ACCOUNT WHERE email = $1",
        [req.body.account.email]
      );
      if (!user.rows.length) {
        throw new Error("Email does not exists.");
      }
      const validPassword = yield (0, bcryptjs_1.compare)(
        req.body.account.password,
        user.rows[0].password
      );
      if (!validPassword) {
        throw new Error("Wrong password");
      }
      req.user = user.rows[0];
    })
);
exports.registerValidation = [email, password, emailExists];
exports.loginValidation = [loginFieldsCheck];
