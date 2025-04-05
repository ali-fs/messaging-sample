import React, { useState, PropsWithChildren, useMemo } from "react";
import { TGroup } from "../@types";
import GroupContext from "./group.context";

export const GroupProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selectedGroup, setSelectedGroup] = useState<TGroup | null>(null);

  const value = useMemo(() => {
    return { selectedGroup, setSelectedGroup };
  }, [selectedGroup, setSelectedGroup]);
  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};
