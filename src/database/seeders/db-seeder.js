import { dbConection } from "../db.js";
import mongoose from "mongoose";
import { generateUsers } from "./user-seeder.js";

const dbSeder = async () => {
    try {
        const connect = await dbConection()
        
        .then(()=>generateUsers())

        .catch((error) => {
                console.log(error)
            })
        
    } catch (error) {
        console.error('Error al crear el usuario:', error.message);
    } finally {
        mongoose.disconnect()
    }
}

dbSeder()