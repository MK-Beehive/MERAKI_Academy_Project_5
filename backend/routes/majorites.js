const express = require('express')
const {createMajors, getMajors} = require("../controllers/majorites")
const majoritesRouter=express.Router();

majoritesRouter.post("/", createMajors);
majoritesRouter.get("/", getMajors);




module.exports = majoritesRouter;