import {useLocation} from "react-router-dom";

export default function HeaderButton({keyName, href, ariaCurrent = undefined}){
    return(
        <>
            <a key={keyName}
                href={href}
                className={getClass(useLocation().pathname, href)}
                aria-current={ariaCurrent}>
                {keyName}
            </a>
        </>
    )
}

function getClass(route, s) {
    if(route === s) {
        return "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium";
    }else{
        return "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";
    }
}