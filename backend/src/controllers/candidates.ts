// controllers/candidateController.ts
import { Request, Response } from 'express';
import * as candidateService from '../services/candidates';
import Candidates from '../models/candidates';

export const createCandidate = async (req: Request, res: Response): Promise<void> => {
  try {
    const candidate = await candidateService.createCandidate(req.body);
    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Aday oluşturulurken hata oluştu', error });
  }
};

export const getCandidates = async (req: Request, res: Response): Promise<void> => {
  try {
    const candidates = await candidateService.getAllCandidates();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Adaylar getirilirken hata oluştu', error });
  }
};

export const getCandidateByID = async (req: Request, res: Response): Promise<void> => {
  try {
    const candidate = await candidateService.getCandidateByID(req.params.id);
    if (!candidate) {
      res.status(404).json({ message: 'Aday bulunamadı' });
    } else {
      res.status(200).json(candidate);
    }
  } catch (error) {
    res.status(500).json({ message: 'Aday getirilirken hata oluştu', error });
  }
};

export const updateCandidate = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedCandidate = await candidateService.updateCandidate(req.params.id, req.body);
    res.status(200).json(updatedCandidate);
  } catch (error) {
    res.status(500).json({ message: 'Aday güncellenirken hata oluştu', error });
  }
};

export const deleteCandidate = async (req: Request, res: Response): Promise<void> => {
  try {
    await candidateService.deleteCandidate(req.params.id);
    res.status(200).json({ message: 'Aday başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Aday silinirken hata oluştu', error });
  }
};

export const patchCandidate = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const patchedCandidate = await Candidates.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json(patchedCandidate);
  } catch (error) {
    res.status(500).json({ message: 'Soru paketi güncellenirken hata oluştu', error });
  }
};
