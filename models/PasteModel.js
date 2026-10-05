import mongoose from 'mongoose';

const pasteSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '',
    maxlength: [200, 'Title must be under 200 characters'],
  },
  content: {
    type: String,
    required: true,
    maxlength: [50000, 'Content must be under 50,000 characters'],
  },
  tags: {
    type: [String],
    default: [],
    validate: [
      {
        validator: (arr) => arr.length <= 20,
        message: 'You can add up to 20 tags',
      },
      {
        validator: (arr) => arr.every((t) => t.length <= 30),
        message: 'Each tag must be under 30 characters',
      },
    ],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('Paste', pasteSchema);
