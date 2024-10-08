import { Schema, model, Document } from 'mongoose';

// Question arayüzü
export interface IQuestion extends Document {
  question: string;
  timer: number;
}

// Question şeması
const questionSchema = new Schema<IQuestion>({
  question: { type: String, required: true },
  timer: { type: Number, required: true }, // Soru için belirlenen süre (saniye cinsinden)
});

const Question = model<IQuestion>('Question', questionSchema);

export default Question
