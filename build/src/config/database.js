"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const config = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgresmarketless",
    database: process.env.POSTGRES_DB || "marketless",
    entities: [models_1.User, models_1.Category, models_1.Product],
    synchronize: true,
};
exports.default = config;
