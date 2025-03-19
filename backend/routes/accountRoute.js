const express = require("express");
const { authMiddleware } = require("../middleware");
const { transferSchema } = require("../schemas");
const { transfer, getBalance } = require("../db_ops");
const router = express.Router();

router.use(authMiddleware)

router.get("/balance", async (req, res) => {
    const balance = await getBalance(req.userId);
    res.send({
        "balance": balance/100
    });
})

router.post("/transfer", async (req, res) => {
    const body = transferSchema.safeParse(req.body);
    if (body.success) {
        req.body.amount = Math.floor(req.body.amount*100);
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