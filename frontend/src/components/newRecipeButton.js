import {Link} from "react-router-dom";

export default function NewRecipeButton() {
    const isUserLoggedIn = localStorage.getItem("token") !== null

    if(!isUserLoggedIn) {
        return (<></>) // return empty fragment if user is not logged in
    }else{
        return (
            <div className="mt-6 ml-8">
                <Link to="/recipe/new" className="flex w-48 justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Nova receita
                </Link>
            </div>
        )
    }
}