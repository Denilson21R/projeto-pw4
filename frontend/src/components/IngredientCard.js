import {Link} from "react-router-dom";

export default function IngredientCard({ingredient}) {
    return (
        <Link to={`/ingredient/${ingredient.id}`}>
            <figure className="rounded-2xl p-4 m-4 bg-gray-500 hover:bg-gray-600 group">
                <div className="p-2 text-center space-y-4">
                    <div className={getClasses()}>
                        <svg onClick={handleUpdateIngredient} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                        </svg>
                    </div>
                    <blockquote>
                        <p className="text-xl font-bold uppercase">
                            {ingredient.name}
                        </p>
                    </blockquote>
                </div>
            </figure>
        </Link>
    );

    function handleUpdateIngredient(event) {
        event.preventDefault()
        window.location.href = `/ingredient/edit/${ingredient.id}`;
    }

    function getClasses() {
        if(ingredient.User.login === localStorage.getItem('login')) {
            return "float-right hidden group-hover:block w-5 h-6";
        } else {
            return "hidden";
        }
    }
}