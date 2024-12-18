import mongoose from 'mongoose';

const checktokenSchema = new mongoose.Schema({
  nim: { type: String, required: true },
}, {
  timestamps: true, // Menyimpan createdAt dan updatedAt secara otomatis
});

export default mongoose.models.checktoken || mongoose.model('checktoken', checktokenSchema);
