import express from "express";
import { checkAuth } from "../middlewares/auth.js"
import { checkUser } from "../middlewares/auth.js";

// Models

import Comment from "../models/commentModel.js";
import Plant from "../models/plantModel.js"

const router = express.Router();

//router.use(checkAuth);

// Endpoints

router.route('/').get((req, res) => {
    Comment.find()
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    Comment.findOne({ user: req.body.user, plant: req.body.plant })
        .then(comment => {
            if (comment != null) {
                res.status(400).json('Este usuario ya tiene un comentario para esta planta')
            } else {
                Comment.create({
                    user: req.body.user,
                    plant: req.body.plant,
                    content: req.body.content
                })
                    .then(newComment => {
                        return Plant.findById(req.body.plant)
                            .then(plant => {
                                plant.comments.push(newComment.id);
                                return plant.save();
                            })
                    })
                    .then(() => res.json("Comment creado."))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Comment.findById(req.params.id)
        .populate('user', 'plant')
        .then(comment => res.json(comment))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Plant.findOne({ comments: req.params.id })
        .then(plant => {
            plant.comments.pull(req.params.id)
            return plant.save();
        })
        .catch(err => res.status(400).json('Error: ' + err));
    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Comment borrado'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
    Comment.findById(req.params.id)
        .then(comment => {
            comment.content = req.body.content;
            comment.save()
                .then(() => res.json('Comment actualizado'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;