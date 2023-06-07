import {useLoaderData} from "react-router-dom";
import {useState} from "react";
import {apiUrl} from "../utils/config";

export default function NewRecipe() {
    let ingredients = useLoaderData();
    const  [selectedIngredients, setSelectedIngredients] = useState([]);

    return (
        <div className="container mx-auto">
            <div className="font-bold text-3xl mt-6 ml-8">Nova Receita</div>
            <div className="mt-5 mx-10">
                <form className="space-y-6" onSubmit={handleAddRecipe}>
                    <div className="columns-2 gap-8">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Nome
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="difficulty" className="block text-sm font-medium leading-6 text-gray-900">
                                Dificuldade
                            </label>
                            <div>
                                <select
                                    id="difficulty"
                                    name="difficulty"
                                    autoComplete="difficulty"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="NORMAL">Normal</option>
                                    <option value="VERY EASY">Muito fácil</option>
                                    <option value="EASY">Fácil</option>
                                    <option value="HARD">Difícil</option>
                                    <option value="VERY HARD">Muito Difícil</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="preparationTimeMinutes" className="block text-sm font-medium leading-6 text-gray-900">
                                Tempo de preparo (minutos)
                            </label>
                            <div className="mt-2">
                                <input
                                    id="preparationTimeMinutes"
                                    name="preparationTimeMinutes"
                                    type="number"
                                    min={0}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="preparationMode" className="block text-sm font-medium leading-6 text-gray-900">
                                Modo de preparo
                            </label>
                            <div className="mt-2">
                                <textarea id="preparationMode" name="preparationMode" rows="3" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required></textarea>
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Descrição
                            </label>
                            <div className="mt-2">
                                <textarea id="description" name="description" rows="3" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required></textarea>
                            </div>
                        </div>
                        {/*TODO: add nutritional information*/}
                    </div>
                    <div>
                        <div className="mt-5">
                            <label htmlFor="searchIngredients" className="block text-sm font-medium leading-6 text-gray-900">
                                Ingredientes
                            </label>
                            <div className="mt-3">
                                <select onChange={handleChangeIngredient} id="searchIngredients" name="searchIngredients" autoComplete="searchIngredients" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option>Selecione um ingrediente</option>
                                    {ingredients.map((ingredient) => (
                                        <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="selectedIngredients" className="block text-sm font-medium leading-6 text-gray-900">
                                Ingredientes selecionados
                            </label>
                            <div>
                                {/*TODO: on hover, show button to remove ingredient*/}
                                <div className="mt-2 grid grid-cols-4 gap-8">
                                    {selectedIngredients.map((ingredientSelected) => (
                                        <span key={ingredientSelected.id} className="inline-flex w-1/2 justify-center items-center rounded-md bg-blue-50 px-2 py-2 text-xs font-medium text-black ring-1 ring-inset ring-gray-500/10">
                                            {ingredientSelected.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Adicionar receita
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

    function isFormValid(event) {
        return selectedIngredients.length > 0 &&
            event.target.name.value !== "" &&
            event.target.description.value !== "" &&
            event.target.preparationTimeMinutes.value !== "" &&
            event.target.preparationMode.value !== "" &&
            event.target.difficulty.value !== "";
    }

    function handleAddRecipe(event) {
        event.preventDefault()
        if(isFormValid(event)) {
            const recipe = {
                name: event.target.name.value,
                description: event.target.description.value,
                preparationTimeMinutes: event.target.preparationTimeMinutes.value,
                preparationMode: event.target.preparationMode.value,
                difficulty: event.target.difficulty.value,
                ingredients: convertToArrayOfIds(selectedIngredients)
            }
            requestAddRecipe(recipe);
        }else{
            //TODO: show error message
        }

    }

    function convertToArrayOfIds(selectedIngredients) {
        let ids = []
        selectedIngredients.forEach((ingredient) => { ids.push(ingredient.id) })
        return ids
    }

    function handleChangeIngredient(event) {
        const ingredientId = event.target.value
        let ingredient = ingredients.find((ingredient) =>{
            return parseInt(ingredient.id) === parseInt(ingredientId)
        })

        setSelectedIngredients([...selectedIngredients, ingredient])
        ingredients.splice(ingredients.indexOf(ingredient), 1)
    }

    function requestAddRecipe(recipe) {
        apiUrl.post('/recipe', recipe, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.status === 201) {
                window.location.href = '/recipes'
            }
        }).catch((error) => {
            console.log(error)
        })
    }
}