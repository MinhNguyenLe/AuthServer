"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const path_1 = __importDefault(require("path"));
const webpack_node_externals_1 = __importDefault(require("webpack-node-externals"));
module.exports = {
    entry: ["webpack/hot/poll?100", "./src/endtrypoint.ts"],
    watch: true,
    target: "node",
    externals: [
        (0, webpack_node_externals_1.default)({
        // whitelist: ["webpack/hot/poll?100"]
        }),
    ],
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    mode: "development",
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [new webpack_1.default.HotModuleReplacementPlugin()],
    output: {
        path: path_1.default.join(__dirname, "dist"),
        filename: "endtrypoint.js",
    },
};
