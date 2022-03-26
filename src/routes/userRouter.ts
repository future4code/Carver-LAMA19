import express from "express";
import UserBusiness from "../business/UserBusiness";
import UserController from "../controller/UserController";
import UserDatabase from "../data/UserDatabase";


export const userRouter = express.Router();

const userController = new UserController();

console.log("router")

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);