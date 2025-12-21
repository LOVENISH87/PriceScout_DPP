import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Shop from './src/models/Shop.js';

dotenv.config();

const updateWebsites = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const updates = [
            { name: 'CyberPlex', website: 'http://localhost:5173/cyberplex.html' },
            { name: 'NEXUS STORE', website: 'http://localhost:5173/nexus.html' }
        ];

        for (const update of updates) {
            const res = await Shop.findOneAndUpdate(
                { name: update.name },
                { website: update.website },
                { new: true }
            );
            if (res) {
                console.log(`Updated website for ${update.name} to ${update.website}`);
            } else {
                console.log(`Shop ${update.name} not found.`);
            }
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

updateWebsites();
