import express from "express";

const routes = express.Router();

import upload from '../middleware/profilePicture.js'

import { registration, login, uploadProfilePic } from "../controller/user.js";

routes.post("/register", registration);
routes.post("/login", login);
routes.patch('/uploadProfilePicture', upload.single('photo'), uploadProfilePic);

export default routes;
