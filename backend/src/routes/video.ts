import { Router } from "express";
import { uploadVideo } from "../controllers/video";
import multer from "multer";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("video"), asyncHandler(uploadVideo));

export default router;
