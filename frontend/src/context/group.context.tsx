import { createContext } from "react";
import { TGroup } from "../@types";

type TGroupContext = {
  selectedGroup: TGroup | null;
  setSelectedGroup: (group: TGroup) => void;
};

const GroupContext = createContext<TGroupContext | undefined>(undefined);

export default GroupContext;
