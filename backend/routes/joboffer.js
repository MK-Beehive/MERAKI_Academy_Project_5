const { Router } = require("express");

const jobOfferRouter = Router();
const {creatoffer,getoffer,updateOffer,updatestatus,deleteoffer} = require("../controllers/joboffer");

jobOfferRouter.post("/:id",creatoffer)
jobOfferRouter.get("/:id",getoffer)
jobOfferRouter.put("/:id", updateOffer)
jobOfferRouter.put("/status/:id", updatestatus)
jobOfferRouter.delete("/:id", deleteoffer)

module.exports = jobOfferRouter;