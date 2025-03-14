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

const updateUserSchema = zod.object({
    password:zod.string().min(6).optional(),
    firstName: zod.string().min(1).max(20).optional(),
    lastName: zod.string().min(1).max(20).optional()
})

const transferSchema = zod.object({
    to: zod.string(),
    amount: zod.number()
})

module.exports = {
    userSchema,
    signinSchema,
    updateUserSchema,
    transferSchema
}