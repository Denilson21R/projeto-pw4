import {redirect} from "react-router-dom";

export default function Home(){
    let token = localStorage.getItem("token")
    if(token === null){
        redirect("/login")
    }
    return(
        <div className="text-center">
            <div className="font-bold text-3xl mt-3">Home</div>
            <div className="mt-3">
                <p>token: {token}</p>
            </div>
        </div>
    )
}
