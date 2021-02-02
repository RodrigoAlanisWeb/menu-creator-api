const bcrypt = require("bcryptjs");

async function hashPassword (password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

async function verifyPassword (password,hash) {
    const verification = await bcrypt.compare(password, hash);
    return verification
}

module.exports = {
    hashPassword,
    verifyPassword
}