import clientPromise from '@/lib/mongodb'
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import mongoose from 'mongoose';


export default async function handler(req,res) {
    const { method } = req
    const { title, description, price } = req.body

    await mongooseConnect()

    if (!title || price === 0) {
        res.status(400).json({ message: "All fileds are required" })
    }

    mongoose.Promise = clientPromise;

    if (method === "POST") {
        const productDocument = await Product.create({
            title, description, price
        })

        res.status(201).json(productDocument)
    } 
}
