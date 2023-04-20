const express = require('express')
const {createSkills,getAllSkills,getAllSkillsForUser,addSkillForUser,softDeleteSkillForUser} = require("../controllers/skills")
const skillsRouter=express.Router();

skillsRouter.post("/", createSkills);
skillsRouter.get("/", getAllSkills);
skillsRouter.post("/:userId", addSkillForUser); 
skillsRouter.get("/:userId", getAllSkillsForUser)
skillsRouter.put("/:userId",softDeleteSkillForUser)



module.exports = skillsRouter;