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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const db_1 = require("../db");
const cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies)
        token = req.cookies["token"];
    return token;
};
const opts = {
    secretOrKey: process.env.SECRET || "abc",
    jwtFromRequest: cookieExtractor,
};
passport_1.default.use(new passport_jwt_1.Strategy(opts, ({ id }, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield db_1.pool.query("SELECT account_id, email FROM account WHERE account_id = $1", [id]);
        if (!rows.length) {
            throw new Error("401 not authorized");
        }
        const user = { id: rows[0].account_id, email: rows[0].email };
        return yield done(null, user);
    }
    catch (error) {
        console.log(error);
        done(null, false);
    }
})));
