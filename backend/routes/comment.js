import express from "express";
import {reactionUser} from "../model/index.js"

const router = express.Router();

router.get("/", async (req, res) => {
    const [comments] = await reactionUser.findAll({where: {type: 'COMMENT'}});
    res.json(comments);
})

export default router;