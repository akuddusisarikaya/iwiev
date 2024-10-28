import express from 'express';
import { createCandidate, getCandidates, updateCandidate, deleteCandidate, getCandidateByID,patchCandidate, signVideo } from '../controllers/candidates';
import { verifyToken } from '../middleware/verifyToken'; // JWT doğrulama middleware

const router = express.Router();

router.post('/createcandidates', createCandidate); // JWT doğrulaması ile aday oluşturma
router.get('/getcandidates', verifyToken, getCandidates); // JWT doğrulaması ile tüm adayları listeleme
router.get('/getcandidatebyid/:id', getCandidateByID); //id ye göre aday bilgilerini çekme
router.put('/updatecandidates/:id', verifyToken, updateCandidate); // JWT doğrulaması ile aday güncelleme
router.delete('/deletecandidates/:id', verifyToken, deleteCandidate); // JWT doğrulaması ile aday silme
router.patch('/patchcandidates/:id',verifyToken, patchCandidate)
router.get('/signvideo/:id', verifyToken, signVideo);

export default router;
