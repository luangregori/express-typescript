"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./config/database"));
const PORT = process.env.PORT || 3333;
const app = express_1.default();
app.use(express_1.default.json());
app.use(routes_1.default);
typeorm_1.createConnection(database_1.default).then(_connection => {
    // console.log(_connection)
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
}).catch(err => {
    console.log("Unable to connect to db", err);
    process.exit(1);
});
