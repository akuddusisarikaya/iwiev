
import { Schema, model, Document } from 'mongoose';

// Question arayüzü
interface IQuestion extends Document {
  id: number;
  question: string;
  timer: number;
}

// Question şeması
const questionSchema = new Schema<IQuestion>({
  id: { type: Number, required: true },
  question: { type: String, required: true },
  timer: { type: Number, required: true }, // Soru için belirlenen süre (saniye cinsinden)
});

export default model<IQuestion>('Question', questionSchema);