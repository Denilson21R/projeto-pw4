import {useLocation} from "react-router-dom";

function Header() {

    return (
        <nav className="bg-gray-600">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <a key="Receitas"
                                    href="/"
                                    className={getClass(useLocation().pathname, "/")}
                                    aria-current={undefined}>
                                    Receitas
                                </a>
                                <a key="Cadastrar-se"
                                   href="/signup"
                                   className={getClass(useLocation().pathname, "/signup")}
                                   aria-current={undefined}>
                                    Cadastrar-se
                                </a>
                                <a key="Login"
                                   href="/login"
                                   className={getClass(useLocation().pathname, "/login")}
                                   aria-current={undefined}>
                                    Login
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

function getClass(route, s) {
    if(route === s) {
        return "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium";
    }else{
        return "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";
    }
}

export default Header;