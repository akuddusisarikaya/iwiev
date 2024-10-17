import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

interface UploadResult {
  Location: string;
  Bucket: string;
  Key: string;
}

export const uploadVideoToS3 = async (
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<UploadResult> => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: `videos/${Date.now()}_${fileName}`,
    Body: fileBuffer,
    ContentType: mimeType,
    ACL: "public-read",
  };

  try {
    const result = await s3.upload(params).promise();
    return result;
  } catch (err) {
    console.error("S3'e yükleme hatası:", err);
    throw new Error("Video yükleme başarısız.");
  }
};
