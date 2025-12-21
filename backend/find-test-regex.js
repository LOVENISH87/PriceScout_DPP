import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const findTestProductsRegex = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const products = await Product.find({ name: /Test/i });
        console.log(`Found ${products.length} products matching 'Test'`);
        products.forEach(p => console.log(`'${p.name}' - ID: ${p._id.toString()}`));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

findTestProductsRegex();
