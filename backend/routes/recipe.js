import express from "express";
const router = express.Router();
import recipe from "../model/index.js"

router.get("/", (req, res) =>{
    const recipes = recipe.findAll();
    res.json(recipes);
})

export default router;