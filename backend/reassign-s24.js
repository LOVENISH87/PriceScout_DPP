import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';
import Shop from './src/models/Shop.js';

dotenv.config();

const reassignS24 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const cyberplex = await Shop.findOne({ name: 'CyberPlex' });
        const nexus = await Shop.findOne({ name: 'NEXUS STORE' });

        if (!cyberplex || !nexus) {
            console.error('CyberPlex or Nexus not found');
            process.exit(1);
        }

        // Update the existing S24 Ultra products to these shops
        const products = await Product.find({ name: /Samsung Galaxy S24 Ultra/i });

        if (products.length >= 1) {
            products[0].shop = cyberplex._id;
            products[0].price = 1249;
            await products[0].save();
            console.log(`Reassigned ${products[0].name} to CyberPlex`);
        }

        if (products.length >= 2) {
            products[1].shop = nexus._id;
            products[1].price = 1290;
            await products[1].save();
            console.log(`Reassigned ${products[1].name} to NEXUS STORE`);
        } else if (products.length === 1) {
            // Create a second one for Nexus if only one exists
            await Product.create({
                name: products[0].name,
                price: 1290,
                shop: nexus._id,
                brand: 'Samsung',
                category: 'Electronics',
                description: 'The ultimate AI phone.',
                image: products[0].image || '/products/s24-ultra.png'
            });
            console.log(`Created second ${products[0].name} for NEXUS STORE`);
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

reassignS24();
