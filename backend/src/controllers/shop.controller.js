//!lets go!!
import Shop from '../models/Shop.js'

// ! ceate new shop from the models/shop/.js??

export const createShop = async (req, resp) => {
    try {
        const { name, location, website } = req.body;
        const shop = await Shop.create({ name, location, website });
        resp.status(201).json(shop);

    } catch (error) {
        resp.status(500).json({ message: `${error.message}  error in shop.controller.js` });
    }
}

//get all shops -> -. ->
export const getShops = async (req, resp) => {
    try {
        const shops = await Shop.find()
        return resp.status(200).json(shops);

    } catch (error) {
        return resp.status(500).json({ message: `${error.message} error in geTShops` })
    }
}

// Get single shop by ID
export const getShopById = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id);
        if (!shop) return res.status(404).json({ message: "Shop not found" });
        res.json(shop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update shop
export const updateShop = async (req, res) => {
    try {
        const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!shop) return res.status(404).json({ message: "Shop not found" });
        res.json(shop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete shop
export const deleteShop = async (req, res) => {
    try {
        const shop = await Shop.findByIdAndDelete(req.params.id);
        if (!shop) return res.status(404).json({ message: "Shop not found" });
        res.json({ message: "Shop deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

