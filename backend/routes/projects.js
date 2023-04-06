 const { Router } = require("express");

 const projectsRouter = Router();


const {  addproject,  getAllprojects,  getallProjectsforUser,  getprojectsByStatus,
} = require("../controllers/projects");

// getproject,  UpdateProject,  UpdateProjectStatus,deleteproject
  projectsRouter.post("/", addproject);
  projectsRouter.get("/", getAllprojects);
  projectsRouter.get("/:user_id", getallProjectsforUser);
  projectsRouter.get("/status/:status_id", getprojectsByStatus);
//   projectsRouter.get("/:project_id", getproject);
//   projectsRouter.put("/:project_id", UpdateProject);
//   projectsRouter.put("/:project_id/status", UpdateProjectStatus);
//   projectsRouter.delete("/:project_id", deleteproject);



 module.exports = projectsRouter;
