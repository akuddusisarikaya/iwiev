import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
import authRoute from './routes/auth'
import cors from "cors"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api", authRoute)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});