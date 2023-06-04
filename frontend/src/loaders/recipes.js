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

export {getRecipesLoader};