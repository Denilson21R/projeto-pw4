import {DataTypes} from "sequelize";
const { Sequelize, Model, DataTypes } = require("sequelize");

//TODO: use a config file to save db config
const sequelize = new Sequelize('pw4-projeto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

class User extends Model {}

//TODO: implement correctly
User.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});