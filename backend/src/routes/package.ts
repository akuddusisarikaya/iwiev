import express from 'express';
import { createQuestionPackage, getQuestionPackages, updateQuestionPackage, deleteQuestionPackage } from '../controllers/package';
import { verifyToken } from '../middleware/verifyToken'; // JWT doğrulama middleware

const router = express.Router();

router.post('/createquestion-packages', verifyToken, createQuestionPackage); // JWT doğrulaması ile soru paketi oluşturma
router.get('/getquestion-packages', verifyToken, getQuestionPackages); // JWT doğrulaması ile tüm soru paketlerini listeleme
router.put('/updatequestion-packages/:id', verifyToken, updateQuestionPackage); // JWT doğrulaması ile soru paketini güncelleme
router.delete('/deletequestion-packages/:id', verifyToken, deleteQuestionPackage); // JWT doğrulaması ile soru paketini silme

export default router;
