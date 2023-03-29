import express from "express";
const router = express.Router();
import {User} from "../model/index.js"

router.get("/", async (req, res) => {
    const [users] = await User.findAll()
    res.json(users);
})

//TODO: implement remaining endpoints with jwt auth

export default router;