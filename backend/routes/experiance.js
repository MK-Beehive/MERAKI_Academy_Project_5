const express = require('express')
const {getExperiance} = require("../controllers/experiance")
const experianceRouter=express.Router();

// experianceRouter.post("/", createMajors);
experianceRouter.get("/", getExperiance);




module.exports = experianceRouter;