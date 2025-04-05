import { Request, Response } from "express";
import { getUserByUsername } from "../services/user.service";
import jwt from "jsonwebtoken";

const PRIVATE_KEY = "PRIVATE_KEY"; // TODO: this must be in env

export const login = async function (req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = getUserByUsername(username);
    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }
    if (user.password !== password) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }
    const token = jwt.sign({ id: user.id }, PRIVATE_KEY, { expiresIn: "1h" });
    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
