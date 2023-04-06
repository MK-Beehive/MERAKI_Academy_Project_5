const { Router } = require("express");

const infouserRouter = Router();
const {addinfoUser,updateInfo,getinfoUser} = require("../controllers/infouser");
infouserRouter.post("/:id", addinfoUser);
infouserRouter.put("/:id",updateInfo)
infouserRouter.get("/:id",getinfoUser)

module.exports = infouserRouter;