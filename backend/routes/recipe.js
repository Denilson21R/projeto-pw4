import express from "express";
const router = express.Router();
import {Recipe} from "../model/index.js"

router.get("/", async (req, res) => {
    const [recipes] = await Recipe.findAll();
    res.json(recipes);
})

//TODO: implement remaining endpoints

export default router;