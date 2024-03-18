import express from "express";
import 'dotenv/config'
import { dbConection } from "./database/db.js";
import router from "./routes/router.js";
import cors from "cors";

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4001

app.use('/api', router)

dbConection()
    .then(() => {
        console.log(`Database connected`);
        app.listen(
            process.env.PORT || 4001,
            () => {
                console.log(`server running on port ${PORT}`);
            })
    })
    .catch(error => { console.log(error) })



// HEALTH ROUTES

app.get('/api/healthy', (req,res)=>{
    res.status(200).json({
        success: true,
        message: `server is healthy`
    })
})