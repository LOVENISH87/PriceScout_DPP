import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const findTestProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const products = await Product.find({ name: 'Test Product' });
        console.log(`Found ${products.length} test products`);
        products.forEach(p => console.log(p._id.toString()));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

findTestProducts();
