import {useParams} from "react-router-dom";

export default function Ingredient(){
    let { ingredientId } = useParams();

    if(ingredientId) {
        //TODO: improve design
        return (
            <div className="container mx-10 mt-12">
                {"Ingrediente de id "+ingredientId}
            </div>
        )
    } else {
        //TODO: improve design
        return (
            <>
                Ingredient not found
            </>
        )
    }
}