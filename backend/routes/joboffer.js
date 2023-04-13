const { Router } = require("express");

const jobOfferRouter = Router();
const {creatoffer,getoffer,updateOffer,updatestatus,deleteoffer,getofferByUser} = require("../controllers/joboffer");

jobOfferRouter.post("/:id",creatoffer)
jobOfferRouter.get("/:id",getoffer)//project id
jobOfferRouter.put("/:id", updateOffer)
jobOfferRouter.put("/status/:id", updatestatus)
jobOfferRouter.delete("/:id", deleteoffer)
jobOfferRouter.get("/user/:id",getofferByUser)

module.exports = jobOfferRouter;