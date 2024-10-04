import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()


const connectDB = async () => {
    try {
      const mongoURI = process.env.DB_LINK;
      if (!mongoURI) {
        throw new Error('MONGO_URI is not defined in .env file');
      }
  
      await mongoose.connect(mongoURI);
  
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Uygulamayı hata durumunda kapat
    }
  };
export default connectDB