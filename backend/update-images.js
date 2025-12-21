import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './src/models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const updateImages = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const updates = [
            { name: /iPhone 15 Pro/i, image: 'http://localhost:4800/products/iphone-15-pro.png' },
            { name: /Galaxy S24 Ultra/i, image: 'http://localhost:4800/products/s24-ultra.png' },
            { name: /MacBook Air/i, image: 'http://localhost:4800/products/macbook-air.png' },
            { name: /WH-1000XM5/i, image: 'http://localhost:4800/products/sony-xm5.png' },
            { name: /PlayStation 5 Console/i, image: 'http://localhost:4800/products/ps5-slim.png' },
            { name: /GoPro HERO12/i, image: 'http://localhost:4800/products/gopro-hero12.png' },
            { name: /Dell XPS 13/i, image: 'http://localhost:4800/products/dell-xps-13.png' },
            { name: /Xbox Series X/i, image: 'http://localhost:4800/products/xbox-series-x.png' },
            { name: /Nintendo Switch OLED/i, image: 'http://localhost:4800/products/switch-oled.png' },
            { name: /MX Master 3S/i, image: 'http://localhost:4800/products/mx-master-3s.png' },
            { name: /Dyson V15/i, image: 'http://localhost:4800/products/dyson-v15.png' },
            { name: /KitchenAid Artisan/i, image: 'http://localhost:4800/products/kitchenaid-mixer.png' },
            { name: /Ninja Creami/i, image: 'http://localhost:4800/products/ninja-creami.png' },
            { name: /AirPods Pro/i, image: 'http://localhost:4800/products/airpods-pro-2.png' },
            { name: /Odyssey Ark/i, image: 'http://localhost:4800/products/odyssey-ark.png' },
            { name: /Aeron Chair/i, image: 'http://localhost:4800/products/aeron-chair.png' },
            { name: /Keychron Q1/i, image: 'http://localhost:4800/products/keychron-q1.png' }
        ];

        for (const update of updates) {
            const result = await Product.updateMany(
                { name: update.name },
                { $set: { image: update.image } }
            );
            console.log(`Updated ${result.modifiedCount} products matching ${update.name}`);
        }

        console.log('Database updated successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error updating database:', error);
        process.exit(1);
    }
};

updateImages();
