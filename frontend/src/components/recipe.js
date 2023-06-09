import {useLoaderData} from "react-router-dom";
import RecipeComments from "./recipeComments";

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
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            {/*TODO: add link to user page*/}
                            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Criado por</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userRecipe.name}
                                </dd>
                            </div>
                            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Dificuldade</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{recipe.difficulty}
                                </dd>
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
                    </div>
                </div>
                <RecipeComments idRecipe={recipe.id}/>
            </>
        )
    } else {
        //TODO: improve design
        return (
            <>
                Recipe not found
            </>
        )
    }
}