import asyncHandler from "express-async-handler"; // Middleware handling exceptions inside async express routes

// Models

import User from "../models/userModel.js";

// Utils

import { generateToken } from "../utils/generateToken.js";
//import { notifyEmail } from "../utils/notifications.js";

//@description     Creates the user
//@route           POST /users/createUser
//@access          Public
const createUser = asyncHandler(async(req, res) => {
  const { name, lastName, email, password, role } = req.body;

  // Valite if user already exists on db
  const userExists = await User.findOne({email});

  if(userExists){
    res.status(400);
    throw new Error("Ese correo ya está registrado. Intenta iniciar sesión.")
  }

  // Create new user on db
  const user = await User.create({
    name,
    lastName,
    email,
    password,
    role
  })

  // User successfully created on db
  if(user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role), // Send token to frontend for uthenticate user to our backend
    })
    //notifyEmail(user.email)
  } else {
    res.status(400);
    throw new Error("Error ocurred while creating user")
  }
})

//@description     Auth the user
//@route           POST /users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user on db
  const user = await User.findOne({ email });

  // If user exists and password is correct
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else { // User not found or incorrect password
    res.status(400);
    throw new Error("El correo o contraseña son incorrectos.");
  }
});

//@description     Find a requested user
//@route           Get /users/:id
//@access          Public
const findUser = asyncHandler(async (req, res) => {
  User.findById(req.params.id)
        .populate({path:'comments', strictPopulate: false})
        .then(usuario => res.json(usuario))
        .catch(err => res.status(400).json('Error: ' + err));
});

export { createUser, authUser, findUser };
