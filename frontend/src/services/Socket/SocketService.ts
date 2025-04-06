import { ESocket } from "../../@types/enums";
import { io } from "socket.io-client";
import { getFromStorage } from "../storage/Storage";

const URL = "http://localhost:3000";

const token = getFromStorage("token", "");

export const socket = io(URL, {
  autoConnect: token !== "",
  auth: { token },
});

socket.on(ESocket.CONNECTION, () => console.log("Socket connected"));
socket.on(ESocket.DISCONNECT, () => console.log("Socket disconnected"));
