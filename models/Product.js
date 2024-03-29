import mongoose from "mongoose"
import { Schema, models } from "mongoose"

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    },
    properties: {
        type: Object,
    }
})

export const Product = models.Product || mongoose.model('Product', ProductSchema)