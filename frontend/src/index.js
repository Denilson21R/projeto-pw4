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
import {getRecipesLoader} from "./loaders/recipes";
import {getIngredientsLoader} from "./loaders/ingredients";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "recipes", element: <Recipes />, loader: getRecipesLoader},
            {path: "recipe",
                children: [
                    {path: ":recipeId", element: <Recipe />},
                    {path: "new", element: <NewRecipe />}
                ]
            },
            {path: "ingredients", element: <Ingredients />, loader: getIngredientsLoader},
            {
                path: "ingredient",
                children: [
                    {path: ":ingredientId", element: <Ingredient />},
                    {path: "new", element: <NewIngredient/>},
                ]
            },
            {path: "login", element: <Login />},
            {path: "signup", element: <Signup />},
            {path: "home", element: <Home />}
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
