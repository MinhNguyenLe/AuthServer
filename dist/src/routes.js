"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("src/controllers/auth");
const auth_2 = require("src/middleware/auth");
const validations_1 = require("src/middleware/validations");
const validators_1 = require("src/validators");
exports.router = (0, express_1.Router)();
exports.router.get("/get-accounts", auth_1.getAccounts);
exports.router.get("/protected", auth_2.userAuth, auth_1.protectedAuth);
exports.router.post(
  "/register",
  validators_1.registerValidation,
  validations_1.validationMiddleware,
  auth_1.register
);
exports.router.post(
  "/login",
  validators_1.loginValidation,
  validations_1.validationMiddleware,
  auth_1.login
);
exports.router.get("/logout", auth_1.logout);
