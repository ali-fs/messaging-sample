import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  getGroupsOfUser,
  getUsersOfGroup,
} from "../services/userGroup.service";
import { getMessagesOfGroup } from "../services/messages.service";

const PRIVATE_KEY = "PRIVATE_KEY"; // TODO: this must be in env
// TODO: authentication should be in a middleware

export const getGroups = async function (req: Request, res: Response) {
  try {
    const token = req.header("Authorization");
    if (!token) {
      res.status(401).json({ error: "Access denied" });
      return;
    }
    // TODO: check if jwt verify failed and return 401
    const decoded = jwt.verify(token, PRIVATE_KEY) as { id: string };
    const id = decoded.id;
    const groups = getGroupsOfUser(id);
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getGroupMessages = async function (req: Request, res: Response) {
  try {
    const token = req.header("Authorization");
    if (!token) {
      res.status(401).json({ error: "Access denied" });
      return;
    }
    // TODO: check if jwt verify failed and return 401
    const decoded = jwt.verify(token, PRIVATE_KEY) as { id: string };
    const userId = decoded.id;
    const groupId = req.params.id;
    const usersOfGroup = getUsersOfGroup(groupId);
    if (usersOfGroup.findIndex((user) => user.id === userId) === -1) {
      res.status(403).json({ error: "Unauthorized access" });
      return;
    }
    const messages = getMessagesOfGroup(groupId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
