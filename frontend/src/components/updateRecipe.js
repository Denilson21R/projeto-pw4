import {useLoaderData} from "react-router-dom";
import {useState} from "react";
import {apiUrl} from "../utils/config";

export default function UpdateRecipe() {
    let data = useLoaderData();

    const [ingredients, setIngredients] = useState(data.recipe.Ingredients);
    const ingredientsAllowedToAddInRecipe = filterIngredientsAllowedToAddInRecipe();

    return (
        <>
            <div className="container mx-auto">
                <div className="font-bold text-3xl mt-6 ml-8">Atualizar Receita</div>
                <div className="mt-5 mx-10">
                    <form className="space-y-2" onSubmit={handleUpdateRecipe}>
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
                                        defaultValue={data.recipe.name}
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
                                        defaultValue={data.recipe.difficulty}
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-stone-500 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value="NORMAL">Normal</option>
                                        <option value="VERY EASY">Muito fácil</option>
                                        <option value="EASY" >Fácil</option>
                                        <option value="HARD">Difícil</option>
                                        <option value="VERY HARD">Muito Difícil</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6">
                                <label htmlFor="preparationTimeMinutes" className="block text-sm font-medium leading-6 text-gray-900">
                                    Tempo de preparo (minutos)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="preparationTimeMinutes"
                                        name="preparationTimeMinutes"
                                        type="number"
                                        min={0}
                                        defaultValue={data.recipe.preparationTimeMinutes}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="mt-10">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Descrição
                                </label>
                                <div>
                                    <textarea id="description" defaultValue={data.recipe.description} name="description" rows="1" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-500 sm:text-sm sm:leading-6" required></textarea>
                                </div>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="preparationMode" className="block text-sm font-medium leading-6 text-gray-900">
                                    Modo de preparo
                                </label>
                                <div className="mt-2">
                                    <textarea id="preparationMode" defaultValue={data.recipe.preparationMode} name="preparationMode" rows="2" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-500 sm:text-sm sm:leading-6" required></textarea>
                                </div>
                            </div>
                            <div className="mt-2">
                                <label htmlFor="nutritionalInformation" className="block text-sm font-medium leading-6 text-gray-900">
                                    Informação nutricional
                                </label>
                                <div className="mt-2">
                                    <textarea id="nutritionalInformation" defaultValue={data.recipe.nutritionalInformation} name="nutritionalInformation" rows="1" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-500 sm:text-sm sm:leading-6"></textarea>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="searchIngredients" className="block text-sm font-medium leading-6 text-gray-900">
                                    Ingredientes
                                </label>
                                <div className="mt-2">
                                    <select onChange={handleChangeIngredient} id="searchIngredients" name="searchIngredients" autoComplete="searchIngredients" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-stone-500 sm:max-w-xs sm:text-sm sm:leading-6">
                                        <option>Selecione um ingrediente</option>
                                        {ingredientsAllowedToAddInRecipe.map((ingredient) => (
                                            <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-3 mb-5">
                                <label htmlFor="selectedIngredients" className="block text-sm font-medium leading-6 text-gray-900">
                                    Ingredientes selecionados
                                </label>
                                <div>
                                    <div className="mt-2 grid grid-cols-4 gap-8">
                                        {ingredients.map((ingredientSelected) => (
                                            <span key={ingredientSelected.id} className="group inline-flex w-1/2 justify-center items-center rounded-md bg-blue-50 px-2 py-2 text-xs font-medium text-black ring-1 ring-inset ring-gray-500/10">
                                                <svg onClick={()=>{
                                                    setIngredients(ingredients.filter((ingredient) => ingredient.id !== ingredientSelected.id))
                                                    ingredientsAllowedToAddInRecipe.push(ingredientSelected)
                                                }} className="w-4 h-4 hidden group-hover:block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
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
                                Atualizar receita
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

    function handleUpdateRecipe(event) {
        event.preventDefault();
        const recipe = {
            name: event.target.name.value,
            description: event.target.description.value,
            preparationTimeMinutes: event.target.preparationTimeMinutes.value,
            preparationMode: event.target.preparationMode.value,
            nutritionalInformation: event.target.nutritionalInformation.value,
            difficulty: event.target.difficulty.value,
            ingredients: convertToArrayOfIds(ingredients)
        }

        requestUpdateRecipe(recipe);
    }

    function convertToArrayOfIds(ingredientsList) {
        let ids = []
        ingredientsList.forEach((ingredient) => { ids.push(ingredient.id) })
        return ids
    }

    function requestUpdateRecipe(recipe) {
        apiUrl.put(`/recipe/${data.recipe.id}`, recipe, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = `/recipe/${data.recipe.id}`
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    function handleChangeIngredient(event) {
        const ingredientId = event.target.value
        let ingredient = ingredientsAllowedToAddInRecipe.find((ingredient) => parseInt(ingredient.id) === parseInt(ingredientId))

        setIngredients([...ingredients, ingredient])
        ingredientsAllowedToAddInRecipe.splice(ingredientsAllowedToAddInRecipe.indexOf(ingredient), 1)
    }

    function filterIngredientsAllowedToAddInRecipe() {
        let allowed = []
        data.ingredients.forEach((ingredient) => {
            if(!ingredients.some((ingredientSelected) => ingredientSelected.id === ingredient.id)) {
                allowed.push(ingredient)
            }
        })
        return allowed;
    }
}