import express from "express";
const router = express.Router();
import user from "../model/index.js"

router.get("/", (req, res) =>{
    const users = user.findAll();
    res.json(users);
})

export default router;