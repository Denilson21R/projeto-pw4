import db from "../db.js";
import {DataTypes} from "sequelize";

const Recipe = db.define("Recipe",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    visible: { //visible for other user
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

export default Recipe;