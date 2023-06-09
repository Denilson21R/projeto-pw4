import Ingredient from "./ingredient.js";
import Recipe from "./recipe.js";
import User from "./user.js";
import Comment from "./comment.js";

//user has many ingredients
User.hasMany(Ingredient, {
    foreignKey: "idUser"
})
Ingredient.belongsTo(User, {
    constraint: true,
    foreignKey: "idUser"
})

//user has many recipes.js
User.hasMany(Recipe, {
    foreignKey: "idUser"
})
Recipe.belongsTo(User, {
    constraint: true,
    foreignKey: "idUser"
})

//recipe has many ingredients
Ingredient.belongsToMany(Recipe, {
    through: "RecipeIngredient"
})
Recipe.belongsToMany(Ingredient, {
    through: "RecipeIngredient"
})

//comment have a user
Comment.belongsTo(User, {
    constraint: true,
    foreignKey: "idUser"
})

//comment have a recipe
Comment.belongsTo(Recipe, {
    constraint: true,
    foreignKey: "idRecipe"
})

export {User, Ingredient, Recipe, Comment}