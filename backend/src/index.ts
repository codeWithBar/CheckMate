import express from "express";
import http from "http";
import "dotenv/config";
import mongoose from "mongoose";
import { logger } from "./loggers/logger";

const app = express();
const server = http.createServer(app);
mongoose
  .connect(process.env.DB_URI!)
  .then(() => logger.info(`Connected to ${process.env.DB_URI}`));

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT ?? 5000;
server.listen(port, () => {
  console.log("Server started on http://localhost:" + port);
});
