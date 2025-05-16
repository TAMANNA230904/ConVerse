import express from 'express'
import { signup,logout,login, updateProfile,checkAuth } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';    
const router=express.Router();

router.post("/signup",signup)

router.post("/login",login);

router.post("/logout",logout);

//middleware protectRoute is to check that only logged in users are allowed to update profile
router.put("/update-profile",protectRoute,updateProfile)

//check if user is authenticated
router.get("/check",protectRoute,checkAuth)

export default router;