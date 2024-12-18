import mongoose from 'mongoose';

const MahasiswaSchema = new mongoose.Schema({
  vote: { type: String, required: true },
}, {
  timestamps: true, // otomatis menambahkan createdAt dan updatedAt
});

export default mongoose.models.vote || mongoose.model('vote', MahasiswaSchema);