import { memo, useEffect, useMemo } from "react";
import { getGroupMessages } from "../services/RestAPI/RestAPIList";
import useGroup from "../context/useGroup";
import { getFromStorage } from "../services/storage/Storage";
import useLazyRequest from "../hooks/useLazyRequest";
import Message from "./Message";

const MessageList: React.FC = () => {
  const { selectedGroup } = useGroup();
  const { loading, result, call } = useLazyRequest(getGroupMessages);

  const userId = useMemo(() => getFromStorage("user")?.id, []);

  useEffect(() => {
    if (selectedGroup?.id) call(selectedGroup.id);
  }, [call, selectedGroup?.id]);

  return (
    <div className="flex-1 bg-gray-700 p-4 rounded-lg overflow-y-auto">
      {loading && <span>Loading...</span>}
      {result?.map((message) => {
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
