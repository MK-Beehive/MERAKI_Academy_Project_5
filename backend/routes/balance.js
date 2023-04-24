const express = require('express')
const {getAllBalances,getBalanceForUser} = require("../controllers/balance")
const balanceRouter=express.Router();

// experianceRouter.post("/", createMajors);
balanceRouter.get("/", getAllBalances);
balanceRouter.get("/:userId", getBalanceForUser);





module.exports = balanceRouter;