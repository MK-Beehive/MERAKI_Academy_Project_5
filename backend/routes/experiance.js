const express = require('express')
const {getExperiance,getExperianceForUser} = require("../controllers/experiance")
const experianceRouter=express.Router();

// experianceRouter.post("/", createMajors);
experianceRouter.get("/", getExperiance);
experianceRouter.get("/exp/:uid", getExperianceForUser);




module.exports = experianceRouter;