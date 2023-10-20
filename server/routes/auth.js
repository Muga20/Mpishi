import express from "express";
import { logInMembers } from "../auth/login.js";
import { register } from "../auth/register.js";
import { forgotPassword, resetPassword } from "../auth/resetPassword.js";


const AuthRoutes = express.Router();


AuthRoutes.post("/register", register);
AuthRoutes.post("/login", logInMembers);
AuthRoutes.post("/forgotpassword", forgotPassword);
AuthRoutes.patch("/reset/:id", resetPassword);


export default AuthRoutes;
