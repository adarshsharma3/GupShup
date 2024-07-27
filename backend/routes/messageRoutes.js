import express from "express";
const Router= express.Router();
import protectedRoute from "../middleware/protectedRoute.js";
import {sendMessage} from "../controllers/messageController.js"
import { getMessage } from "../controllers/messageController.js";
Router.get("/:id",protectedRoute,getMessage);
Router.post("/send/:id",protectedRoute,sendMessage);

export default Router;
