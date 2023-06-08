import express from "express";
const router = express.Router();
import {Ingredient, User} from "../model/index.js"
import {verifyJWTToken} from "./middleware.js";
import {Op} from "sequelize";

//add ingredient
router.post("/", verifyJWTToken, async (req, res) => {
    if(!ingredientRequiredParamsNotNull(req))
        return res.status(422).json({ error: "missing params"})

    try {
        await createIngredient(req)
        return res.status(201).json({ success: "true"})
    }catch (e) {
        return res.status(500).json(e)
    }
})

//get ingredient by id
router.get("/:id", async (req, res) => {
    const ingredientId = req.params.id
    try{
        const ingredient = await Ingredient.findByPk(ingredientId, {
            include: User, attributes: {exclude: ['password', 'token', 'createdAt', 'updatedAt']}
        })
        if(!ingredientExists(ingredient))
            return res.status(404).json({ message: "ingredient not found"})

        return res.status(200).json(ingredient)
    }catch (e) {
        return res.status(500).json(e)
    }
})

//get all ingredients
router.get("/", async (req, res) => {
    try{
        const ingredients = await Ingredient.findAll({
            where: {
                visible: true
            },
            include: User, attributes: {exclude: ['password', 'token', 'createdAt', 'updatedAt']}
        })

        return res.status(200).json(ingredients)
    }catch (e) {
        return res.status(500).json(e)
    }
})

//update ingredient
router.put("/:id", verifyJWTToken, async (req, res) => {
    const ingredientId = req.params.id;
    try{
        let ingredient = await Ingredient.findByPk(ingredientId)
        if(!ingredientExists(ingredient))
            return res.status(404).json({ message: "ingredient not found"})

        if(!userRequestIsIngredientOwner(ingredient, req))
            return res.status(422).json({ error: "only the owner of the ingredient can update it"})

        if(!ingredientRequiredParamsNotNull(req))
            return res.status(422).json({ error: "missing params"})

        updateIngredientData(req, ingredient)
        ingredient = await ingredient.save()
        return res.status(200).json(ingredient)
    }catch (e){
        return res.status(500).json(e)
    }
})

//search ingredient by name
router.get("/search/name/:name", async (req, res) => {
    const nameSearch = req.params.name;
    try{
        const ingredients = await Ingredient.findAll({
            where: {
                name: {
                    [Op.like]: `%${nameSearch}%`
                },
                visible: true
            }
        })
        return res.status(200).json(ingredients)
    }catch (e){
        return res.status(500).json(e)
    }
})

function userRequestIsIngredientOwner(ingredient, req) {
    return ingredient.idUser === req.userId;
}

function updateIngredientData(req, ingredient) {
    ingredient.name = req.body.name
    ingredient.visible = req.body.visible
    ingredient.nutritionalInformation = req.body.nutritionalInformation
}

async function createIngredient(req) {
    return await Ingredient.create({
        name: req.body.name,
        visible: req.body.visible,
        nutritionalInformation: req.body.nutritionalInformation,
        idUser: req.userId
    })
}

function ingredientRequiredParamsNotNull(req){
    return req.body.name && req.body.visible != null;
}

function ingredientExists(ingredient) {
    return ingredient != null && ingredient instanceof Ingredient;
}

export default router;