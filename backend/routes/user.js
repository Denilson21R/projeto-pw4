import express from "express";
import {User} from "../model/index.js"
import bcrypt from "bcrypt"
import * as crypto from 'crypto'

const router = express.Router();

//create user
router.post("/", async (req, res) => {
    if(userSignUpParamsNotNull(req)){
        try{
            bcrypt.hash(req.body.password, 10, async function (err, hash) {
                const newUser = await createUser(req, hash)
                res.status(201).json(newUser)
            })
        }catch (e) {
            res.status(500) //server error
        }
    }else{
        res.status(422).json({"error":"missing params"})
    }
})

//auth user
router.post("/auth", async (req, res)=>{
    if(userLoginParamsNotNull(req)){
        try{
            const user = await User.findOne({ where: { login: req.body.login }})
            if (!userExist(user)) return res.status(401).json({ msg: "User not exist" }) //if user not exist than return status 401
            bcrypt.compare(req.body.password, user.password, function (err, data){ //verify password
                if(err){
                    res.status(500).json(err)
                }else if(data){
                    crypto.randomBytes(48, function (err, buf){
                        user.token = buf.toString("hex")
                        user.save()
                        return res.status(200).json({ token: user.token }) //if success return token
                    })
                }else{
                    return res.status(401).json({ msg: "Invalid credencial" }) //wrong password
                }
            })
        }catch (e) {
            res.status(500) //server error
        }
    }else{
        res.status(422).json({"error":"missing params"})
    }
})

//get user by id
router.get("/:id", async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findByPk(userId)
        if(userExist(user)){
            return res.status(200).json(user) //success
        }else{
            return res.status(404) //user not found
        }
    } catch (e) {
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

function userSignUpParamsNotNull(req) {
    return req.body.name && req.body.login && req.body.password;
}

function userLoginParamsNotNull(req) {
    return req.body.login && req.body.password;
}

function userExist(user) {
    return user != null && user instanceof User;
}

//TODO: implement remaining endpoints with jwt auth

export default router;
