import db from "../db.js";
import {DataTypes} from "sequelize";

export default db.define("Recipe",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    visible: { //visible for other user
        type: DataTypes.BOOLEAN,
        allowNull: false
    }

    //hasMany ingredients
    //hasOne userCreator

    //TODO: implement -> recipe.belongsToMany(Ingredient, { through: "RecipeIngredient" })
});