import { Request, Response } from 'express';
import Question from '../models/question'; // Question modelini içe aktar

// Soru Paketi Oluşturma (Create)
export const createQuestionPackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, name, question } = req.body;

    const newQuestionPackage = new Question({
      id,
      name,
      question,
    });

    await newQuestionPackage.save();
    res.status(201).json(newQuestionPackage);
  } catch (error) {
    res.status(500).json({ message: 'Soru paketi oluşturulurken hata oluştu', error });
  }
};

// Tüm Soru Paketlerini Listeleme (Read)
export const getQuestionPackages = async (req: Request, res: Response): Promise<void> => {
  try {
    const questionPackages = await Question.find();
    res.status(200).json(questionPackages);
  } catch (error) {
    res.status(500).json({ message: 'Soru paketleri getirilirken hata oluştu', error });
  }
};

// Belirli Bir Soru Paketini Güncelleme (Update)
export const updateQuestionPackage = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedQuestionPackage = await Question.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedQuestionPackage);
  } catch (error) {
    res.status(500).json({ message: 'Soru paketi güncellenirken hata oluştu', error });
  }
};

// Soru Paketi Silme (Delete)
export const deleteQuestionPackage = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await Question.findByIdAndDelete(id);
    res.status(200).json({ message: 'Soru paketi başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Soru paketi silinirken hata oluştu', error });
  }
};
