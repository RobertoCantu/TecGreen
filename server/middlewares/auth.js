import { verifyToken } from "../utils/generateToken.js";
import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";

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

export const checkAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const tokenData = await verifyToken(token);
        const userData = await User.findById(tokenData.id);
        if (userData.role == 'admin') {
            next();
        } else {
            res
                .status(409)
                .send({error: 'No tienes acceso a este recurso'})   
        }
    } catch (err) {
        res.send({error: err})
    }
}