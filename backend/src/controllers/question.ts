import { Request, Response } from 'express';
import Question from '../models/question'; // Question modelini içe aktar

// Soru Oluşturma (Create)
export const createQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, question, timer } = req.body;

    const newQuestion = new Question({
      id,
      question,
      timer,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Soru oluşturulurken hata oluştu', error });
  }
};

// Tüm Soruları Listeleme (Read)
export const getQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Sorular getirilirken hata oluştu', error });
  }
};

// Belirli Bir Soruyu Güncelleme (Update)
export const updateQuestion = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Soru güncellenirken hata oluştu', error });
  }
};

// Soru Silme (Delete)
export const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await Question.findByIdAndDelete(id);
    res.status(200).json({ message: 'Soru başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Soru silinirken hata oluştu', error });
  }
};
