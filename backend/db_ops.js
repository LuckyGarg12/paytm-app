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

async function updateUser(userId, update) {
    try {
        const user = await User.findByIdAndUpdate(userId, update, { new: true });        
        await user.createHash();
        await user.save();
        
        return true;
    }
    catch(err){
        return false
    }
}

async function searchUsers(userId, filter) {
    try {
        const users = await User.find().or([{firstName:{"$regex": filter}}, {lastName:{"$regex":filter}}]).ne("_id", userId).exec();
        return users;        
    }
    catch(err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    addUser: addUser,
    getUser: getUser,
    updateUser: updateUser,
    searchUsers:searchUsers
}