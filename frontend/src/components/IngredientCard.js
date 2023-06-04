import {Link} from "react-router-dom";

export default function IngredientCard({ingredient}) {
    return (
        <>
            <Link to={`/ingredient/${ingredient.id}`}> {/*TODO: implementar rota*/}
                <figure className="rounded-2xl p-4 m-4 bg-gray-500 hover:bg-gray-600">
                    <div className="p-2 text-center space-y-4">
                        <blockquote>
                            <p className="text-xl font-bold uppercase">
                                {ingredient.name}
                            </p>
                        </blockquote>
                    </div>
                </figure>
            </Link>
        </>
    )
}