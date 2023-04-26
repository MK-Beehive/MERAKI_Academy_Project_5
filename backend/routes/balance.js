const express = require('express')
const {getAllBalances,getBalanceForUser,  updatebalancestatus,
    creatbalance} = require("../controllers/balance")
const balanceRouter=express.Router();

// experianceRouter.post("/", createMajors);
balanceRouter.get("/", getAllBalances);
balanceRouter.get("/:userId", getBalanceForUser);
balanceRouter.post("/", creatbalance);
balanceRouter.put("/:id", updatebalancestatus);






module.exports = balanceRouter;