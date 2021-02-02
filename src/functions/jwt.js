const jwt = require("jsonwebtoken");
const { secret } = require("../config.json");

function createToken(id) {
    const token = jwt.sign({ id: id },secret,{
        expiresIn: 60 * 60 * 60 * 24
    });

    return token;
}

module.exports = {
    createToken
}