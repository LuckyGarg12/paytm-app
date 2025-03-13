const zod = require("zod");

const userSchema = zod.object({
    username: zod.string().min(3).max(20),
    password: zod.string().min(6),
    firstName: zod.string().min(1).max(20),
    lastName: zod.string().min(1).max(20)
});

const signinSchema = zod.object({
    username: zod.string().min(3).max(20),
    password: zod.string().min(6)
});

module.exports = {
    userSchema: userSchema,
    signinSchema: signinSchema
}