import express from 'express';
import { createQuestion, getQuestions, updateQuestion, deleteQuestion } from '../controllers/question';
import { verifyToken } from '../middleware/verifyToken'; // JWT doğrulama middleware

const router = express.Router();

router.post('/createquestions', verifyToken, createQuestion); // JWT doğrulaması ile soru oluşturma
router.get('/getquestions', verifyToken, getQuestions); // JWT doğrulaması ile tüm soruları listeleme
router.put('/updatequestions/:id', verifyToken, updateQuestion); // JWT doğrulaması ile soru güncelleme
router.delete('/deletequestions/:id', verifyToken, deleteQuestion); // JWT doğrulaması ile soru silme

export default router;
