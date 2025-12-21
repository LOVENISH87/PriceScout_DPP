import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const listAll = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const products = await Product.find().lean();
        products.forEach(p => console.log(`${p.name} - ${p.price}`));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

listAll();
