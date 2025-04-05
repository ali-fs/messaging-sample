import { memo } from "react";
import clsx from "clsx";
import useRequest from "../hooks/useRequest";
import { getGroupList } from "../services/RestAPI/RestAPIList";
import useGroup from "../context/useGroup";

const GroupContainer: React.FC = () => {
  const { loading, result } = useRequest(getGroupList);
  const { setSelectedGroup, selectedGroup } = useGroup();

  return (
    <div className="w-full md:w-1/3 bg-gray-700 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Groups</h2>

      {loading && <span>Loading...</span>}

      {result?.map((group) => {
        const isSelected = group.id === selectedGroup?.id;
        return (
          <div
            key={group.id}
            onClick={() => setSelectedGroup(group)}
            className={clsx(
              "p-3 bg-gray-600 rounded-lg mb-2 cursor-pointer hover:bg-gray-500",
              isSelected && "!bg-blue-500"
            )}
          >
            {group.name}
          </div>
        );
      })}
    </div>
  );
};

export default memo(GroupContainer);
