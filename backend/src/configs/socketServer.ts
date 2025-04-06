import { Server } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";
import { ESocket, TCustomSocket } from "../@types";
import { getUserById } from "../services/user.service";
import { getGroupsOfUser } from "../services/userGroup.service";

const PRIVATE_KEY = "PRIVATE_KEY"; // TODO: this must be in env

// TODO: handle auth error in a better and more clear way

const initSocketServer = (server: http.Server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.use(async (socket: TCustomSocket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, PRIVATE_KEY) as { id: string };
      const user = getUserById(decoded.id);
      if (!user) {
        socket.disconnect();
        throw new Error("User not found");
      }
      socket.user = user;
      // join to groups
      getGroupsOfUser(user.id).map((group) => socket.join(group.id));
      next();
    } catch (error) {
      console.error("Authentication error", error);
      next(new Error("Authentication error"));
    }
  });

  return io;
};

export default initSocketServer;
