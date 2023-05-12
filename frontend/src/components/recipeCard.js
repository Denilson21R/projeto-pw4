export default function RecipeCard({ recipe }) {
    //TODO: improve design and use recipe data
    return (
        <figure className="rounded-xl p-6 bg-gray-500">
            <div className="pt-2 text-center space-y-4">
                <blockquote>
                    <p className="text-xl text-white">
                        Nome da receita
                    </p>
                </blockquote>
                <figcaption>
                    <div className="font-medium">
                        Dificuldade
                    </div>
                    <div className="text-white">
                        Descrição
                    </div>
                </figcaption>
            </div>
        </figure>
    );
}