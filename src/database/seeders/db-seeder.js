import { dbConection } from "../db.js";
import mongoose from "mongoose";
import { userSeeder } from "./user-seeder.js";
import { postSeeder } from "./post-seeder.js";
import { chatSeeder } from "./chat-seeder.js";

const dbSeder = async () => {
    try {
        const connect = await dbConection()

            .then(() => userSeeder())
            
            .then(() => postSeeder())
            
            .then(() => chatSeeder())


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