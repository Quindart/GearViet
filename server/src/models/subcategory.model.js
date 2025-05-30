import mongoose from 'mongoose'

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
});

export default mongoose.model("Subcategory", subcategorySchema);
