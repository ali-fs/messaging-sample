import { memo } from "react";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";
import GroupHeader from "./GroupHeader";

const ChatSection: React.FC = () => {
  return (
    <div className="flex flex-col w-full md:w-2/3 p-4">
      <GroupHeader />
      <MessageList />
      <NewMessage />
    </div>
  );
};

export default memo(ChatSection);
