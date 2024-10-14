import express from 'express';
import { createCandidate, getCandidates, updateCandidate, deleteCandidate, getCandidateByID,patchCandidate } from '../controllers/candidates';
import { verifyToken } from '../middleware/verifyToken'; // JWT doğrulama middleware

const router = express.Router();

router.post('/createcandidates', verifyToken, createCandidate); // JWT doğrulaması ile aday oluşturma
router.get('/getcandidates', verifyToken, getCandidates); // JWT doğrulaması ile tüm adayları listeleme
router.get('/getcandidatebyid/:id', verifyToken, getCandidateByID); //id ye göre aday bilgilerini çekme
router.put('/updatecandidates/:id', verifyToken, updateCandidate); // JWT doğrulaması ile aday güncelleme
router.delete('/deletecandidates/:id', verifyToken, deleteCandidate); // JWT doğrulaması ile aday silme
router.patch('/patchcandidates/:id',verifyToken, patchCandidate)

export default router;
