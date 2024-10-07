
import { Schema, model, Document } from 'mongoose';

// Question arayüzü
interface IQuestion extends Document {
  id: number;
  name: string;
  question: string[];
 
}

// Question şeması
const questionSchema = new Schema<IQuestion>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  question: { type: [String], required: true }, // Sorular dizisi
  
});

export default model<IQuestion>('Question', questionSchema);