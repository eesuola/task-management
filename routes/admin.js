import express from "express";

const routes = express.Router();

import { getAllUsers, getAllTasks } from "../controller/admin.js";


routes.get("/auth", getAllUsers);
routes.get("/auth", getAllTasks);



export default routes;