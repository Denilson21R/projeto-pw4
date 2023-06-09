import express from "express";
const router = express.Router();
import {Ingredient, Recipe, User} from "../model/index.js"
import {Op} from "sequelize";
import {verifyJWTToken} from "./middleware.js";

const DEFAULT_PAGE_QTY = 30;
//TODO: implement pagination in frontend

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
        const recipes = await Recipe.findAndCountAll({offset: offset, limit: limit, include: [{model: User, attributes: {exclude: ['password', 'token', 'createdAt', 'updatedAt']}}]})
        return res.status(200).json(recipes)
    }catch (e){
        return res.status(500).json(e)
    }
})

//search recipe by name
router.get("/search/name/:name", async(req, res) => {
    const nameSearch = req.params.name;
    try {
        const recipes = await Recipe.findAll({
            where: {
                name: {
                    [Op.like]: `%${nameSearch}%`
                }
            },
            include: User, attributes: {exclude: ['password', 'token', 'createdAt', 'updatedAt']}
        })
        return res.status(200).json(recipes)
    }catch (e) {
        return res.status(500).json(e)
    }
})

//get recipes by user
router.get("/user/:id", async(req, res) => {
    const userId = req.params.id
    try{
        const recipes = Recipe.findAll({
            where: {
                idUser: userId
            }
        })
        return res.status(200).json(recipes)
    }catch (e) {
        return res.status(500).json(e)
    }
})

//add a recipe
router.post("/", verifyJWTToken, async(req, res) => {
    if(!requiredParamsRecipeNotNull(req))
        return res.status(422).json({ error: "missing params"})

    try{
        const recipe = await createRecipe(req)
        await recipe.addIngredients(req.body.ingredients)
        return res.status(201).json({ success: "true"})
    }catch (e) {
        return res.status(500).json(e)
    }
})


//update recipe
router.put("/:id", verifyJWTToken, async(req, res) => {
    const recipeId = req.params.id
    try{
        let recipe = await Recipe.findByPk(recipeId)
        if(!recipeExist(recipe))
            return res.status(404).json({ message: "recipe not found"})

        if(!userRequestIsRecipeOwner(recipe, req))
            return res.status(422).json({ error: "only the owner of the ingredient can update it"})

        if(!requiredParamsRecipeNotNull)
            return res.status(422).json({ error: "missing params"})

        updateRecipeData(recipe, req)
        recipe = await recipe.save()
        return res.status(200).json(recipe)
    }catch (e) {
        return res.status(500).json(e)
    }
})

//delete recipe
router.delete("/:id", verifyJWTToken, async(req, res) => {
    const recipeId = req.params.id
    try{
        let recipe = await Recipe.findByPk(recipeId)
        if(!recipeExist(recipe))
            return res.status(404).json({ message: "recipe not found"})

        if(!userRequestIsRecipeOwner(recipe, req))
            return res.status(422).json({ error: "only the owner of the ingredient can delete it"})

        await recipe.destroy()
        return res.status(200).json({success: true})
    }catch (e) {
        return res.status(500).json(e)
    }
})

function recipeExist(recipe){
    return recipe != null && recipe instanceof Recipe
}

function updateRecipeData(recipe, req) {
    recipe.name = req.body.name
    recipe.description = req.body.description
    recipe.preparationTimeMinutes = req.body.preparationTimeMinutes
    recipe.preparationMode = req.body.preparationMode
    recipe.nutritionalInformation = req.body.nutritionalInformation
    recipe.difficulty = req.body.difficulty
    recipe.setIngredients(req.body.ingredients)
}

function userRequestIsRecipeOwner(recipe, req) {
    return req.userId === recipe.idUser;
}

async function createRecipe(req) {
    return await Recipe.create({
        name: req.body.name,
        description: req.body.description,
        preparationTimeMinutes: req.body.preparationTimeMinutes,
        preparationMode: req.body.preparationMode,
        nutritionalInformation: req.body.nutritionalInformation,
        difficulty: req.body.difficulty,
        idUser: req.userId,
    })
}

function requiredParamsRecipeNotNull(req) {
    return req.body.ingredients && req.body.name && req.body.description && req.body.preparationTimeMinutes && req.body.preparationMode && req.body.difficulty && req.body.preparationTimeMinutes > 0
    && (req.body.difficulty === "VERY EASY" || req.body.difficulty === "EASY" || req.body.difficulty === "NORMAL" || req.body.difficulty === "HARD" || req.body.difficulty === "VERY HARD")
}

function getPagination(req){
    const { page, size } = req.query;
    const limit = size ? +size : DEFAULT_PAGE_QTY; //size of records is 5, but can be passed in request
    const offset = page ? page * limit : 0; //page fo records 0 is first page, but can be passed in request

    return { limit, offset };
}


export default router;