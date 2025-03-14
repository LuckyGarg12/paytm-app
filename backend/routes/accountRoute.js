const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db_schemas");
const { transferSchema } = require("../schemas");
const { transfer } = require("../db_ops");
const router = express.Router();

router.use(authMiddleware)

router.get("/balance", async (req, res) => {
    const account = await Account.findOne({ userId: req.userId });
    res.send({
        "balance": account.balance
    });
})

router.post("/transfer", async (req, res) => {
    const body = transferSchema.safeParse(req.body);
    if (body.success) {
        const transactionState = await transfer(req);
        if (transactionState.success) {
            res.send({
                "Message": "Transaction Successful"
            })
        }
        else {
            res.status(400).json({
                "Error": `${transactionState.error}`
            })
        }
    }
})


module.exports = router;