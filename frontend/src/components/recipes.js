import RecipeCard from "./recipeCard";
import {apiUrl} from "../utils/config";
import {useEffect, useState} from "react";

export default function Recipes() {
    let [recipes, setRecipes] = useState([]);

    useEffect(() => {
        apiUrl.get("/recipe")
            .then((response) => {
                if(response.status === 200){
                    recipes = setRecipes(response.data.rows)
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div className="container mx-auto">
            <div className="mt-6 ml-8 grid grid-cols-2">
                <div className="font-bold text-3xl">Receitas</div>
                <div className="flex max-w-md ml-20 gap-x-4">
                    <label htmlFor="email-address" className="sr-only">
                        Pesquisar receita...
                    </label>
                    {/*TODO: implement search recipe functionality*/}
                    <input
                        id="searchRecipe"
                        name="searchRecipe"
                        type="text"
                        required
                        className="placeholder:italic placeholder:text-slate-400 min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-400 sm:text-sm sm:leading-6"
                        placeholder="Pesquisar receita..."
                    />
                </div>
            </div>
            <div className="container grid grid-cols-4 p-3 mt-2">
                {
                    recipes.map((recipe) => {
                            return (<RecipeCard recipe = {recipe} user={recipe.User}  key={recipe.id} />)
                        }
                    )
                }
            </div>
        </div>
    )
}