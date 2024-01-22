import clientPromise from '@/lib/mongodb'
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import mongoose from 'mongoose';


export default async function handler(req,res) {
    const { method } = req

    await mongooseConnect()

    mongoose.Promise = clientPromise;

    if (method === "GET") {

        if (req.query?.id) {
            console.log(req.query.id)
            try {
                const product = await Product.findById(req.query.id).exec()
                console.log(product)
                if (!product) {
                    res.status(404).json({ message: "Selectet product does not exist" })
            } else {
                res.status(200).json(product)
            }
            } catch (error) {
                res.status(404).json({ message: error.message })
            }
            
        } else {
            try {
                const productsData = await Product.find()
                if (productsData.length !== 0) {
                    res.status(200).json(productsData)
                } else {
                    res.status(400).json({ message: "No products found" })
            }
            } catch (error) {
                res.status(500).json({ message: error.message })
            }
            
        }
    }

    if (method === "POST") {

        const { title, description, price } = req.body

        if (!title || price === 0) {
            res.status(400).json({ message: "All fileds are required" })
        }
        try {
            const productDocument = await Product.create({
            title, description, price
            })
            res.status(201).json(productDocument)    
        } catch (error) {
            res.status(400).json({message: error.message})
        }

    } 

    if (method === "PUT") {

        const { _id, title, description, price } = req.body

        try {
            const updatedProduct = await Product.findByIdAndUpdate(_id, {title, description, price}, {new:true}).exec() 
            res.status(200).json(updatedProduct) 
        } catch (error) {
           res.status(500).json({ message: error.message }) 
        }
    }

    if (method === "DELETE") {
        const id = req?.query?.id

        if (!id) {
            res.status(400).json({ message: false })
        }

        try {
            const deletedProduct = await Product.findByIdAndDelete(id).exec()
            if (!deletedProduct) {
                res.status(400).json({message: false})
            }
            res.status(200).json({ message: true })
        } catch (error) {
            console.log(error.message)
            res.status(400).json({ message: false })
        }
    }
}
