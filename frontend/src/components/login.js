import {apiUrl} from "../utils/config";

export default function Login() {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="text-3xl font-bold mt-2 sm:mx-auto">Login</div>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="login" className="block text-sm font-medium leading-6 text-gray-900">
                            Login
                        </label>
                        <div className="mt-2">
                            <input
                                id="login"
                                name="login"
                                type="text"
                                autoComplete="login"
                                required
                                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Senha
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-gray-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function handleLogin(event) {
    event.preventDefault()
    apiUrl.post("/user/auth", {
        login: event.target.login.value,
        password: event.target.password.value
    }).then(r => {
        if(r.status === 200) {
            saveUserDataInLocalStorage(r, event);
            window.location.href = "/recipes"
        }
    })
}

function saveUserDataInLocalStorage(r, event) {
    localStorage.setItem("token", r.data.token)
    localStorage.setItem("login", event.target.login.value)
}
