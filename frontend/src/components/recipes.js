import RecipeCard from "./recipeCard";

export default function Recipes() {
    return (
        <div className="container m-5 px-5">
            <div className="text-3xl">Receitas</div>
            <div className="columns-4 mt-4">
                <div className="card">
                    <RecipeCard/>
                </div>
                <div className="card">
                    <RecipeCard/>
                </div>
                <div>
                    <RecipeCard/>
                </div>
                <div>
                    <RecipeCard/>
                </div>
            </div>
        </div>
    )
}