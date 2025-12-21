import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const findTestProduct = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const p = await Product.findOne({ name: 'Test Product' });
        console.log(p ? p._id.toString() : 'Product not found');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

findTestProduct();
