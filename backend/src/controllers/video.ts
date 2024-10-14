import { Request, Response } from 'express';
import { uploadVideo } from '../services/video';

export const uploadVideoController = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'Dosya yüklenmedi' });
      return;  // return ekleyerek fonksiyonun işlemi sonlandırmasını sağlıyoruz
    }

    const result = await uploadVideo(req.file);  // req.file'in var olduğunu kontrol ettik
    res.json({ message: 'Video başarıyla yüklendi', videoUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Video yükleme hatası', error });
  }
};
