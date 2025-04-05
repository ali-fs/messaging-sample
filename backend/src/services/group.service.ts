import { TGroup, TUser } from "../@types";

// TODO: must be in database
const groups: TGroup[] = [
  { id: "1", name: "group1" },
  { id: "2", name: "group2" },
];

const getGroups = () => groups;

const getGroupById = (id: string) => groups.find((group) => group.id === id);

const getGroupByIdList = (idList: string[]) =>
  groups.filter((group) => idList.includes(group.id));

export { getGroups, getGroupById, getGroupByIdList };
