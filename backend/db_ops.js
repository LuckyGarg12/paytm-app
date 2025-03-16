const { User, Account } = require("./db_schemas");

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:RB2LD4Xm6WY4c8DX@cluster0.ldxs9.mongodb.net/paytm_db");


//--------------- User Operations -------------------------

async function addUser(user) {
    const existing = await User.findOne({ username: user.username }).exec();
    if (existing == null) {
        const newUser = new User(user);
        await newUser.createHash();
        const data = await newUser.save();
        await createAccount(data._id, 1+Math.random()*10000);
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
        const users = await User.find().or([{firstName:{"$regex": filter, "$options":"i"}}, {lastName:{"$regex":filter, "$options":"i"}}]).ne("_id", userId).exec();
        return users;        
    }
    catch(err) {
        console.log(err);
        return null;
    }
}

//---------------------------------------------------------------------
//------------------- Account Operations ------------------------------

async function createAccount(userId, balance) {
    const existing = await Account.findOne({userId:userId});
    if (existing) return null;

    try {
        const acc = await Account.create({
            userId:userId,
            balance:balance
        })
        return acc._id;
    }
    catch(err) {
        return null;
    }
}

async function transfer(req) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {to, amount} = req.body;
    
        const account = await Account.findOne({userId:req.userId}).session(session);
    
        if(!account || account.balance<amount) {
            await session.abortTransaction();
            return {
                "success":false,
                "error":"Insuffient balance or no account"
            }
        }
    
        const toAccount = await Account.findOne({userId:to}).session(session);
    
        if(!toAccount) {
            await session.abortTransaction();
            return {
                "success":false,
                "error":"Transfer account does not exist"
            }
        }
    
        await Account.updateOne({userId:req.userId}, {$inc: {balance: -amount}}).session(session);
        await Account.updateOne({userId:to}, {$inc:{balance: amount}}).session(session);
    }
    catch(err) {
        console.log(err);
        await session.abortTransaction();
        return {
            "success":false,
            "error":"Something went wrong"
        }
    }    

    await session.commitTransaction();

    return {
        "success":true
    }
}

module.exports = {
    addUser,
    getUser,
    updateUser,
    searchUsers,
    createAccount,
    transfer
}