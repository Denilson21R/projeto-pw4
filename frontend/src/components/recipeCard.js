export default function RecipeCard({ recipe }) {
    //TODO: improve design
    //TODO: add link to recipe page
    return (
        <figure className="rounded-2xl p-6 m-4 bg-gray-500">
            <div className="p-2 text-center space-y-4">
                <blockquote>
                    <p className="text-xl text-white font-bold uppercase">
                        {recipe.name}
                    </p>
                </blockquote>
                <figcaption>
                    <div className="font-medium">
                        {recipe.difficulty}
                    </div>
                    <div className="text-white">
                        {recipe.description}
                    </div>
                </figcaption>
            </div>
        </figure>
    );
}