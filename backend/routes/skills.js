const express = require('express')
const {createSkills,getAllSkills,getAllSkillsForUser,addSkillForUser} = require("../controllers/skills")
const skillsRouter=express.Router();

skillsRouter.post("/", createSkills);
skillsRouter.get("/", getAllSkills);
skillsRouter.post("/user", addSkillForUser); 
skillsRouter.get("/:userId", getAllSkillsForUser)



module.exports = skillsRouter;