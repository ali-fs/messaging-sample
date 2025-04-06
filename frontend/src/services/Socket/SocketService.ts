import { ESocket } from "../../@types/enums";
import { io } from "socket.io-client";
import { getFromStorage } from "../storage/Storage";

const URL = "http://localhost:3000";

export const socket = io(URL, {
  auth: {
    token: getFromStorage("token", ""),
  },
});

socket.on(ESocket.CONNECTION, () => console.log("Socket connected"));
socket.on(ESocket.DISCONNECT, () => console.log("Socket disconnected"));
