import mongoose from "mongoose";

export const dbConection = () => {
    return mongoose.connect(
        process.env.MONGO_URI,
        {}
    )
}