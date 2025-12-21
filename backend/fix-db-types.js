import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const fixDbTypes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const shopsColl = db.collection('shops');
        const productsColl = db.collection('products');

        const shops = await shopsColl.find().toArray();
        console.log(`Checking ${shops.length} shops...`);

        for (const shop of shops) {
            if (typeof shop._id === 'string' && mongoose.Types.ObjectId.isValid(shop._id)) {
                const oldId = shop._id;
                const newId = new mongoose.Types.ObjectId(oldId);

                // Backup, delete, then insert with new ID
                const shopData = { ...shop };
                delete shopData._id; // Remove old string ID
                shopData._id = newId;

                await shopsColl.deleteOne({ _id: oldId });
                await shopsColl.insertOne(shopData);
                console.log(`Converted shop ID for ${shop.name}`);
            }
        }

        const products = await productsColl.find().toArray();
        console.log(`Checking ${products.length} products...`);

        for (const product of products) {
            let needsUpdate = false;
            let updateObj = {};

            if (typeof product.shop === 'string' && mongoose.Types.ObjectId.isValid(product.shop)) {
                updateObj.shop = new mongoose.Types.ObjectId(product.shop);
                needsUpdate = true;
            }

            if (needsUpdate) {
                await productsColl.updateOne({ _id: product._id }, { $set: updateObj });
                console.log(`Updated product shop reference for ${product.name}`);
            }
        }

        console.log('Database normalization complete.');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
};

fixDbTypes();
