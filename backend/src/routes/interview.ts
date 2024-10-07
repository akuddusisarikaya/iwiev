import express from 'express';
import { createInterview, getInterviews, updateInterviews, deleteInterviews } from '../controllers/interview';
import { verifyToken } from '../middleware/verifyToken'; // JWT doğrulama middleware

const router = express.Router();

router.post('/creatinterviews', verifyToken, createInterview); // JWT doğrulaması ile mülakat oluşturma
router.get('/getinterviews', verifyToken, getInterviews); // Mülakatları listeleme
router.put('/updateinterviews/:id', verifyToken, updateInterviews); // Mülakat güncelleme
router.delete('/deleteinterviews/:id', verifyToken, deleteInterviews); // Mülakat silme

export default router;
