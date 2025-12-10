// import express from "express";
// import cors from "cors";
// import connectDB from "./config/db.js";

// // import productRoutes from ".routes/product.routes.js";
// // import shopRoutes from ".routes/shop.routes.js";

// import shopRoutes from "./routes/shop.routes.js";
// import productRoutes from "./routes/product.routes.js";

// // app.use("/shops", shopRoutes);
// // app.use("/products", productRoutes);


// const app = express();
// app.use(cors())
// app.use(express.json())
// connectDB();
// // app.use('api/products', productRoutes);
// // app.use('api/shops', shopRoutes);


// import Product from "./models/Product.js"; // adjust path if needed
// import Shop from "./models/Shop.js";

// app.get("/test-shops", async (req, res) => {
//     try {
//         const products = await Shop.find() // fetch all products from DB && no need to populate!!
//         res.json(products);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
// app.listen(4800, () => console.log("running on the port 4800!!!!")); // for node server!!!

// todo middlewere somewhere!!!



import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

//shit
// mongoose.set("strictQuery", false);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// DB
import connectDB from "./src/config/db.js";

//middleware!!!
import errorHandler from "./src/middleware/errorHandler.js";



// Routes
import productRoutes from "./src/routes/product.routes.js";
import shopRoutes from "./src/routes/shop.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "src/public")));


// Connect DB
connectDB();

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/shops", shopRoutes);


// app.use((req, res) => {
//     // res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
//     res.status(404).sendFile(path.join(__dirname, "public", "404.html"));

// });


// Start server
app.listen(4800, () => console.log("running on port 4800"));






//! http://localhost:4800/api/shops to add and fetch shops data 

