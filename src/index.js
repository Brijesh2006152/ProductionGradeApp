import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


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

            app.use(cors({
                origin: process.env.CORS_ORIGIN,
                credentials: true
            }))
            app.use(express.json({limit: "16kb"}))
            app.use(express.urlencoded({extended: true, limit: "16kb"}))
            app.use(express.static("public"))
            app.use(cookieParser)
        } catch (error) {
            console.error("Error: ", error);
            throw error;
        }
    })();