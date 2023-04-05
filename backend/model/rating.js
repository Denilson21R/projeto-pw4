import {DataTypes} from "sequelize";
import db from "../db.js";

export default db.define("Rating",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    value: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0,
            max: 5
        },
        defaultValue: 0,
        allowNull: false
    }
})