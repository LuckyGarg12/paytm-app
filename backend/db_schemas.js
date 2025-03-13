const mongoose = require("mongoose");
const argon2 = require("argon2");

mongoose.connect("mongodb+srv://admin:RB2LD4Xm6WY4c8DX@cluster0.ldxs9.mongodb.net/paytm_db");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    },
    firstName:{
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 20
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 20
    },
});


userSchema.methods.createHash = async function() {
    this.password = await argon2.hash(this.password);
}

userSchema.methods.verifyPassword = async function(password) {
    return await argon2.verify(this.password, password);
}

const User = mongoose.model("User", userSchema);

module.exports = {
    User: User
};

