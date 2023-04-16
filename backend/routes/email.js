const express = require('express')
const {creatEmail} = require("../controllers/email")
const emailRouter=express.Router();


emailRouter.post("/", creatEmail);




module.exports = emailRouter;