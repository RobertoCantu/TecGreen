import express from "express";
import fs from "fs";
import path, { dirname } from "path";
import { checkAuth, checkUser, checkAdmin } from "../middlewares/auth.js"

// Models
import Plant from "../models/plantModel.js";
import Comment from "../models/commentModel.js";

// Controllers
import { uploadPlant } from "../controllers/uploadController.js";

const router = express.Router();
const __dirname = path.resolve();

//router.use(checkAuth);

// Endpoints

router.route('/').get((req, res) => {
    Plant.find()
        .then(plants => res.json(plants))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post(checkAdmin, uploadPlant, (req, res) => {
    Plant.create({
        commonName: req.body.commonName,
        scientificName: req.body.scientificName,
        flowers: Boolean(req.body.flowers),
        seeds: Boolean(req.body.seeds),
        picture: {
            data: fs.readFileSync(path.join(__dirname + '/pictures/' + req.file.filename)),
            contentType: 'image/png'
        }
    })
        .then(() => res.json("Planta creada."))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Plant.findById(req.params.id)
        .populate('comments')
        .then(plant => res.json(plant))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Comment.deleteMany({ plant: req.params.id })
        .then()
    Plant.findByIdAndDelete(req.params.id)
        .then(() => res.json('Planta borrada'))
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;