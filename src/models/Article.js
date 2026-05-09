import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, default: '' },
  content: { type: String, default: '' },  // ✅ required hata diya — editor se content late waqt empty aa sakta tha
  categoryId: { type: String, default: '' },
  author: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  isBreaking: { type: Boolean, default: false },
  publishedAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);