



import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

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
import authRoutes from "./src/routes/auth.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "src/public")));

// Connect DB
connectDB();

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/auth", authRoutes);
// Middleware
app.use(errorHandler);


// app.use((req, res) => {
//     // res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
//     res.status(404).sendFile(path.join(__dirname, "public", "404.html"));

// });


// Start server
app.listen(4800, () => console.log("running on the port 4800!!!!"));






//! http://localhost:4800/api/shops to add and fetch shops data 

