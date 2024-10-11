import { Request, Response } from 'express';
import Candidates from '../models/candidates'; // Candidates modelini içe aktar
import mongoose from 'mongoose';

// Aday Oluşturma (Create)
export const createCandidate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, surname, email, phone_number, note, status, video_url, activate } = req.body;

    const newCandidate = new Candidates({
      name,
      surname,
      email,
      phone_number,
      note,
      status,
      video_url,
      activate,
    });

    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(500).json({ message: 'Aday oluşturulurken hata oluştu', error });
  }
};

// Tüm Adayları Listeleme (Read)
export const getCandidates = async (req: Request, res: Response): Promise<void> => {
  try {
    const candidates = await Candidates.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Adaylar getirilirken hata oluştu', error });
  }
};

export const getCandidateByID = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const questid = new mongoose.Types.ObjectId(id)
  try {
    const inter = await Candidates.findById(questid);
    if(!inter){
      res.status(404).json("candidate did not found")
    }
    res.status(200).json(inter);
  } catch (error) {
    res.status(500).json({ message: 'Soru paketi getirilirken hata oluştu', error });
  }
};

// Belirli Bir Adayı Güncelleme (Update)
export const updateCandidate = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedCandidate = await Candidates.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedCandidate);
  } catch (error) {
    res.status(500).json({ message: 'Aday güncellenirken hata oluştu', error });
  }
};

// Aday Silme (Delete)
export const deleteCandidate = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await Candidates.findByIdAndDelete(id);
    res.status(200).json({ message: 'Aday başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Aday silinirken hata oluştu', error });
  }
};
