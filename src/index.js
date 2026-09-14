import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import dotenv from "dotenv";
import express from "express";

dotenv.config({
    path: './.env'
})
const app = express()

    ; (async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
            app.on("error", (error) => {
                console.log("ERROR: ", error);
                throw error;
            });

            app.listen(process.env.PORT, () => {
                console.log(`App is listen at port: ${process.env.PORT}`);
            });
        } catch (error) {
            console.error("Error: ", error);
            throw error;
        }
    })();