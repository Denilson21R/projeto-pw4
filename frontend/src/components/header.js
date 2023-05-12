import HeaderButton from "./headerButton";
import {connect} from "react-redux";

function Header(props) {
    //TODO: maybe detach in two components, one for logged user and other for not logged user
    if(props.user && props.token){
        return ( //logged user
            <nav className="bg-gray-600">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <HeaderButton keyName="Receitas" href="/recipes"/>
                                    <HeaderButton keyName="Ingredientes" href="/ingredients"/>
                                    {/*TODO: add user dropdown here*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
    return ( //not logged user
        <nav className="bg-gray-600">
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
    );

}

const mapStateToProps = store =>(
    {
        user: store.user.user,
        token: store.user.token
    }
)

export default connect(mapStateToProps)(Header)