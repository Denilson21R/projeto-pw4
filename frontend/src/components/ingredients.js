import {Link, useLoaderData} from "react-router-dom";
import {apiUrl} from "../utils/config";
import IngredientCard from "./IngredientCard";
import AlertCards from "./alertCards";
import {useState} from "react";

export default function Ingredients(){
    //TODO: verify if user is logged in and redirect to login page if not
    let [ingredients, setIngredients] = useState(useLoaderData());

    return(
        <div className="container mx-auto">
            <div className="mt-6 ml-8 grid grid-cols-2">
                <div className="font-bold text-3xl">Ingredientes</div>
                <div className="flex max-w-md ml-20 gap-x-4">
                    <label htmlFor="email-address" className="sr-only">
                        Pesquisar ingrediente...
                    </label>
                    <input
                        id="searchIngredient"
                        name="searchIngredient"
                        type="text"
                        required
                        className="placeholder:italic placeholder:text-slate-400 min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-400 sm:text-sm sm:leading-6"
                        placeholder="Pesquisar ingrediente..."
                        onKeyUp={handleSearchIngredient}
                    />
                </div>
            </div>
            <div className="mt-6 ml-8">
                <Link to="/ingredient/new" className="flex w-48 justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Novo ingrediente
                </Link>
            </div>
            <div className="container grid grid-cols-4 p-3 mt-2">
                {
                    ingredients.map((ingredient) => {
                        return (
                            <IngredientCard ingredient={ingredient} key={ingredient.id}/>
                        )
                    })
                }
            </div>
            {<AlertCards text={"Nenhum ingrediente encontrado"} listSize={ingredients.length}/>}
        </div>
    )

    function handleSearchIngredient() {
        const searchIngredient = document.getElementById("searchIngredient").value
        if(searchIngredient !== "") {
            requestSearchIngredient(searchIngredient);
        }else{
            requestAllIngredients();
        }
    }

    function requestSearchIngredient(searchIngredient) {
        apiUrl.get(`/ingredient/search/name/${searchIngredient}`)
            .then((response) => {
                if (response.status === 200) {
                    setIngredients(response.data)
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    function requestAllIngredients() {
        apiUrl.get(`/ingredient`)
            .then((response) => {
                if (response.status === 200) {
                    setIngredients(response.data)
                }
            }).catch((error) => {
                console.log(error)
            })
    }
}