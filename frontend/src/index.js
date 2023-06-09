import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Recipes from "./components/recipes";
import Recipe from "./components/recipe";
import NewRecipe from "./components/newRecipe";
import Ingredients from "./components/ingredients";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/home";
import NewIngredient from "./components/newIngredient";
import Ingredient from "./components/ingredient";
import {getRecipeLoader, getRecipesLoader, getUpdateRecipeLoader} from "./loaders/recipes";
import {getIngredientLoader, getIngredientsLoader} from "./loaders/ingredients";
import UpdateRecipe from "./components/updateRecipe";
import UpdateIngredient from "./components/updateIngredient";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <Recipes />, loader: getRecipesLoader},
            {path: "recipes", element: <Recipes />, loader: getRecipesLoader},
            {path: "recipe",
                children: [
                    {path: ":recipeId", element: <Recipe />, loader: (params) => getRecipeLoader(params.params.recipeId)},
                    {path: "new", element: <NewRecipe />, loader: getIngredientsLoader},
                    {path: "edit/:recipeId", element: <UpdateRecipe />, loader: (params) => getUpdateRecipeLoader(params.params.recipeId)}
                ]
            },
            {path: "ingredients", element: <Ingredients />, loader: getIngredientsLoader},
            {
                path: "ingredient",
                children: [
                    {path: ":ingredientId", element: <Ingredient />, loader: (params) => getIngredientLoader(params.params.ingredientId)},
                    {path: "new", element: <NewIngredient/>},
                    {path: "edit/:ingredientId", element: <UpdateIngredient/>, loader: (params) => getIngredientLoader(params.params.ingredientId)}
                ]
            },
            {path: "login", element: <Login />},
            {path: "signup", element: <Signup />},
            {path: "home", element: <Home />},
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
