export default function RecipeComments({idRecipe}) {
    return (
        //TODO: FUI AO BANHEIRO JA VOLTO
        <>
            {/*TODO: verify if user is logged in and show comment form*/}
            <div className="flex flex-col items-center justify-center mt-2 py-2">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold">Comentários da Receita {idRecipe}</h1>
                    <div className="flex flex-col justify-center items-center">
                        Lista de comentários
                    </div>
                </div>
            </div>
        </>
    )
}