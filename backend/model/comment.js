import {DataTypes} from "sequelize";
import db from "../db.js";

export default db.define("Comment",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
})