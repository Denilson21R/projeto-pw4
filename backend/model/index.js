import Ingredient from "./ingredient.js";
import Recipe from "./recipe.js";
import User from "./user.js";
import db from "../db.js";
import {DataTypes} from "sequelize";

//user has many ingredients
User.hasMany(Ingredient, {
    foreignKey: "idUser"
})

//user has many recipes
User.hasMany(Recipe, {
    foreignKey: "idUser"
})

//recipe has one user
Recipe.belongsTo(User, {
    constraint: true,
    foreignKey: "idUser"
})

//ingredient has one user
Ingredient.belongsTo(User, {
    constraint: true,
    foreignKey: "idUser"
})

//ingredient has many recipes
Ingredient.belongsToMany(Recipe, {
    through: "RecipeIngredient"
})

//recipe has many ingredients
Recipe.belongsToMany(Ingredient, {
    through: "RecipeIngredient"
})

const reactionUser = db.define('ReactionUser', {
    text: DataTypes.STRING,
    type: DataTypes.ENUM('LIKE', 'COMMENT')
});

User.belongsToMany(Recipe, {
    through: reactionUser
})

Recipe.belongsToMany(User, {
    through: reactionUser
})

export {User, Ingredient, Recipe, reactionUser}