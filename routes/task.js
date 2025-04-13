import express from "express";

const routes = express.Router();

import { createTask, updateTask, deleteTask } from "../controller/task.js";


routes.post("/create", createTask);
routes.put("/update", updateTask);
routes.delete("/delete", deleteTask);


export default routes;