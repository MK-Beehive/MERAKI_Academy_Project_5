const { Router } = require("express");

const jobOfferRouter = Router();
const {creatoffer} = require("../controllers/joboffer");

jobOfferRouter.post("/",creatoffer)
module.exports = jobOfferRouter;