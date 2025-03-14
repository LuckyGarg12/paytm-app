const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const auth = (req, res, next) => {
    const token = req.headers.authorization.split(" ");
    try{
        const decoded = jwt.verify(token[1], JWT_SECRET);
        req.body = {_id:decoded._id};
        next()
    }
    catch(err) {
        res.status(403).json({
            "Error":"Bad Request"
        })
    }    
}

module.exports = {
    authMiddleware:auth
}