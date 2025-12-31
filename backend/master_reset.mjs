import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SHOP_MODELS = [
    { name: "NEXUS STORE", location: "Neo Tokyo", file: "nexus.html" },
    { name: "CyberPlex", location: "Boston", file: "cyberplex.html" },
    { name: "LocalStore", location: "Seattle", file: "localstore.html" },
    { name: "UltraStore", location: "Chicago", file: "ultrastore.html" },
    { name: "HyperStation", location: "London", file: "hyperstation.html" },
    { name: "BestSquare", location: "Miami", file: "bestsquare.html" },
    { name: "FastMart", location: "Dallas", file: "fastmart.html" },
    { name: "EliteLink", location: "Austin", file: "elitelink.html" },
    { name: "EasyHub", location: "Denver", file: "easyhub.html" },
    { name: "MegaTech", location: "San Francisco", file: "megatech.html" },
    { name: "GlobalGadget", location: "New York", file: "globalgadget.html" },
    { name: "PrimeMarket", location: "Dallas", file: "primemarket.html" },
    { name: "ZenithElectronics", location: "Berlin", file: "zenithelectronics.html" },
    { name: "SwiftSystems", location: "Toronto", file: "swiftsystems.html" },
    { name: "FutureForge", location: "Singapore", file: "futureforge.html" }
];

const PRODUCTS = [
    { name: "iPhone 15 Pro Max", brand: "Apple", category: "Electronics", price: 1199 },
    { name: "Samsung Galaxy S24 Ultra", brand: "Samsung", category: "Electronics", price: 1299 },
    { name: "MacBook Pro 16-inch M3", brand: "Apple", category: "Computing", price: 2499 },
    { name: "Sony WH-1000XM5 Wireless Headphones", brand: "Sony", category: "Audio", price: 399 },
    { name: "Nintendo Switch OLED", brand: "Nintendo", category: "Gaming", price: 349 },
    { name: "PlayStation 5 Console", brand: "Sony", category: "Gaming", price: 499 },
    { name: "DJI Mini 3 Pro Drone", brand: "DJI", category: "Electronics", price: 759 },
    { name: "iPad Air M2", brand: "Apple", category: "Electronics", price: 599 },
    { name: "RTX 4090 Graphics Card", brand: "NVIDIA", category: "Computing", price: 1599 },
    { name: "Logitech MX Master 3S", brand: "Logitech", category: "Computing", price: 99 },
    { name: "Keychron Q1 Mechanical Keyboard", brand: "Keychron", category: "Computing", price: 169 },
    { name: "LG C3 65-inch OLED TV", brand: "LG", category: "Electronics", price: 1899 }
];

// Schema definitions
const shopSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    location: String,
    website: String
});
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    brand: String,
    category: String,
    image: String,
    description: String,
    inStock: { type: Boolean, default: true }
});

const Shop = mongoose.models.Shop || mongoose.model("Shop", shopSchema);
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB...");

        // 1. Clear existing
        await Product.deleteMany({});
        await Shop.deleteMany({});
        console.log("Cleared existing data.");

        const shopMapping = {};

        // 2. Create Shops
        for (const s of SHOP_MODELS) {
            const website = `http://localhost:5173/${s.file}`;
            const shop = await Shop.create({
                name: s.name,
                location: s.location,
                website: website
            });
            shopMapping[s.file] = shop._id;
            console.log(`Created shop: ${s.name} (${shop._id})`);

            // 3. Create Products for each shop (with slight price variation)
            for (const p of PRODUCTS) {
                const variance = Math.floor(Math.random() * 100) - 50; // -50 to +50
                await Product.create({
                    ...p,
                    price: p.price + variance,
                    shop: shop._id,
                    image: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}`,
                    description: `Premium ${p.name} at ${s.name}.`
                });
            }
        }
        console.log("Seeded products for all shops.");

        // 4. Update HTML files
        const publicDir = "/home/batman/Documents/PriceScout_DPP/client/public";
        for (const [filename, newId] of Object.entries(shopMapping)) {
            const filepath = path.join(publicDir, filename);
            if (fs.existsSync(filepath)) {
                let content = fs.readFileSync(filepath, 'utf8');
                // Replace any shop id match: const SHOP_ID = "..."
                content = content.replace(/const SHOP_ID = "[a-f0-9]+"/g, `const SHOP_ID = "${newId}"`);
                fs.writeFileSync(filepath, content);
                console.log(`Updated ID in ${filename}`);
            }
        }

        console.log("SUCCESS: All systems synchronized.");
        process.exit(0);
    } catch (err) {
        console.error("FATAL ERROR:", err);
        process.exit(1);
    }
}

run();
