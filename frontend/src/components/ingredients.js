import {useEffect, useState} from "react";
import {apiUrl} from "../utils/config";

export default function Ingredients(){
    //TODO: verify if user is logged in and redirect to login page if not
    let [ingredients, setIngredients] = useState([]);
    //TODO: implement search functionality

    return(
        <div className="container mx-auto">
            <div className="mt-6 ml-8 grid grid-cols-2">
                <div className="font-bold text-3xl">Ingredientes</div>
                <div className="flex max-w-md ml-20 gap-x-4">
                    <label htmlFor="email-address" className="sr-only">
                        Pesquisar ingrediente...
                    </label>
                    {/*TODO: implement search ingredient functionality*/}
                    <input
                        id="searchIngredient"
                        name="searchIngredient"
                        type="text"
                        required
                        className="placeholder:italic placeholder:text-slate-400 min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-400 sm:text-sm sm:leading-6"
                        placeholder="Pesquisar ingrediente..."
                    />
                </div>
            </div>
        </div>
    )
}