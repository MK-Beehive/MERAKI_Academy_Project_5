const express = require('express')
const {register,login,getAllUsers,deleteUserById,
    updateUserById,getallFreelancers,tokenjwt,members,getuserbyrole,postnotification,getnotieficationBYuserId,getOneUserByID} = require("../controllers/users")
const userRouter=express.Router();

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/",getAllUsers)
userRouter.delete("/:id", deleteUserById)
userRouter.put("/:id", updateUserById);
//==ebethal==
userRouter.get("/:role_id", getuserbyrole)
userRouter.post("/notifcation/:id", postnotification)
userRouter.get("/notifcation/:id", getnotieficationBYuserId)

//==sahar======
userRouter.post("/freelancers",getallFreelancers)
userRouter.post("/tokenjwt",tokenjwt)
userRouter.post("/members",members)
userRouter.get("/user/:id",getOneUserByID)

//=============
module.exports = userRouter;