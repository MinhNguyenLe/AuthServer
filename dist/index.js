"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
require("./middlewares/passport");
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || '5678';
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL || `http://localhost:${PORT}`, credentials: true }));
app.use(passport_1.default.initialize());
app.use('/api', routes_1.router);
//app start
const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`The app is running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
    }
};
appStart();
app.get('/', (req, res) => {
    console.log("?");
    res.send('Server running successful !');
});
