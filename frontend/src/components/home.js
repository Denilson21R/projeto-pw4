import {redirect} from "react-router-dom";

export default function Home(){
    let token = localStorage.getItem("token")
    if(token === null){
        redirect("/login")
    }
    return(
        <>
            <div>Home</div>
            <div>
                <p>token: {token}</p>
            </div>
        </>
    )
}
