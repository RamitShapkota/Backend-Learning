// require('dotenv').config({path: './.env'})
import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})


import connectDB from './db/index.js';
import { app } from "./app.js";

const port = process.env.PORT || 8000;




connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("EXPRESS SERVER ERROR :",error);
    })

    app.listen(port , () => {
        console.log(`server is running at port : ${port}`);
    } )
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ",err);
})

















/* //First approach of connecting data base

import express from "express";
const app = express();

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error", (error) => {
            console.log("ERROR: ", error);
        })

        app.listen(process.env.PORT, () => {
            console.log(`App ia listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error);
        throw error;
    }
})() */