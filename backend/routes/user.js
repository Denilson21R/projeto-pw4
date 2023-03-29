import express from "express";
const router = express.Router();
import {User} from "../model/index.js"
import bcrypt from "bcrypt"



router.post("/", async (req, res) => {
    try{
        if(userParamsNotNull(req)){
            bcrypt.hash(req.body.password, 10, async function (err, hash) {
                const newUser = await createUser(req, hash)
                res.status(201).json(newUser)
            })
        }else{
            res.status(422).json({"error":"missing params"})
        }
    }catch (e) {
        res.status(500) //server error
    }
})

async function createUser(req, hash) {
    return await User.create({
        name: req.body.name,
        login: req.body.login,
        password: hash
    });
}

function userParamsNotNull(req) {
    return req.body.name && req.body.login && req.body.password;
}

//TODO: implement remaining endpoints with jwt auth

export default router;
