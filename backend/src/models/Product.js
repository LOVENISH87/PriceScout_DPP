import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    price: {
        type: Number,
        required: true,
    },

    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
    },

    brand: {
        type: String,
        trim: true,
    },

    category: {
        type: String,
        trim: true,
    },

    unit: {
        type: String,
        trim: true,
    },

    image: {
        type: String,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },

    inStock: {
        type: Boolean,
        default: true,
    }
});

export default mongoose.model("Product", productSchema);
 //! done