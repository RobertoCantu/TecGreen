import express from "express";
import fs from "fs";
import path from "path";
import { checkAuth, checkUser, checkAdmin } from "../middlewares/auth.js";

//Models
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";

// Controllers

import {
  authUser,
  createUser,
  findUser,
} from "../controllers/userController.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(''));

// Endpoints

router.route('/createUser').post(createUser);
router.route('/login').post(authUser);
router.route('/:id').get(findUser);

// Get all Users
router.route('/').get((req, res) => {
  User.find()
    .then(usuarios => res.json(usuarios))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a User
router.route('/:id').delete((req, res) => {
  /*
  Comment.deleteMany({ user: req.params.id})
    .then(() =>{
      User.findByIdAndDelete(req.params.id)
        .then(() => res.json('Usuario borrado'))
        .catch(err => res.status(400).json('Errar: ' + err));
    })*/
  Comment.deleteMany({ user: req.params.id });
  User.findByIdAndDelete(req.params.id)
    .then(usuario => res.json('User borrado'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update a User
router.route('/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(usuario => {
      usuario.email = req.body.email;
      usuario.password = req.body.password;
      usuario.name = req.body.name;
      usuario.lastName = req.body.lastName;

      usuario.save()
        .then(() => res.json('User actualizado'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


export default router;