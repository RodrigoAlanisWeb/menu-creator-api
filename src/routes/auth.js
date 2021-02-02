const { Router } = require("express");
const router = Router();

const passport = require("passport");
const User = require("../database/models/User");
const { hashPassword } = require("../functions/bcrypt");
const { createToken } = require("../functions/jwt");

router.post("/singin", async (req, res) => {
    const { name, username, email, password } = req.body;
    console.log(req.body);
    try {
        const token = createToken(username)
        const user = await User.create({
            name: name,
            username: username,
            email: email,
            password: await hashPassword(password),
            token: token,
        });
        res.status(200).json({
            res: true,
            auth: true,
            token
        });
    } catch (error) {
        res.status(500).json({
            res: false,
            msg: "Error At Creating The User",
            error
        })
    }
});

router.post("/login",passport.authenticate('local',{session: false}),(req,res) => {
    res.json({
        "res": true,
        "auth": true,
        "token": req.user
    })
});

router.get("/profile", passport.authenticate('jwt',{session: false}),(req,res) => {
    res.json({
        "res": true,
        "auth": true,
        "user": req.user
    })
});

module.exports = router;