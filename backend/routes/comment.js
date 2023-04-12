import express from "express";
import {Comment, User, Recipe} from "../model/index.js"
import {verifyJWTToken} from "./middleware.js";

const router = express.Router();

//get comments by user
router.get("/user/:id", async (req, res) => {
    const userId = req.params.id
    try{
        const comments = await Comment.findAll({
            where: {
                UserId: userId
            },
            include: [
                {model: Recipe, attributes: {exclude: ['idUser']}}
            ],
            attributes:{exclude: ['UserId', 'RecipeId']}
        })
        return res.status(200).json(comments)
    }catch (e) {
        return res.status(500).json(e.toString())
    }
})

//get comments by recipe
router.get("/recipe/:id", async(req, res) => {
    const recipeId = req.params.id
    try{
        const comments = await Comment.findAll({
            where: {
                RecipeId: recipeId
            },
            include: [
                {model: User, attributes: {exclude: ['password', 'token']}}
            ],
            attributes:{exclude: ['UserId', 'RecipeId']}
        })
        return res.status(200).json(comments)
    }catch (e) {
        return res.status(500).json(e)
    }
})

//add comment
router.post("/", verifyJWTToken, async(req, res) => { //each user can comment only once on each recipe
    if(!requiredParamsToAddComment(req))
        return res.status(422).json({ error: "missing params"})

    try {
        await createComment(req)
        return res.status(201).json({ success: "true"})
    }catch (e) {
        return res.status(500).json(e)
    }
})

//update comment
router.put("/:id", verifyJWTToken, async(req, res) => {
    const commentId = req.params.id
    try{
        let comment = await Comment.findByPk(commentId)

        if(!commentExist(comment))
            return res.status(404).json({ message: "comment not found"})

        if(!userRequestIsCommentOwner(comment, req))
            return res.status(422).json({ error: "only the owner of the comment can update it"})

        if(!requiredParamsToUpdateComment(req))
            return res.status(422).json({error: "missing params"})

        updateComment(comment, req)
        comment = await comment.save()
        return res.status(200).json(comment)
    }catch (e) {
        return res.status(500).json(e)
    }
})

//delete comment
router.delete("/:id", verifyJWTToken, async(req, res) => {
    const commentId = req.params.id
    try {
        let comment = await Comment.findByPk(commentId)

        if (!commentExist(comment))
            return res.status(404).json({message: "comment not found"})

        if (!userRequestIsCommentOwner(comment, req))
            return res.status(422).json({error: "only the owner of the comment can delete it"})

        await comment.destroy()
        return res.status(200).json({success: true})
    }catch (e) {
        return res.status(500).json(e)
    }
})

function commentExist(comment){
    return comment != null && comment instanceof Comment
}

function requiredParamsToAddComment(req) {
    return req.body.text && req.body.recipeId
}

async function createComment(req) {
    return await Comment.create({
        text: req.body.text,
        UserId: req.userId,
        RecipeId: req.body.recipeId
    })
}

function requiredParamsToUpdateComment(req) {
    return req.body.text
}

function userRequestIsCommentOwner(comment, req){
    return comment.UserId === req.userId
}

function updateComment(comment, req){
    comment.text = req.body.text
}

export default router;