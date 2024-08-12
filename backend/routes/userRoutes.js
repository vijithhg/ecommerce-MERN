import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
const UserRoute = express.Router();



// Root path
UserRoute.post('/register', registerUser);
UserRoute.post('/login',loginUser)



export default UserRoute
