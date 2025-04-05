import { TGroup, TUser, TUserGroup } from "../@types";
import { getGroupByIdList } from "./group.service";
import { getUserByIdList } from "./user.service";

// TODO: must be in database
const userGroup: TUserGroup[] = [
  { userId: "1", groupId: "1" },
  { userId: "1", groupId: "2" },

  { userId: "2", groupId: "1" },

  { userId: "3", groupId: "2" },
];

const getUsersOfGroup = (groupId: string): TUser[] => {
  const userIdList = userGroup
    .filter((relation) => relation.groupId === groupId)
    .map((relation) => relation.userId);
  return getUserByIdList(userIdList);
};

const getGroupsOfUser = (userId: string): TGroup[] => {
  const groupIdList = userGroup
    .filter((relation) => relation.userId === userId)
    .map((relation) => relation.groupId);
  return getGroupByIdList(groupIdList);
};

export { getUsersOfGroup, getGroupsOfUser };
