const express = require("express");
const app = express();

const morgan = require("morgan");
const db = require("./database/db");
const UserSeeder = require("./database/seeders/UserSeeder");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("./database/models/User");
const { verifyPassword } = require("./functions/bcrypt");
const { createToken } = require("./functions/jwt");
const config = require("./config.json");
-
// Passport Config
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({
            where: {
                username: username
            }
        }).then(user => {
            if (!user) {
                return done(null, false, { message: "Incorrect Username" });
            }

            if (!verifyPassword(password, user.password)) {
                return done(null, false, { message: "Incorrect Password" });
            }

            const token = createToken(user.id);

            return done(null, token);
        }).catch(err => {
            if (err) {
                return done(err);
            }
        })
    }
));

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromHeader("x-access-token");
opts.secretOrKey = config.secret;
passport.use(new JwtStrategy(opts, function(jwt_payload, done){
    User.findOne({
        where: {
            id: jwt_payload.id
        }
    }).then(user => {
        if (!user) {
            return done(null, false, { message: "Incorrect Token" })
        }

        return done(null, user);
    }).catch(err => {
        if (err) {
            return done(err);
        }
    })
}));

// Middlewares
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(express.json())

// Settigns
app.set("port", process.env.PORT || 3000);

// Routers
app.use("/api/auth", require("./routes/auth"));

// Connect To The Database
(async function Connect() {
    try {
        await db.sync({ force: true })
        console.log("Connection Successfully");
        await UserSeeder.Seed();
    } catch (err) {
        console.log("Connection Failed");
    }
})()


// Start The Server
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
})