import express from 'express';
import { createCandidate, getCandidates, updateCandidate, deleteCandidate } from '../controllers/candidates';
import { verifyToken } from '../middleware/verifyToken'; // JWT doğrulama middleware

const router = express.Router();

router.post('/createcandidates', verifyToken, createCandidate); // JWT doğrulaması ile aday oluşturma
router.get('/getcandidates', verifyToken, getCandidates); // JWT doğrulaması ile tüm adayları listeleme
router.put('/updatecandidates/:id', verifyToken, updateCandidate); // JWT doğrulaması ile aday güncelleme
router.delete('/deletecandidates/:id', verifyToken, deleteCandidate); // JWT doğrulaması ile aday silme

export default router;
