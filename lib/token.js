const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateToken({ id }) {
    return jwt.sign({id}, process.env.TOKEN_SECRET)
}

function decryptToken(token) {
    return jwt.decode(token)
}

function verifyToken(token) {
    if(jwt.verify(token,process.env.TOKEN_SECRET))
        return true
    else
        return false
}

module.exports = {generateToken , decryptToken ,verifyToken}