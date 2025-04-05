import { memo } from "react";
import clsx from "clsx";
import { TMessage } from "../@types";

type TProps = Pick<TMessage, "text"> & { isMyMessage: boolean };

const Message: React.FC<TProps> = ({ text, isMyMessage }) => {
  return (
    <div className={clsx("mb-4", isMyMessage && "text-right")}>
      <p
        className={clsx(
          "bg-gray-600 p-3 rounded-lg inline-block",
          isMyMessage && "!bg-blue-600"
        )}
      >
        {text}
      </p>
    </div>
  );
};

export default memo(Message);
