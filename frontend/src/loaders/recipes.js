import {apiUrl} from "../utils/config";
import {getIngredientsLoader} from "./ingredients";

async function getRecipesLoader() {
    let recipes = [];
    recipes = await getAllRecipes(recipes);

    return recipes;
}

async function getRecipeLoader(id) {
    let recipeData = {}

    recipeData = await getRecipeData(id, recipeData);
    recipeData = await getCommentsRecipe(id, recipeData);
    return recipeData;
}

async function getUpdateRecipeLoader(id) {
    let recipeData = {}

    recipeData = await getRecipeData(id, recipeData);
    recipeData = await getCommentsRecipe(id, recipeData);
    recipeData = await getAllIngredients(recipeData);
    return recipeData;
}

async function getAllRecipes(recipes) {
    await apiUrl.get("/recipe").then((response) => {
        if (response.status === 200) {
            recipes = response.data.rows
        }
    }).catch((err) => {
        console.error(err);
    });
    return recipes;
}

async function getRecipeData(id, recipeData) {
    await apiUrl.get(`/recipe/${id}`).then((response) => {
        if (response.status === 200) {
            recipeData = {
                recipe: response.data,
                userRecipe: response.data.User
            }
        }
    }).catch((err) => {
        console.error(err);
    });
    return recipeData;
}

async function getCommentsRecipe(id, recipeData) {
    await apiUrl.get(`/comment/recipe/${id}`).then((response) => {
        if (response.status === 200) {
            recipeData.comments = response.data.rows;
        }
    }).catch((err) => {
        console.error(err);
    });
    return recipeData;
}

async function getAllIngredients(recipeData) {
    recipeData.ingredients = await getIngredientsLoader();
    return recipeData;
}

export {getRecipesLoader, getRecipeLoader, getUpdateRecipeLoader};