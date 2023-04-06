import db from "../db.js";
import {DataTypes} from "sequelize";

export default db.define("Ingredient", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    visible: { //other users can view and use in their recipes
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    nutritionalInformation: {
        type: DataTypes.STRING
    }
})