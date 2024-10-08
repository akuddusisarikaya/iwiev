import express from 'express';
import { createQuestionPackage, getQuestionPackages, updateQuestionPackage, deleteQuestionPackage } from '../controllers/package';
import { verifyToken } from '../middleware/verifyToken'; // JWT doğrulama middleware

const router = express.Router();

router.post('/createpackages', verifyToken, createQuestionPackage); // JWT doğrulaması ile soru paketi oluşturma
router.get('/getpackages', verifyToken, getQuestionPackages); // JWT doğrulaması ile tüm soru paketlerini listeleme
router.get('/getpackages/:id', verifyToken, getQuestionPackages);
router.put('/updatepackages/:id', verifyToken, updateQuestionPackage); // JWT doğrulaması ile soru paketini güncelleme
router.delete('/deletepackages/:id', verifyToken, deleteQuestionPackage); // JWT doğrulaması ile soru paketini silme

export default router;
