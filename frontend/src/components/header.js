import NoLoggedInHeader from "./NoLoggedInHeader";
import LoggedInHeader from "./loggedInHeader";

export default function Header() {
    let token = localStorage.getItem("token")

    return (
        <>
            {token === null ? ( // if not logged in
                <NoLoggedInHeader/>
            ):( // if logged in
                <LoggedInHeader/>
            )}
        </>
    )
}