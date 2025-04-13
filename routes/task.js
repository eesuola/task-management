import express from "express";

const routes = express.Router();

import { createTask, } from "../controller/task.js";


routes.post("/create", createTask);


export default routes;