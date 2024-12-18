import mongoose from 'mongoose';

const getTokenSchema = new mongoose.Schema({
  email: String,
  nim: String,
  TOKEN: String|null,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.getToken || mongoose.model('getToken', getTokenSchema);