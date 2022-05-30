import express from "express";
import { checkAuth } from "../middlewares/auth.js"
import { checkUser } from "../middlewares/auth.js";

// Models

import Plant from "../models/plantModel.js";
import Comment from "../models/commentModel.js";

const router = express.Router();

//router.use(checkAuth);

// Endpoints

router.route('/').get((req, res) => {
    Plant.find()
        .then(plants => res.json(plants))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    Plant.create({
        commonName: req.body.commonName,
        scientificName: req.body.scientificName,
        flowers: Boolean(req.body.flowers),
        seeds: Boolean(req.body.seeds)
    })
        .then(() => res.json("Planta creada."))
});

router.route('/:id').get((req, res) => {
    Plant.findById(req.params.id)
        .populate('comments')
        .then(plant => res.json(plant))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Comment.deleteMany({ plant: req.params.id })
    Plant.findByIdAndDelete(req.params.id)
        .then(() => res.json('Planta borrada'))
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;