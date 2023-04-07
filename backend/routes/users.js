const express = require('express')
const {register,login,getAllUsers,deleteUserById,updateUserById} = require("../controllers/users")
const userRouter=express.Router();

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/",getAllUsers)
userRouter.delete("/:id", deleteUserById)
userRouter.put("/:id", updateUserById);

module.exports = userRouter;