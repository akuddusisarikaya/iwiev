import express from 'express';
import { createInterview, getInterviews, updateInterviews, deleteInterviews } from '../controllers/interview';
import { verifyToken } from '../middleware/verifyToken'; // JWT doğrulama middleware

const router = express.Router();

router.post('/creatinterview', verifyToken, createInterview); // JWT doğrulaması ile mülakat oluşturma
router.get('/getinterview', verifyToken, getInterviews); // Mülakatları listeleme
router.put('/updateinterview/:id', verifyToken, updateInterviews); // Mülakat güncelleme
router.delete('/deleteinterview/:id', verifyToken, deleteInterviews); // Mülakat silme

export default router;
