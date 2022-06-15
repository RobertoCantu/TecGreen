import express from "express";
import fs from "fs";
import path from "path";
import { checkAuth, checkUser, checkAdmin } from "../middlewares/auth.js"

// Models
import Plant from "../models/plantModel.js";
import Comment from "../models/commentModel.js";

// Controllers
import { uploadPlant } from "../controllers/uploadController.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname('')); 

//router.use(checkAuth);

// Endpoints

// Get all Plants
router.route('/').get((req, res) => {
    Plant.find()
        .select({ picture: 0 })
        .then(plants => res.json(plants))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Create a Plant
router.route('/').post(checkAdmin, uploadPlant, (req, res) => {
    Plant.create({
        commonName: req.body.commonName,
        scientificName: req.body.scientificName,
        description: req.body.description,
        picture: {
            data: fs.readFileSync(path.join(__dirname + '/pictures/' + req.file.filename)),
            contentType: 'image/png'
        }
    })
        .then(() => res.json("Planta creada."))
        .catch(err => res.status(400).json('Error: ' + err));

        fs.unlink(path.join(__dirname + '/pictures/' + req.file.filename), (err) => {
            if (err) throw err;
        });
});

// Get a Plant
router.route('/:id').get((req, res) => {
    Plant.findById(req.params.id)
        // .select({ picture: 0 })
        .populate('comments')
        .then(plant => res.json(plant))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Delete a Plant
router.route('/:id').delete((req, res) => {
    Comment.deleteMany({ plant: req.params.id })
        .then(()=>{
            Plant.findByIdAndDelete(req.params.id)
                .then(() => res.json('Planta borrada'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update a Plant
router.route('/:id').post(checkAdmin, uploadPlant, (req, res) => {
    Plant.findById(req.params.id)
        .select({ picture: 0 })
        .then(plant => {
            plant.commonName = req.body.commonName != null ? req.body.commonName : plant.commonName;
            plant.scientificName = req.body.scientificName != null ? req.body.scientificName : plant.scientificName;
            plant.description = req.body.description != null ? req.body.description : plant.description;
            if (req.file) {
                var plantData = fs.readFileSync(path.join(__dirname + '/pictures/' + req.file.filename));
                plant.picture.data = plantData;
                fs.unlink(path.join(__dirname + '/pictures/' + req.file.filename), (err) => {
                    if (err) throw err;
                });
            }
            plant.save()
                .then(() => res.json('Planta actualizada'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;