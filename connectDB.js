import mongoose from "mongoose";
import { DB_URL } from "./config"


const connectDB = new Promise((resolve , reject) =>{
    mongoose.connect(DB_URL)
    .then ( resolve )
    .catch( reject )
})

export default connectDB;
