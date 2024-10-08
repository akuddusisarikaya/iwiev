import { Request, Response } from 'express';
import Interview from '../models/interview'; // Mülakat modelini içe aktar

export const createInterview = async (req: Request, res: Response): Promise<void> => {
  try {
    // Kimlik doğrulaması yapılmış kullanıcıya erişim (verifyToken middleware'inden gelir)
    const user = (req as any).user; // Middleware'den gelen kullanıcı bilgileri

    // Mülakat oluşturma işlemi
    const newInterview = new Interview({
      ...req.body,
      createdBy: user.id, // Kimlik doğrulanan kullanıcı ID'si mülakatı oluşturan kişi olarak eklenir
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

