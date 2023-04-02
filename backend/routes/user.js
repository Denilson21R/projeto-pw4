import express from "express";
import {User} from "../model/index.js"
import bcrypt from "bcrypt"
import * as crypto from 'crypto'

const router = express.Router();

//create user
router.post("/", async (req, res) => {
    if(userFullParamsNotNull(req)){
        try{
            bcrypt.hash(req.body.password, 10, async function (err, hash) { //TODO: move hash function to model with sequelize
                const newUser = await createUser(req, hash)
                return res.status(201).json(userSafeData(newUser))
            })
        }catch (e) {
            return res.status(500).json(e)
        }
    }else{
        return res.status(422).json({error:"missing params"})
    }
})

//auth user
router.post("/auth", async (req, res)=>{
    if(userLoginParamsNotNull(req)){
        try{
            const user = await User.findOne({ where: { login: req.body.login }})
            if (userExist(user)){
                bcrypt.compare(req.body.password, user.password, function (err, data){
                    if(err){
                        return res.status(500).json(err)
                    }else if(data){
                        generateUserToken(user);
                        user.save()
                        return res.status(200).json({ token: user.token })
                    }else{
                        return res.status(401).json({ message: "Invalid credencial" })
                    }
                })
            }else{
                return res.status(401).json({ message: "User not exist" })
            }
        }catch (e) {
            return res.status(500).json(e)
        }
    }else{
        return res.status(422).json({ error:"missing params"})
    }
})

//get user by id
router.get("/:id", async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findByPk(userId, { attributes: {exclude: ['password', 'token']}}) //TODO: return qty recipe and ingredient created
        if(userExist(user)){
            return res.status(200).json(user)
        }else{
            return res.status(404).json({ message: "user not found"})
        }
    } catch (e) {
        return res.status(500).json(e)
    }
})

//update user data
router.put("/:id", verifyToken, async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id)
        if (userExist(user)) {
            if (userFullParamsNotNull(req)) {
                updateUserData(user, req);
                await user.save()
                return res.status(200).json(userSafeData(user))
            } else {
                return res.status(422).json({ error: "missing params"})
            }
        } else {
            return res.status(404).json({ message: "user not found"})
        }
    }catch (e) {
        return res.status(500).json(e)
    }
})

//delete user account
router.delete("/:id", verifyToken, async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id)
        if(userExist(user)){
            await user.destroy()
            return res.status(200).json({success: true})
        }else{
            return res.status(404).json({ message: "user not found"})
        }
    }catch (e) {
        return res.status(500).json(e)
    }
})

async function verifyToken(req, res, next) {
    const token = getTokenForAuthorizationHeader(req)
    const user = await User.findByPk(req.params.id)
    if (!token) {
        return res.status(401).json({ auth: false, message: "token not informed"})
    }else if (userExist(user)){
        if(user.token === token){
            next()
        }else{
            return res.status(401).json({ auth: false, message: "invalid token"})
        }
    }else{
        return res.status(404).json({ message: "user not found"})
    }
}

function getTokenForAuthorizationHeader(req) {
    return req.headers.authorization.split(' ')[1]; //ignore first data passed in header
}

function userExist(user) {
    return user != null && user instanceof User;
}

function userSafeData(user) {
    return {
        id: user.id,
        name: user.name,
        login: user.login
    };
}

function generateUserToken(user) {
    const buf = crypto.randomBytes(48)
    user.token = buf.toString("hex")
}

async function createUser(req, hash) {
    return await User.create({
        name: req.body.name,
        login: req.body.login,
        password: hash
    });
}

function updateUserData(user, req) {
    user.name = req.body.name
    user.login = req.body.login
    bcrypt.hash(req.body.password, 10, function(err, hash){
        user.password = hash
    })
}

function userFullParamsNotNull(req) {
    return req.body.name && req.body.login && req.body.password;
}

function userLoginParamsNotNull(req) {
    return req.body.login && req.body.password;
}

export default router;
