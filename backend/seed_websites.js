import mongoose from "mongoose";
// import dotenv from "dotenv";
import Shop from "./src/models/Shop.js";
import Product from "./src/models/Product.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// dotenv.config();  //rakhu tab dikkat na kru tb dikkat!!!!

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const shops = [
  { name: "TechHub", location: "New York", website: "https://www.techhub-fake-store.com" },
  { name: "GadgetWorld", location: "San Francisco", website: "https://www.gadgetworld-example.org" },
  { name: "ElectroStore", location: "Online", website: "https://www.electrostore-demo.net" },
  { name: "BestDealz", location: "Austin", website: "https://www.bestdealz-mockup.io" },
  { name: "FutureShop", location: "Seattle", website: "https://www.futureshop-test.co" }
];

const seedData = async () => {
  try {
    // Hardcoded local connection as per user's reverted state
    const uri = "mongodb://127.0.0.1:27017/test1"; 
    await mongoose.connect(uri);
    console.log("Connected to MongoDB (Local) for seeding...");

    // Clear existing data
    await Shop.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing data.");

    // Insert Shops
    const createdShops = await Shop.insertMany(shops);
    console.log(`Seeded ${createdShops.length} shops with websites.`);

    // Load sample products
    const sampleProductsPath = path.join(__dirname, 'sample_products_100.json');
    let products = [];
    
    if (fs.existsSync(sampleProductsPath)) {
        const data = fs.readFileSync(sampleProductsPath, 'utf-8');
        products = JSON.parse(data);
        console.log(`Loaded ${products.length} sample products from file.`);
    } else {
        console.log("Sample file not found, using basic fallback.");
        products = [
            { name: "Fallback Product", price: 100, brand: "Generic", category: "General", image: "https://placehold.co/400" }
        ];
    }

    // Assign products to random shops
    // We map the "REPLACE_WITH_SHOP_ID_X" logic or just assign randomly if not rigid
    const productsWithShops = products.map((p) => {
      const randomShop = createdShops[Math.floor(Math.random() * createdShops.length)];
      return { 
          ...p, 
          shop: randomShop._id,
          // Remove the placeholder string if it exists
          shop_placeholder: undefined 
      };
    });

    // Insert Products
    await Product.insertMany(productsWithShops);
    console.log(`Seeded ${productsWithShops.length} products.`);

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
