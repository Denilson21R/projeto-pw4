import {apiUrl} from "../utils/config";

async function getRecipesLoader() {
    let recipes = [];
    await apiUrl.get("/recipe").then((response) => {
        if(response.status === 200){
            recipes = response.data.rows
        }
    }).catch((err) => {
        console.error(err);
    });

    return recipes;
}

async function getRecipeLoader(id) {
    let recipeData = {}

    await apiUrl.get(`/recipe/${id}`).then((response) => {
        if(response.status === 200){
            recipeData = {
                recipe: response.data,
                userRecipe : response.data.User
            }
        }
    }).catch((err) => {
        console.error(err);
    });

    return recipeData;
}


export {getRecipesLoader, getRecipeLoader};