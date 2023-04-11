import db from "../db.js";
import {DataTypes} from "sequelize";

export default db.define("Recipe",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preparationTimeMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preparationMode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nutritionalInformation: {
        type: DataTypes.STRING,
    },
    difficulty: {
        type: DataTypes.ENUM,
        values: ['VERY EASY', 'EASY', 'NORMAL', 'HARD', 'VERY HARD'],
        defaultValue: 'NORMAL'
    }
});