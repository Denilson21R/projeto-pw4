import {User} from "../model/index.js";

export async function verifyJWTToken(req, res, next) {
    const token = getTokenForAuthorizationHeader(req)
    const user = await User.findByPk(req.params.id)
    if (!token)
        return res.status(401).json({ auth: false, message: "token not informed"})

    if (!userExist(user))
        return res.status(404).json({ message: "user not found"})

    if(user.token === token){
        next()
    }else{
        return res.status(401).json({ auth: false, message: "invalid token"})
    }
}

function getTokenForAuthorizationHeader(req) {
    return req.headers.authorization.split(' ')[1]; //ignore first data passed in header
}

function userExist(user) {
    return user != null && user instanceof User;
}