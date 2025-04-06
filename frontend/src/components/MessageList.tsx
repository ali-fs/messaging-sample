import { memo, useEffect, useMemo, useState } from "react";
import { getGroupMessages } from "../services/RestAPI/RestAPIList";
import useGroup from "../context/useGroup";
import { getFromStorage } from "../services/storage/Storage";
import useLazyRequest from "../hooks/useLazyRequest";
import Message from "./Message";
import { ESocket, TMessage } from "../@types";
import { socket } from "../services/Socket/SocketService";

// TODO: We can add caching for group messages instead of loading on every group change
// TODO: We can separate initial message loading in a custom hook for better structure

const MessageList: React.FC = () => {
  const { selectedGroup } = useGroup();
  const { loading, call } = useLazyRequest(getGroupMessages);
  const [messageList, setMessageList] = useState<TMessage[]>([]);

  const userId = useMemo(() => getFromStorage("user")?.id, []);

  useEffect(() => {
    if (selectedGroup?.id) call(selectedGroup.id).then(setMessageList);
  }, [call, selectedGroup?.id]);

  useEffect(() => {
    socket.on(ESocket.SEND_MESSAGE, (newMessage: TMessage) => {
      console.log("new message received", newMessage);
      setMessageList((prev) => [...prev, newMessage]);
    });
  }, []);

  return (
    <div className="flex-1 bg-gray-700 p-4 rounded-lg overflow-y-auto">
      {loading && <span>Loading...</span>}
      {messageList.map((message) => {
        return (
          <Message
            key={message.id}
            text={message.text}
            isMyMessage={userId === message.userId}
          />
        );
      })}
    </div>
  );
};

export default memo(MessageList);
