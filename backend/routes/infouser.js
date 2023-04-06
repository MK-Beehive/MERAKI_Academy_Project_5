const { Router } = require("express");

const infouserRouter = Router();
const {addinfoUser,updateInfo} = require("../controllers/infouser");
infouserRouter.post("/", addinfoUser);
infouserRouter.put("/",updateInfo)


module.exports = infouserRouter;