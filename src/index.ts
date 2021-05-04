import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Application } from "express";

import Router from "./routes";
import dbConfig from './config/database'

const PORT = process.env.PORT || 3333;

const app: Application = express();

app.use(express.json());

app.use(Router);

createConnection(dbConfig).then(_connection => {
  // console.log(_connection)
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
}).catch(err => {
  console.log("Unable to connect to db", err);
  process.exit(1)
})

