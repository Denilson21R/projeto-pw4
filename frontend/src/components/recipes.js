import RecipeCard from "./recipeCard";
import {Link, useLoaderData} from "react-router-dom";
import {apiUrl} from "../utils/config";
import {useState} from "react";

export default function Recipes() {
    const [recipes, setRecipes] = useState(useLoaderData());

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
                        className="placeholder:italic placeholder:text-slate-400 min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-400 sm:text-sm sm:leading-6"
                        placeholder="Pesquisar receita..."
                        onKeyUp={handleSearchRecipe}
                    />
                </div>
            </div>
            <div className="mt-6 ml-8">
                <Link to="/recipe/new" className="flex w-48 justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Nova receita
                </Link>
            </div>
            <div className="container grid grid-cols-4 p-3 mt-2">
                {
                    recipes.map((recipe) => {
                            return (<RecipeCard recipe = {recipe} user={recipe.User}  key={recipe.id} />)
                        }
                    )
                }
            </div>
            {/*TODO: show message if there are no recipes*/}
        </div>
    )

    function handleSearchRecipe() {
        const searchRecipe = document.getElementById("searchRecipe").value
        if (searchRecipe !== "") {
            requestRecipesByName(searchRecipe)
        } else {
            requestAllRecipes()
        }
    }

    function requestRecipesByName(searchRecipe) {
        apiUrl.get(`/recipe/search/name/${searchRecipe}`)
            .then((response) => {
                if (response.status === 200) {
                    setRecipes(response.data)
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    function requestAllRecipes() {
        apiUrl.get(`/recipe`)
            .then((response) => {
                if (response.status === 200) {
                    setRecipes(response.data)
                }
            }).catch((error) => {
                console.log(error)
            })
    }
}