"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.protectedAuth = exports.login = exports.register = exports.getAccounts = void 0;
const db_1 = require("../db");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcryptjs_1 = require("bcryptjs");
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield db_1.pool.query("select account_id, email, created_at, updated_at from account");
        return res.status(200).json({
            success: true,
            account: rows,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAccounts = getAccounts;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
        yield db_1.pool.query("insert into account(email,password) values ($1 , $2)", [
            email,
            hashedPassword,
        ]);
        return res.status(201).json({
            success: true,
            message: "Register successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = req.body;
    const payload = {
        // id: account.account_id,
        email: account.email,
    };
    try {
        const token = yield (0, jsonwebtoken_1.sign)(payload, process.env.SECRET || "secret");
        return res.status(200).cookie("token", token, { httpOnly: true }).json({
            success: true,
            message: "Logged in successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
        });
    }
});
exports.login = login;
const protectedAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json({
            info: "protected info",
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.protectedAuth = protectedAuth;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).clearCookie("token", { httpOnly: true }).json({
            success: true,
            message: "Logged out successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
        });
    }
});
exports.logout = logout;
