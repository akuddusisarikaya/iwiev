import { Router } from 'express';
import multer from 'multer';
import { uploadVideoController } from '../controllers/video';


const router = Router();
const upload = multer({ dest: 'uploads/' });  // Dosyaları geçici olarak buraya kaydeder

// Video yükleme endpoint'i
router.post('/upload', upload.single('video'), uploadVideoController);

export default router;
