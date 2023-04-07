
 const { Router } = require("express");

 const projectsRouter = Router();


const {  addproject,  getAllprojects,  getallProjectsforUser,  getprojectsByStatus,
    getproject,UpdateProject,  UpdateProjectStatus,deleteproject } = require("../controllers/projects");

 
  projectsRouter.post("/", addproject);
  projectsRouter.get("/", getAllprojects);
  projectsRouter.get("/:user_id", getallProjectsforUser);
  projectsRouter.get("/status/:status_id", getprojectsByStatus);
  projectsRouter.get("/project/:project_id", getproject);
   projectsRouter.put("/:project_id", UpdateProject);
   projectsRouter.put("/status/:project_id", UpdateProjectStatus);
  projectsRouter.delete("/:project_id", deleteproject);



 module.exports = projectsRouter;
