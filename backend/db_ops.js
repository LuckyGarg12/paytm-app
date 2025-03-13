const { User } = require("./db_schemas");

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:RB2LD4Xm6WY4c8DX@cluster0.ldxs9.mongodb.net/paytm_db");

async function addUser(user) {
    const newUser = await User.findOne({ username: user.username }).exec();
    if (newUser == null) {
        const newUser = new User(user);
        await newUser.createHash();
        const data = await newUser.save();
        return data._id;
    }
    return null;
}

async function getUser(username) {
    const user = await User.findOne({ username: username }).exec();
    return user;
}

module.exports = {
    addUser: addUser,
    getUser: getUser
}