const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { JWT_SECRET } = require("../config");
const { userSchema, signinSchema } = require("../schemas");
const { addUser, getUser } = require("../db_ops");

router.use(cors());
router.use(express.json());

router.post("/signup", async (req, res) => {
    console.log(req.body);
    const body = userSchema.safeParse(req.body);
    if (body.success) {
        const succes = await addUser(body.data);
        if (!succes) { 
            res.status(411).json({message: "Username already exists"});
            return
        }
        const token = jwt.sign({username: body.data.username}, JWT_SECRET);
        res.json({message: "User created", token: token});
    }
    else {
        res.status(411).json({message: "Invalid data"});
    }
})

router.post("/signin", async (req, res) => {
    const body = signinSchema.safeParse(req.body);
    if (body.success) {
        const user = await getUser(body.data.username);
        if (user == null) {
            res.status(411).json({message: "User not found"});
            return
        }
        const match = await user.verifyPassword(body.data.password);
        if (!match) {
            res.status(411).json({message: "Invalid password"});
            return
        }
        const token = jwt.sign({username: user.username}, JWT_SECRET);
        res.json({message: "Signin successful", token: token});
    }
})



module.exports = router;
