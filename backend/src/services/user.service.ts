import { TUser } from "../@types";

// TODO: must be in database
// TODO: password must be encrypted
const users: TUser[] = [
  { id: "1", name: "user1", username: "user1", password: "user1" },
  { id: "2", name: "user2", username: "user2", password: "user2" },
  { id: "3", name: "user3", username: "user3", password: "user3" },
];

const getUsers = () => users;

const getUserById = (id: string) => users.find((user) => user.id === id);

const getUserByUsername = (username: string) =>
  users.find((user) => user.username === username);

const getUserByIdList = (idList: string[]) =>
  users.filter((user) => idList.includes(user.id));

const addUser = (user: Omit<TUser, "id">) => {
  // TODO: add new user
};

const removeUser = (id: string) => {
  // TODO: set user to isDeleted
};

export {
  getUsers,
  getUserById,
  addUser,
  removeUser,
  getUserByIdList,
  getUserByUsername,
};
