import RecipeCard from "./recipeCard";
import {apiUrl} from "../utils/config";
import {useEffect, useState} from "react";

export default function Recipes() {
    let [recipes, setRecipes] = useState([]);

    useEffect(() => {
        apiUrl.get("/recipe")
            .then((response) => {
                recipes = setRecipes(response.data.rows)
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div className="container mx-auto">
            <div className="text-3xl font-bold mt-2">Receitas</div>
            <div className="container grid grid-cols-4 p-4 m-4">{/*se as a quantidade de registros for impar, a quantidade de colunas tem que ser tambem*/}
                {
                    recipes.map((recipe) => {
                            return (<RecipeCard recipe = {recipe} key={recipe.id}/>)
                        }
                    )
                }
            </div>
        </div>
    )
}