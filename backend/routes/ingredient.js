import express from "express";
const router = express.Router();
import ingredient from "../model/index.js"

router.get("/", (req, res) =>{
    const ingredients = ingredient.findAll();
    res.json(ingredients);
})

export default router;