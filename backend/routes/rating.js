import express from "express";
import {Rating} from "../model/index.js"

const router = express.Router();

router.get("/", async (req, res) => {
    const [rating] = await Rating.findAll();
    res.json(rating);
})

export default router;