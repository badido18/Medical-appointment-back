const { error } = require("./response")
const { verifyToken } = require("./token")
require('dotenv').config()
module.exports = {
    adminCheck : (req,res,next) => {
        if(req.headers.adminkey === process.env.ADMIN_KEY)
            next()
        else
            res.send(error("You don't have the privelges to execute this action"))
    },
    tokenCheck : (req,res,next) => {
        if(req.headers.token && verifyToken(req.headers.token))
            next();
        else
            res.send(error("invalid token"))
    }
}