import express from 'express';
import protectedRoute from '../middleware/protectedRoute.js';
import { getUserSidebar } from '../controllers/userController.js';
const router=express.Router();

router.get("/",protectedRoute,getUserSidebar);

export default router;
