import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

// Middlewares

import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import plantRoutes from "./routes/plantRoutes.js"
import commentRoutes from "./routes/commentRoutes.js";

// Environment variables

const PORT = process.env.PORT;
const URI = process.env.DB_URI
const hostname = 'localhost';

const app = express();

app.use(express.json()); // to accept json data
app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", 'DELETE', "PUT"],
    credentials: true,
}));

// app.use(notFound);
app.use(errorHandler);

app.use('/users', userRoutes);
app.use('/plants', plantRoutes);
app.use('/comments', commentRoutes);

mongoose
    .connect(URI)
    .then(() => {
        console.log('Conexion a MongoDB exitosa');
    })


app.listen(PORT, hostname, () => {
    console.log(`Corriendo en http://${hostname}:${PORT}/`);
});