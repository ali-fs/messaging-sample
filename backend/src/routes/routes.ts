import express from "express";
import { login } from "../controllers/auth.controller";
import { getGroupMessages, getGroups } from "../controllers/group.controller";

const Router = express.Router();

// TODO: better to create different router files for auth, user, ...
// TODO: needs an authentication middleware

// test route
Router.get("/", async (_, res) => {
  res.json({ message: "Server is ready" });
});

Router.post("/login", login);

Router.get("/groups", getGroups);
Router.get("/groups/:id", getGroupMessages);

export default Router;
