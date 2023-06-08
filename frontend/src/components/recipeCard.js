import {Link} from "react-router-dom";
import {apiUrl} from "../utils/config";

export default function RecipeCard({ recipe, user, onDeleteRecipe }) {
    //TODO: improve design
    return (
        <>
            <Link to={`/recipe/${recipe.id}`}>
                <figure className="rounded-2xl p-4 m-4 bg-gray-500 hover:bg-gray-600 group">
                    <div className="p-1 text-center space-y-4">
                        <svg onClick={handleDeleteRecipe} className={getClasses()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
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

    function getClasses() {
        if(user.login === localStorage.getItem('login')) {
            return "float-right invisible group-hover:visible w-5 h-6";
        } else {
            return "hidden";
        }
    }

    function handleDeleteRecipe(event) {
        event.preventDefault();
        requestDeleteRecipe(recipe, onDeleteRecipe);
    }

    function requestDeleteRecipe(recipe, onDeleteRecipe) {
        apiUrl.delete(`/recipe/${recipe.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(r => {
            if (r.status === 200) {
                onDeleteRecipe(recipe.id);
            }
        })
    }
}

