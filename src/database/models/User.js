const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class User extends Model {}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: {
                msg: "The Name Is So Long",
                args: 50
            },
            min: {
                msg: "The Name Is So Short",
                args: 10
            },
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: {
                msg: "The Username Is So Long",
                args: 80
            },
            min: {
                msg: "The Username Is So Short",
                args: 5
            },
        },
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "The Email Is Invalid"
            }
        },
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: {
                msg: "The Password Is So Long",
                args: 80
            },
            min: {
                msg: "The Password Is So Short",
                args: 10
            },
        }
    },
},{
    sequelize,
    modelName: 'User'
});

module.exports = User;