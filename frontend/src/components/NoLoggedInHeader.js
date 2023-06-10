import HeaderButton from "./headerButton";

export default function NoLoggedInHeader() {
    return (
        <nav className="bg-gray-600 bg">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <HeaderButton keyName="Receitas" href="/recipes"/>
                                <HeaderButton keyName="Cadastrar-se" href="/signup"/>
                                <HeaderButton keyName="Login" href="/login"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}