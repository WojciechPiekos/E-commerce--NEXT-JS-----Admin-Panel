import { mongooseConnect } from "@/lib/mongoose"
import { Category } from "@/models/Category"


export default async function handle(req,res) {
    const { method } = req
    await mongooseConnect()
    
    if (method === "GET") {
        try {
            const response = await Category.find().populate('parent')
            if (!response) {
                res.status(404).json({ message: "No category found" })
            }
            res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ message: "Internal server error" })
        }
    }
    
    
    if (method === 'POST') {
        const { name, parentCategory } = req.body
        if (!name) {
            res.status(400).json({ message: false })
        }
        try {
            const response = await Category.create({name, parent: parentCategory})
            res.status(201).json(response)
        } catch (error) {
            console.log(error.message)
            res.status(500).json(error.message)
        }
    }
}