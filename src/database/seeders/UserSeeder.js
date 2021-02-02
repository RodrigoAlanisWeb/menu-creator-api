const User = require("../models/User");
const bcrypt = require("../../functions/bcrypt");
const jwt = require("../../functions/jwt");

async function Seed() {
    try {
        for (let index = 1; index <= 5; index++) {
            let user = await User.create({
                name: 'User Test ' + index,
                username: 'User Test ' + index,
                email: `email${index}@gmail.com`,
                password: await bcrypt.hashPassword("123456"),
            });
        }
        console.log("UserSedder Seed Succesfully");
    } catch (error) {
        console.log("Failed To Seed UserSedder", error);
    }
}

async function create() {

}

module.exports = {
    Seed
}