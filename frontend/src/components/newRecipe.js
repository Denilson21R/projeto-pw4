export default function NewRecipe() {
    function handleAddRecipe(event) {
        event.preventDefault()
        console.log("handleAddRecipe")
    }

    return (
        <div className="container mx-auto">
            <div className="font-bold text-3xl mt-6 ml-8">Nova Receita</div>
            <div className="mt-10 mx-10">
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
                                    <option>Normal</option>
                                    <option>Muito fácil</option>
                                    <option>Fácil</option>
                                    <option>Difícil</option>
                                    <option>Muito Difícil</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="preparationTime" className="block text-sm font-medium leading-6 text-gray-900">
                                Tempo de preparo (minutos)
                            </label>
                            <div className="mt-2">
                                <input
                                    id="preparationTime"
                                    name="preparationTime"
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
}