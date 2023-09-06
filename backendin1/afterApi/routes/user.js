import express from "express";
import { 
    getAllUserData,
    addNewUser,
    getUserById,
    updateUserById,
    deleteUserById,
    } from "../controllers/user.js";

const router = express.Router();

router.get("/data", getAllUserData);

router.post("/new", addNewUser);

router
.route("/userid/:id")
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById);

// router.get("/userid/:id", getUserById);

// router.put("/userid/:id", updateUserById);

// router.delete("/userid/:id", deleteUserById);

export default router;