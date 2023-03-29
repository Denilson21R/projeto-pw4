import express from "express";
const router = express.Router();
import {Ingredient} from "../model/index.js"

router.post("/", async (req, res) => {
    const [ingredients] = await Ingredient.findAll();
    res.json(ingredients);
})

//TODO: implement remaining endpoints

export default router;