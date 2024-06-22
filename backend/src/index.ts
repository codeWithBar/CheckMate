import express from "express";
import http from "http";
import "dotenv/config";

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT ?? 5000;
server.listen(port, () => {
  console.log("Server started on http://localhost:" + port);
});
