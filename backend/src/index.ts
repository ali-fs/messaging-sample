import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(cors());
const server = http.createServer(app);
const port = 3000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
