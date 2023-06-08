import {apiUrl} from "../utils/config";

async function getIngredientsLoader() {
    let ingredients = [];
    await apiUrl.get("/ingredient").then((response) => {
        if(response.status === 200){
            ingredients = response.data
        }
    }).catch((err) => {
        console.error(err);
    });

    return ingredients;
}

async function getIngredientLoader(ingredientId) {
    let ingredient = {};
    await apiUrl.get("/ingredient/"+ingredientId).then((response) => {
        if(response.status === 200){
            ingredient = response.data
        }
    }).catch((err) => {
        console.error(err);
    });

    return ingredient;
}

export {getIngredientsLoader, getIngredientLoader};