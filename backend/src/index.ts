import express, { application } from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
import authRoute from './routes/auth'
import cors from "cors"

import question from './routes/question';
import qpackage from './routes/package';
import interview from './routes/interview';
import candidates from './routes/candidates';
import videoRoutes from './routes/video';  // Video yükleme rotasını ekledik

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api", authRoute)
app.use("/api", question)
app.use("/api", qpackage)
app.use("/api", interview)
app.use("/api", candidates)

// Cloudinary video yükleme rotası
app.use("/api/videos", videoRoutes);  // Video yükleme için eklenen yeni route

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});