// import { Request, Response, NextFunction } from "express";
// import { uploadVideoToS3 } from "../services/video";

// module.exports = {
//   aws: {
//     accessKeyId: 'YOUR_AWS_ACCESS_KEY',
//     secretAccessKey: 'YOUR_AWS_SECRET_KEY',
//     region: 'YOUR_REGION',
//     bucketName: 'video-uploads'
//   },
//   mongodb: {
//     uri: 'mongodb://localhost:27017/videoApp'
//   }
// };

// // Video yükleme controller fonksiyonu
// export const uploadVideo = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "Dosya yüklenemedi." });
//     }

//     const { buffer, originalname, mimetype } = req.file;
//     const result = await uploadVideoToS3(buffer, originalname, mimetype);

//     // Başarılı yanıtla URL'yi geri döndür
//     return res.status(200).json({ url: result.Location });
//   } catch (error) {
//     console.error("Video yükleme hatası:", error);
//     next(error); // Hata middleware'ine ilet
//   }
// };



// import { Request, Response } from 'express';
// import aws from 'aws-sdk';
// import Candidates from '../models/candidates';

// const awsConfig = {
//   accessKeyId: 'AWS_ACCESS_KEY_ID',
//   secretAccessKey: 'AWS_SECRET_ACCESS_KEY',
//   region: 'AWS_REGION',
//   bucketName: 'BUCKET_NAME'
// };

// const s3 = new aws.S3({
//   accessKeyId: awsConfig.accessKeyId,
//   secretAccessKey: awsConfig.secretAccessKey,
//   region: awsConfig.region
// });

// export const generatePresignedUrl = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { fileName, fileType, email } = req.query as {
//       fileName: string;
//       fileType: string;
//       email: string;
//     };

//     if (!fileName || !fileType || !email) {
//       res.status(400).json({ error: 'fileName, fileType ve email gereklidir.' });
//       return; // Yanıt gönderildikten sonra fonksiyonun çalışmasını durdurmak için.
//     }

//     const params = {
//       Bucket: awsConfig.bucketName,
//       Key: `videos/${Date.now()}_${fileName}`,
//       Expires: 60, // URL'nin geçerli olacağı süre
//       ContentType: fileType,
//       ACL: 'public-read'
//     };

//     const uploadURL = await s3.getSignedUrlPromise('putObject', params);

//     const videoURL = `https://${awsConfig.bucketName}.s3.${awsConfig.region}.amazonaws.com/${params.Key}`;

//     const candidate = await Candidates.findOneAndUpdate(
//       { email },
//       { video_url: videoURL },
//       { new: true }
//     );

//     if (!candidate) {
//       res.status(404).json({ error: 'Aday bulunamadı.' });
//       return;
//     }

//     res.status(200).json({ uploadURL, videoURL, candidate });
//   } catch (error) {
//     console.error('Presigned URL oluşturulurken hata:', error);
//     res.status(500).json({ error: 'Presigned URL oluşturulurken bir hata oluştu.' });
//   }
// };




import { Request, Response } from 'express';
import aws from 'aws-sdk';
import dotenv from 'dotenv';
import Candidates from '../models/candidates';

// .env dosyasını yükle
dotenv.config();

// AWS yapılandırmasını .env dosyasından al
const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucketName: process.env.BUCKET_NAME || 'video-uploads'
};

// AWS S3 yapılandırmasını ayarla
const s3 = new aws.S3({
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey,
  region: awsConfig.region,
});

// Presigned URL oluşturma fonksiyonu
export const generatePresignedUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fileName, fileType, email } = req.query as {
      fileName: string;
      fileType: string;
      email: string;
    };

    // Gerekli parametrelerin olup olmadığını kontrol et
    if (!fileName || !fileType || !email) {
      res.status(400).json({ error: 'fileName, fileType ve email gereklidir.' });
      return;
    }

    // S3 için yükleme parametrelerini hazırla
    const params = {
      Bucket: awsConfig.bucketName,
      Key: `videos/${Date.now()}_${fileName}`,
      Expires: 60, // URL'nin geçerli olacağı süre (saniye cinsinden)
      ContentType: fileType,
      ACL: 'public-read',
    };

    // Presigned URL oluştur
    const uploadURL = await s3.getSignedUrlPromise('putObject', params);

    // Video URL'sini oluştur
    const videoURL = `https://${awsConfig.bucketName}.s3.${awsConfig.region}.amazonaws.com/${params.Key}`;

    // Veritabanında adayı güncelle
    const candidate = await Candidates.findOneAndUpdate(
      { email },
      { video_url: videoURL },
      { new: true }
    );

    // Aday bulunamazsa 404 döndür
    if (!candidate) {
      res.status(404).json({ error: 'Aday bulunamadı.' });
      return;
    }

    // Presigned URL'yi ve güncellenmiş aday bilgisini döndür
    res.status(200).json({ uploadURL, videoURL, candidate });
  } catch (error) {
    console.error('Presigned URL oluşturulurken hata:', error);
    res.status(500).json({ error: 'Presigned URL oluşturulurken bir hata oluştu.' });
  }
};
