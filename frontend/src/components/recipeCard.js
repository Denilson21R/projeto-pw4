import {Link} from "react-router-dom";

export default function RecipeCard({ recipe, user }) {
    //TODO: improve design
    return (
        <>
            <Link to={`/recipe/${recipe.id}`}>
                <figure className="rounded-2xl p-4 m-4 bg-gray-500 hover:bg-gray-600">
                    <div className="p-2 text-center space-y-4">
                        <blockquote>
                            <p className="text-xl font-bold uppercase">
                                {recipe.name}
                            </p>
                        </blockquote>
                        <figcaption>
                            <div className="text-white">
                                {recipe.description}
                            </div>
                            <div className="text-white mt-2">
                                Criado por {user.name}
                            </div>
                        </figcaption>
                    </div>
                </figure>
            </Link>
        </>
    );
}

