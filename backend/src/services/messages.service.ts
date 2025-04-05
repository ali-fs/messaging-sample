import { TMessage } from "../@types";

// TODO: must be in database
// TODO: text could be encrypted
const messages: TMessage[] = [
  { id: "0", userId: "1", groupId: "1", text: "Hello", createdAt: Date.now() },
];

const getMessagesOfGroup = (groupId: string) =>
  messages.filter((m) => m.groupId === groupId);

const saveMessage = (message: Omit<TMessage, "id" | "createdAt">): TMessage => {
  const newMessage = {
    ...message,
    id: messages.length.toString(),
    createdAt: Date.now(),
  };
  messages.push(newMessage);
  return newMessage;
};

export { getMessagesOfGroup, saveMessage };
