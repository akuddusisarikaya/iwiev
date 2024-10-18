
// import { uploadVideo } from "../controllers/video";
// import multer from "multer";
// import { asyncHandler } from "../middleware/asyncHandler";

import express from "express";
import { Router, Request, Response } from 'express';
import { generatePresignedUrl } from '../controllers/video';

const router = express.Router();

// Presigned URL oluşturma route'u
router.post('/videos/upload', generatePresignedUrl);

export default router;

