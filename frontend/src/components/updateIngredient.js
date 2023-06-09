import {useLoaderData, useParams} from "react-router-dom";
import {apiUrl} from "../utils/config";

export default function UpdateIngredient() {
    const idIngredient = useParams().ingredientId;
    let data = useLoaderData();

    return (
        <>
            <div className="container mx-auto">
                <div className="font-bold text-3xl mt-6 ml-8">Atualizar Ingrediente</div>
                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleUpdateIngredient}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Nome
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    defaultValue={data.name}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Visibilidade
                            </label>
                            <fieldset>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input id="visibility-all" defaultChecked={data.visible === true} name="visibility" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                        <label htmlFor="visibility-all" className="block text-sm font-medium leading-6 text-gray-900">Visível para outros usuários</label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input id="visibility-me" name="visibility" defaultChecked={data.visible === false} type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                        <label htmlFor="visibility-me" className="block text-sm font-medium leading-6 text-gray-900">Visível apenas para mim</label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <label htmlFor="nutritionalInformation" className="block text-sm font-medium leading-6 text-gray-900">
                                Informações nutricionais
                            </label>
                            <div className="mt-2">
                                <textarea id="nutritionalInformation" defaultValue={data.nutritionalInformation} name="nutritionalInfo" rows="3" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-500 sm:text-sm sm:leading-6"></textarea>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Atualizar ingrediente
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

    function handleUpdateIngredient(event) {
        event.preventDefault()
        const newIngredient = {
            name: event.target.name.value,
            visible: getVisibility(),
            nutritionalInformation: event.target.nutritionalInformation.value
        }
        if(isUpdateIngredientFormOk(newIngredient)) {
            requestUpdateIngredient(newIngredient)
        }else{
            //TODO: show error message
        }
    }

    function getVisibility() {
        const visibilityAll = document.getElementById('visibility-all');
        const visibilityMe = document.getElementById('visibility-me');

        if(visibilityAll.checked) {
            return true;
        }else if(visibilityMe.checked) {
            return false;
        }else {
            return null;
        }
    }

    function isUpdateIngredientFormOk(newIngredient) {
        return newIngredient.visible !== null && newIngredient.name !== null && newIngredient.nutritionalInformation !== null;
    }

    function requestUpdateIngredient(newIngredient) {
        apiUrl.put('/ingredient/' + idIngredient, newIngredient, {
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
        }).then(response => {
            if(response.status === 200) {
                window.location.href = '/ingredient/' + idIngredient
            }
        }).catch(error => {
            console.log(error)
        })
    }
}