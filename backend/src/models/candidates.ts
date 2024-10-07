import { Schema, model, Document } from 'mongoose';                                                                                                                                                                                                                                                             

// Kullanıcı arayüzü oluşturma
export interface IUser extends Document {
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    note: string;
    status: string;
    video_url: string;
    activate: boolean;
  }

  // Kullanıcı şeması
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Email'in benzersiz olması önemli
  phone_number: { type: String, required: true },
  note: { type: String, default: '' },  // Not alanı boş olabilir
  status: { type: String, enum: ['pending', 'completed', 'rejected'],  default: 'pending' }, // Durum değerleri sabit olabilir
  video_url: { type: String, required: true },
  activate: { type: Boolean, required: true, default: true }, // Aktif olup olmadığını belirten alan
}, {
  timestamps: true,  // createdAt ve updatedAt alanlarını otomatik ekler
});

// Modeli dışa aktar
const Candidates = model<IUser>('Candidates', userSchema);

export default Candidates;