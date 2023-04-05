import express from "express";
import {reactionUser} from "../model/index.js"

const router = express.Router();

router.get("/", async (req, res) => {
    const [likes] = await reactionUser.findAll({where: {type: 'LIKE'}});
    res.json(likes);
})

export default router;