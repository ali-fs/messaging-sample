import { memo } from "react";
import useGroup from "../context/useGroup";

const GroupHeader: React.FC = () => {
  const { selectedGroup } = useGroup();

  return (
    <div className="bg-gray-700 p-3 rounded-lg mb-4">
      <h2 className="text-lg font-semibold">{selectedGroup?.name}</h2>
    </div>
  );
};

export default memo(GroupHeader);
