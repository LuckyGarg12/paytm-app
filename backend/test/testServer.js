const express = require("express")
const { authMiddleware } = require("../middleware")

const app = express();

app.use(express.json())

app.get("/testAuth", authMiddleware, (req, res) => {
    console.log(req.body);
    res.json({
        _id:req.body._id
    })
})

app.listen(3000, () => {
    console.log("Server running")
    console.log("https://localhost:3000")
})