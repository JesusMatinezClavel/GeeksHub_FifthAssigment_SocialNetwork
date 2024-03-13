import { dbConection } from "../db.js";
import mongoose from "mongoose";
import { userSeeder } from "./user-seeder.js";
import { postSeeder } from "./post-seeder.js";
import { chatSeeder } from "./chat-seeder.js";
import { commentSeeder } from "./comment-seeder.js";

const dbSeder = async () => {
    try {
        const connect = await dbConection()

            .then(() => userSeeder())
            
            .then(() => postSeeder())
            
            .then(() => chatSeeder())
            
            .then(() => commentSeeder())

            .catch((error) => {
                console.log(error)
            })

    } catch (error) {
        console.error('Failed to create seeders:', error.message);
    } finally {
        mongoose.disconnect()
    }
}


dbSeder()