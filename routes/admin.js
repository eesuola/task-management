import express from "express";

const routes = express.Router();

import { getUsers, getAllTasks } from "../controller/admin.js";


routes.get("/users", getUsers);
routes.get("/tasks", getAllTasks);



export default routes;