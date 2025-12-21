import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';
import Shop from './src/models/Shop.js';

dotenv.config();

const seedMore = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const cyberplex = await Shop.findOne({ name: 'CyberPlex' });
        const nexus = await Shop.findOne({ name: 'NEXUS STORE' });

        const newProducts = [
            {
                name: 'Sony WH-1000XM5',
                brand: 'Sony',
                price: 349,
                shop: cyberplex._id,
                category: 'Audio',
                description: 'Industry leading noise cancellation with stunning sound quality.',
                image: '/products/sony-xm5.png'
            },
            {
                name: 'Logitech MX Master 3S',
                brand: 'Logitech',
                price: 99,
                shop: cyberplex._id,
                category: 'Peripherals',
                description: 'An icon remastered for absolute precision and comfort.',
                image: '/products/mx-master-3s.png'
            },
            {
                name: 'RTX 4090 Black Edition',
                brand: 'NVIDIA',
                price: 1599,
                shop: nexus._id,
                category: 'GPU',
                description: 'The ultimate GPU for the most demanding workloads.',
                image: '/products/rtx-4090.png'
            },
            {
                name: 'HHKB Professional Hybrid',
                brand: 'PFU',
                price: 320,
                shop: nexus._id,
                category: 'Keyboard',
                description: 'Topre switches for the ultimate typing experience.',
                image: '/products/hhkb.png'
            }
        ];

        for (const p of newProducts) {
            await Product.findOneAndUpdate({ name: p.name, shop: p.shop }, p, { upsert: true });
        }

        console.log('Seeded more products for mock shops.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedMore();
