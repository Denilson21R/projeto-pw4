import {apiUrl} from "../utils/config";

export default function NewIngredient() {
    return (
        <div className="container mx-auto">
            <div className="font-bold text-3xl mt-6 ml-8">Novo Ingrediente</div>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleAddIngredient}>
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
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Visibilidade
                        </label>
                        <fieldset>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input id="visibility-all" name="visibility" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                    <label htmlFor="visibility-all" className="block text-sm font-medium leading-6 text-gray-900">Visível para outros usuários</label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input id="visibility-me" name="visibility" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                    <label htmlFor="visibility-me" className="block text-sm font-medium leading-6 text-gray-900">Visível apenas para mim</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div>
                        <label htmlFor="nutritionalInfo" className="block text-sm font-medium leading-6 text-gray-900">
                            Informações nutricionais
                        </label>
                        <div className="mt-2">
                            <textarea id="nutritionalInfo" name="nutritionalInfo" rows="3" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-500 sm:text-sm sm:leading-6" required></textarea>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Adicionar ingrediente
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function handleAddIngredient(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const nutritionalInfo = document.getElementById('nutritionalInfo').value;
    const visibility = getVisibility();

    if(isFormValid(name, nutritionalInfo, visibility) && isTokenValid()){
        const data = {
            "name": name,
            "nutritionalInformation": nutritionalInfo,
            "visible": visibility
        }

        requestAddIngredient(data);
    }else{
        //TODO: show error in form message
    }
}

function isFormValid(name, nutritionalInfo, visibility) {
    return name !== "" && nutritionalInfo !== "" && visibility !== null;
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

function isTokenValid() {
    return localStorage.getItem('token') !== null;
}

function requestAddIngredient(data) {
    apiUrl.post('/ingredient', data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    ).then(response => {
        if(response.status === 201){
            window.location.href = '/ingredients';
        }else{
            //TODO: show error in request message
        }
    }).catch(error => {
        console.log(error);
    })
}