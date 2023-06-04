import {Link, useLocation} from "react-router-dom";

export default function HeaderButton({keyName, href, ariaCurrent = undefined}){
    return(
        <>
            <Link to={href} className={getClass(useLocation().pathname, href)} aria-current={ariaCurrent}>
                {keyName}
            </Link>
        </>
    )
}

function getClass(route, s) {
    if((route === s || route === "/") && s === "/recipes"){
        return "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium";
    }else{
        return "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";
    }
}