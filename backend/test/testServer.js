const express = require("express")
const { authMiddleware } = require("../middleware")

const app = express();

app.use(express.json())

app.get("/testAuth", authMiddleware, (req, res) => {
    console.log(req.userId);
    res.json({
        _id:req.userId
    })
})

app.listen(3000, () => {
    console.log("Server running")
    console.log("https://localhost:3000")
})