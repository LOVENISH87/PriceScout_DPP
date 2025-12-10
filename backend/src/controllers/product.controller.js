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

// const getProducts = async (req, resp)=>{
//     try {
//         const products = await Product.find().populate('shop') //async nhi await!!!!
//         //todo Why .populate("shop")?

//         //! Because it replaces the shop ObjectId with full shop details (name + location).
//         resp.status(200).json(products)
//     } catch (error) {
//         resp.status(500).json({message : `${error.message} this one from getProducts!!!`})

//     }
// }


// ! main feture of the project "get lowest price!!!"

// export const getLowestPrices = async (req, res) => {
//     try {
//         const products = await Product.find();

        
//         const lowestMap = {};

//         products.forEach((item) => {
//             if (!lowestMap[item.name]) {
//                 lowestMap[item.name] = item;
//             } else {
//                 if (item.price < lowestMap[item.name].price) {
//                     lowestMap[item.name] = item;
//                 }
//             }
//         });

//         const lowestList = Object.values(lowestMap);

//         res.json(lowestList);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


export const getLowestPrices = async (req, res) => {
    try {
        const products = await Product.find();

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

        const products = await Product.find({ name: productName }).sort({ price: 1 });

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
