import { memo } from "react";

const NewMessage: React.FC = () => {
  return (
    <form className="mt-4 flex items-center">
      <input
        type="text"
        name="message"
        placeholder="Type a message..."
        className="flex-1 p-3 border border-gray-600 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="ml-2 bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition"
      >
        Send
      </button>
    </form>
  );
};

export default memo(NewMessage);
