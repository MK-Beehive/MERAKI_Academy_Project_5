const { Router } = require("express");

const jobOfferRouter = Router();
const {creatoffer,getoffer,updateOffer,updatestatus} = require("../controllers/joboffer");

jobOfferRouter.post("/:id",creatoffer)
jobOfferRouter.get("/:id",getoffer)
jobOfferRouter.put("/:id", updateOffer)
jobOfferRouter.put("/status/:id", updatestatus)

module.exports = jobOfferRouter;