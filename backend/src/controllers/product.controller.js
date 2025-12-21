import Product from "../models/Product.js";

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, price, shop, brand, category, unit, image, description } = req.body;

        const product = await Product.create({
            name,
            price,
            shop,
            brand,
            category,
            unit,
            image,
            description
        });

        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ message: `${error.message} this one from createPro` });
    }
};


// gt
// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("shop");
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get products by shop ID
export const getProductsByShop = async (req, res) => {
    try {
        const products = await Product.find({ shop: req.params.shopId }).populate("shop");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ! main feture of the project "get lowest price!!!"

export const getLowestPrices = async (req, res) => {
    try {
        const products = await Product.find().populate("shop"); // Populate shop for display

        const lowestMap = {};

        products.forEach((item) => {
            if (!lowestMap[item.name]) {
                lowestMap[item.name] = item;
            } else {
                if (item.price < lowestMap[item.name].price) {
                    lowestMap[item.name] = item;
                }
            }
        });

        const lowestList = Object.values(lowestMap);

        // ⭐ SORTING HERE (Low → High)
        lowestList.sort((a, b) => a.price - b.price);

        res.json(lowestList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getAllPricesForProduct = async (req, res) => {
    try {
        const productName = req.params.name;

        // Populate shop here too so we can see who sells it!
        const products = await Product.find({ name: productName }).populate("shop").sort({ price: 1 });

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("shop");
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update product
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
