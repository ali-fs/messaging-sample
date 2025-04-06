import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import Router from "./routes/routes";
import initSocketServer from "./configs/socketServer";
import { handleMessages } from "./controllers/messaging.controller";

const app = express();
app.use(bodyParser.json());
app.use(cors());
const server = http.createServer(app);
const port = 3000;

app.use(Router);

const socketInstance = initSocketServer(server);
handleMessages(socketInstance);

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
