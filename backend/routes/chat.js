const express = require('express')
const {postmessage,getmessage} = require("../controllers/chat")
const chatRouter=express.Router();


chatRouter.post("/", postmessage);
chatRouter.get("/:roomId",getmessage)




module.exports = chatRouter;