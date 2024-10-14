import { Request, Response } from 'express';
import Interview from '../models/interview'; // Mülakat modelini içe aktar
import mongoose from 'mongoose';

export const createInterview = async (req: Request, res: Response): Promise<void> => {
  try {
    const newInterview = new Interview({
      ...req.body
    });
    await newInterview.save();
    res.status(201).json(newInterview);
  } catch (error) {
    res.status(500).json({ message: 'Mülakat oluşturulurken hata oluştu', error });
  }
};


export const getInterviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const interview = await Interview.find();
    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ message: 'Mülakatlar getirilirken hata oluştu', error });
  }
};

export const getinterviewByID = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const questid = new mongoose.Types.ObjectId(id)
  try {
    const inter = await Interview.findById(questid);
    if(!inter){
      res.status(404).json("interview did not found")
    }
    res.status(200).json(inter);
  } catch (error) {
    res.status(500).json({ message: 'Soru paketi getirilirken hata oluştu', error });
  }
};

export const updateInterviews = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedInterview = await Interview.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedInterview);
  } catch (error) {
    res.status(500).json({ message: 'Mülakat güncellenirken hata oluştu', error });
  }
};

export const deleteInterviews = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await Interview.findByIdAndDelete(id);
    res.status(200).json({ message: 'Mülakat başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Mülakat silinirken hata oluştu', error });
  }
};

export const patchInterview = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const patchedPackage = await Interview.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json(patchedPackage);
  } catch (error) {
    res.status(500).json({ message: 'Soru paketi güncellenirken hata oluştu', error });
  }
};