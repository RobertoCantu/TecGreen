import { verifyToken } from "../utils/generateToken.js";
import Comment from "../models/commentModel.js";

export const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const tokenData = await verifyToken(token);
        if (tokenData.id){
            next();
        } else {
            res.status(409);
            res.send({error: 'No tienes acceso a este recurso'})   
        }
    }
    catch (err){
        res.send({error: 'No tienes acceso a este recurso'})  
    }
}

export const checkUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const tokenData = await verifyToken(token);
        const commentData = await Comment.findById(req.params.id);

        if (commentData.user == tokenData.id){
            next();
        } else {
            res.status(409);
            res.send({error: 'No tienes acceso a este recurso'})   
        }
    }
    catch (err){
        res.send({error: 'No tienes acceso a este recurso'})  
    }
}
