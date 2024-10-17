import { Request, Response, NextFunction } from "express";
import { uploadVideoToS3 } from "../services/video";

// Video yükleme controller fonksiyonu
export const uploadVideo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Dosya yüklenemedi." });
    }

    const { buffer, originalname, mimetype } = req.file;
    const result = await uploadVideoToS3(buffer, originalname, mimetype);

    // Başarılı yanıtla URL'yi geri döndür
    return res.status(200).json({ url: result.Location });
  } catch (error) {
    console.error("Video yükleme hatası:", error);
    next(error); // Hata middleware'ine ilet
  }
};
