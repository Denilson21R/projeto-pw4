import Ingredient from "./ingredient.js";
import Recipe from "./recipe.js";
import User from "./user.js";

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

//recipe has many ingredients
Recipe.belongsToMany(Ingredient, {
    through: "RecipeIngredient"
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

export default {User, Ingredient, Recipe}