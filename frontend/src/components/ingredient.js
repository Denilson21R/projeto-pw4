import {useLoaderData, useParams} from "react-router-dom";

export default function Ingredient(){
    let { ingredientId } = useParams();
    let ingredient = useLoaderData();

    if(ingredientId && ingredient) {
        return (
            <div className="container mx-10 mt-12">
                <div className="px-4 sm:px-0">
                    <h3 className="font-semibold leading-7 text-gray-900 text-xl uppercase">{ingredient.name}</h3>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        {/*TODO: add link to user page*/}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Criado por</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ingredient.User.name}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Informação Nutricional</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ingredient.nutritionalInformation ?? "Nenhuma informação"}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        )
    } else {
        //TODO: improve design
        return (
            <>
                Ingredient not found
            </>
        )
    }
}