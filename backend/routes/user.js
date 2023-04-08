import express from "express";
import {User} from "../model/index.js"
import bcrypt from "bcrypt"
import * as crypto from 'crypto' //TODO: switch to no deprecated lib crypto-js and declare all used libs in readme
import {verifyJWTToken} from './middleware.js'

const router = express.Router();

//create user
router.post("/", async (req, res) => {
    if (!userRequiredParamsNotNull(req))
        return res.status(422).json({ error: "missing params"})

    if (await userLoginAlreadyExists(req))
        return res.status(422).json({ error: "user login already exists"})

    try{
        await createUser(req)
        return res.status(201).json({ success: "true"})
    }catch (e) {
        return res.status(500).json(e)
    }
})

//auth user
router.post("/auth", async (req, res)=>{
    if(!userRequiredParamsForLoginNotNull(req))
        return res.status(422).json({ error: "missing params"})

    try{
        const user = await User.findOne({ where: { login: req.body.login }})
        if (!userExist(user))
            return res.status(401).json({ message: "User not found" })

        bcrypt.compare(req.body.password, user.password, function (err, data){
            if(data){
                generateUserToken(user);
                user.save()
                return res.status(200).json({ token: user.token })
            }else{
                return res.status(401).json({ message: "Invalid credencial" })
            }
        })
    }catch (e) {
        return res.status(500).json(e)
    }
})

//get user by id
router.get("/:id", async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findByPk(userId, { attributes: {exclude: ['password', 'token']}})
        if(!userExist(user))
            return res.status(404).json({ message: "user not found"})

        return res.status(200).json(user)
    } catch (e) {
        return res.status(500).json(e)
    }
})

//update user data
router.put("/:id", verifyJWTToken, async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id)
        if (!userExist(user))
            return res.status(404).json({ message: "user not found"})

        if (!userRequiredParamsNotNull(req))
            return res.status(422).json({ error: "missing params"})

        updateUserData(user, req);
        await user.save()
        return res.status(200).json(userSafeData(user))
    }catch (e) {
        return res.status(500).json(e)
    }
})

//delete user account
router.delete("/:id", verifyJWTToken, async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id)
        if(!userExist(user))
            return res.status(404).json({ message: "user not found"})

        await user.destroy()
        return res.status(200).json({success: true})
    }catch (e) {
        return res.status(500).json(e)
    }
})

function userExist(user) {
    return user != null && user instanceof User;
}

async function userLoginAlreadyExists(req) {
    const user = await User.findOne({where: {login: req.body.login}})
    return userExist(user)
}

function userSafeData(user) {
    return {
        id: user.id,
        name: user.name,
        login: user.login,
        biography: user.biography
    };
}

function generateUserToken(user) {
    const buf = crypto.randomBytes(48)
    user.token = buf.toString("hex")
}

async function createUser(req) {
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
        return await User.create({
            name: req.body.name,
            login: req.body.login,
            password: hash
        });
    })
}

function updateUserData(user, req) {
    user.name = req.body.name
    user.login = req.body.login
    user.biography = req.body.biography
    bcrypt.hash(req.body.password, 10, function(err, hash){
        user.password = hash
    })
}

function userRequiredParamsNotNull(req) {
    return req.body.name && req.body.login && req.body.password;
}

function userRequiredParamsForLoginNotNull(req) {
    return req.body.login && req.body.password;
}

export default router;
