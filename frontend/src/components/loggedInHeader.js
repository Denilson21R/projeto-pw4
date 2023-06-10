import HeaderButton from "./headerButton";
import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";

export default function LoggedInHeader() {
    let login = localStorage.getItem("login")

    return (
        <nav className="bg-gray-600">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <HeaderButton keyName="Receitas" href="/recipes"/>
                                <HeaderButton keyName="Ingredientes" href="/ingredients"/>
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium inline-flex w-full justify-center bg-gray-600">
                                            {login.toUpperCase()}
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute text-center right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                <Menu.Item>
                                                    <p className="bg-gray-100 text-gray-900 block px-4 py-2 text-sm" onClick={handleLogoff}>
                                                        Sair
                                                    </p>
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
    function handleLogoff() {
        localStorage.clear()
        window.location.href = "/login"
    }
}