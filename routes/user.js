import express from "express";

const routes = express.Router();

import { registration, login } from "../controller/user.js";

routes.post("/register", registration);
routes.post("/login", login);

export default routes;
