// require('dotenv').config({path: './.env'})
import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})


import connectDB from './db/index.js';






connectDB();

















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