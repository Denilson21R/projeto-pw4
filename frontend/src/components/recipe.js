import {useLoaderData} from "react-router-dom";
import RecipeComments from "./recipeComments";
import FormRecipeComment from "./formRecipeComment";

export default function Recipe(){
    let data = useLoaderData();
    let recipe = data.recipe;
    let userRecipe = data.userRecipe;

    if(recipe && userRecipe) {
        return (
            <>
                <div className="container mx-10 mt-8">
                    <div className="px-2 sm:px-0">
                        <h3 className="font-semibold leading-7 text-gray-900 text-xl uppercase">{recipe.name}</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{recipe.description}</p>
                    </div>
                    <div className="mt-6">
                        <div className="grid grid-cols-2">
                            <dl className="divide-y divide-gray-200">
                                {/*TODO: add link to user page*/}
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Criado por</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userRecipe.name}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Dificuldade</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{convertDifficulty(recipe.difficulty)}</dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Tempo de Preparo</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{recipe.preparationTimeMinutes} minutos</dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Modo de Preparo</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{recipe.preparationMode}</dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Informação Nutricional</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{recipe.nutritionalInformation ?? "Nenhuma informação"}</dd>
                                </div>
                            </dl>
                            <div className="flex flex-col px-6 lg:px-8">
                                <div className="font-bold text-1xl mb-2 text-center">Ingredientes</div>
                                <div className="grid grid-cols-3 gap-2">
                                    {recipe.Ingredients.map((ingredient) => (
                                        <span key={ingredient.id} className="justify-center inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                            {ingredient.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    localStorage.getItem("token") !== null ? (
                        <FormRecipeComment idRecipe={recipe.id}/>
                    ):(
                        <div className="container mx-10 mb-5">
                            <span className="mt-3 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                Login necessário para comentar
                            </span>
                        </div>
                    )
                }
                <RecipeComments commentList={data.comments}/>
            </>
        )
    } else {
        return (
            <>
                <span className="mt-3 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                    Ocorreu um erro ao encontrar a receita
                </span>
            </>
        )
    }

    function convertDifficulty(difficulty) {
        switch (difficulty) {
            case 'VERY EASY':
                return 'Muito Fácil';
            case 'EASY':
                return 'Fácil';
            case 'NORMAL':
                return 'Normal';
            case 'HARD':
                return 'Difícil';
            case 'VERY HARD':
                return 'Muito Difícil';
            default:
                return 'Desconhecido';
        }
    }
}