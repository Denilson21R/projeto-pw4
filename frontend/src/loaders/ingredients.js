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

export {getIngredientsLoader};