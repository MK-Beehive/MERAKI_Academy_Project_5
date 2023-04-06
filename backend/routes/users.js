const express = require('express')
const {register,login,getAllUsers,deleteUserById} = require("../controllers/users")
const userRouter=express.Router();

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/",getAllUsers)
userRouter.delete("/:id", deleteUserById)

module.exports = userRouter;