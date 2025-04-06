import { Server } from "socket.io";
import { ESocket, TCustomSocket } from "../@types";
import { saveMessage } from "../services/messages.service";

type TNewMessage = { text: string; groupId: string };

export const handleMessages = (io: Server) => {
  io.on(ESocket.CONNECTION, (socket: TCustomSocket) => {
    console.log(`User ${socket.id} connected. userId: ${socket.user?.id}`);

    socket.on(ESocket.NEW_MESSAGE, (data: TNewMessage) => {
      console.log("Message received:", data);
      const newMessage = saveMessage({ ...data, userId: socket.user!.id });
      // broadcast to group
      io.sockets.in(data.groupId).emit(ESocket.SEND_MESSAGE, newMessage);
    });

    socket.on(ESocket.DISCONNECT, () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });
};
