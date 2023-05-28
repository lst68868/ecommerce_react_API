import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
