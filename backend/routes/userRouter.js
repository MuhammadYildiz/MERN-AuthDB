const express = require("express")
const {userRegister,getUsers,userLogin} = require("../controllers/userControl")
const userRouter = express.Router();
userRouter.post("/register", userRegister)
userRouter.get("/register", getUsers)
userRouter.post("/login",userLogin)
module.exports = userRouter