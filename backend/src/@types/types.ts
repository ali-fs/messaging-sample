export type TUser = {
  id: string;
  name: string;
  username: string;
  password: string;
};

export type TGroup = {
  id: string;
  name: string;
};

export type TUserGroup = {
  userId: string;
  groupId: string;
};

export type TMessage = {
  id: string;
  userId: string;
  groupId: string;
  text: string;
  createdAt: number;
};
