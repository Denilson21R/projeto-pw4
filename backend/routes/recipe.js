import express from "express";
const router = express.Router();
import {Ingredient, Recipe, User} from "../model/index.js"

const DEFAULT_PAGE_QTY = 5;

//get recipe by id
router.get("/:id", async (req, res) => {
    const recipeId = req.params.id
    try{
        const recipe = await Recipe.findByPk(recipeId, {
            include: [
                {model: Ingredient, attributes:{exclude: ['visible']}},
                {model: User, attributes: {exclude: ['password', 'token']}}
            ]
        })
        if(!recipeExist(recipe))
            return res.status(404).json({message: "recipe not found"})

        return res.status(200).json(recipe)
    }catch (e) {
        return res.status(500).json(e)
    }
})

//get recipes with pagination
router.get("/", async(req, res) => {
    try{
        const { limit, offset } = getPagination(req); //can pass page and size parameters, default is page 0 and size 5
        const recipes = await Recipe.findAndCountAll({offset: offset, limit: limit})
        return res.status(200).json(recipes)
    }catch (e){
        return res.status(500).json(e)
    }
})


function getPagination(req){
    const { page, size } = req.query;
    const limit = size ? +size : DEFAULT_PAGE_QTY; //size of records is 5, but can be passed in request
    const offset = page ? page * limit : 0; //page fo records 0 is first page, but can be passed in request

    return { limit, offset };
}

function recipeExist(recipe){
    return recipe != null && recipe instanceof Recipe
}

export default router;