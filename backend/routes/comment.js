import express from "express";
import {Comment} from "../model/index.js"

const router = express.Router();

router.get("/", async (req, res) => {
    const [comments] = await Comment.findAll();
    res.json(comments);
})

export default router;