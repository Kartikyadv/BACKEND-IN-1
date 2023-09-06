import express from "express";
import {isAuthenticated} from "../middlewares/auth.js";
import { 
    getAllUserData,
    register,
    getMyProfile,
    login,
    logout,
    } from "../controllers/user.js";

const router = express.Router();

router.get("/data", getAllUserData);
router.post("/new", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getMyProfile);
router.get("/logout", logout);


export default router;