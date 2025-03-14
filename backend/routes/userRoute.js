const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { userSchema, signinSchema, updateUserSchema } = require("../schemas");
const { addUser, getUser, updateUser } = require("../db_ops");
const { authMiddleware } = require("../middleware");

router.post("/signup", async (req, res) => {
    const body = userSchema.safeParse(req.body);
    if (body.success) {
        const id = await addUser(body.data);
        if (id == null) { 
            res.status(411).json({message: "Username already exists"});
            return
        }
        const token = jwt.sign({_id: id}, JWT_SECRET);
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
        const token = jwt.sign({_id: user._id}, JWT_SECRET);
        res.json({message: "Signin successful", token: token});
    }
})

router.put("/update", authMiddleware, async (req, res)=> {
    const body = updateUserSchema.safeParse(req.body);
    if (body.success) {
        const success = await updateUser(req.userId, body.data);
        if (success) {
            res.send({
                "message":"Updated successfully"
            })
            return
        }
    }
    res.status(411).json({
        "Error":"Could not update. Check the input."
    })
})



module.exports = router;
