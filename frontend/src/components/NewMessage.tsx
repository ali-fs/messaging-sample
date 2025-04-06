import { memo, useActionState, useCallback } from "react";
import { socket } from "../services/Socket/SocketService";
import { ESocket } from "../@types";
import useGroup from "../context/useGroup";

// TODO: we can use useOptimistic to handle new message

const NewMessage: React.FC = () => {
  const { selectedGroup } = useGroup();

  const sendMessage = useCallback(
    async (prevData: unknown, formData: FormData) => {
      try {
        const text = formData.get("message") as string;
        if (!text) return;
        socket.emit(ESocket.NEW_MESSAGE, {
          text,
          groupId: selectedGroup?.id,
        });
      } catch (e) {
        return;
      }
    },
    [selectedGroup?.id]
  );

  const [state, formAction, isPending] = useActionState(sendMessage, undefined);

  return (
    <form action={formAction} className="mt-4 flex items-center">
      <input
        type="text"
        name="message"
        placeholder="Type a message..."
        className="flex-1 p-3 border border-gray-600 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={isPending}
        className="ml-2 bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition"
      >
        {isPending ? "..." : "Send"}
      </button>
    </form>
  );
};

export default memo(NewMessage);
