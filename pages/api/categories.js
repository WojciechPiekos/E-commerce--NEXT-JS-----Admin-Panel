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
        const { name, parentCategory, properties } = req.body
        if (!name) {
            res.status(400).json({ message: false })
        }
        try {
            const response = await Category.create({name,
                parent: parentCategory || undefined, 
                properties
            })
            res.status(201).json(response)
        } catch (error) {
            console.log(error.message)
            res.status(500).json(error.message)
        }
    }

    if (method === 'PUT') {
        const { name, parentCategory, properties, _id } = req.body
        if (!name, !_id) {
            res.status(400).json({ message: false })
        }
        try {
            const response = await Category.findByIdAndUpdate(_id, {_id, 
                name, 
                parent: parentCategory || undefined , 
                properties
                }, 
                {new: true}
            )
            res.status(201).json(response)
        } catch (error) {
            console.log(error.message)
            res.status(500).json(error.message)
        }
    }

    if (method === 'DELETE') {
        const { id } = req.query


        if (!id) {
            res.status(400).json({ message: false })
        }

        try {
            const deletedCategory = await Category.findByIdAndDelete(id).exec()
            if (!deletedCategory) {
                res.status(400).json({message: false})
            }
            res.status(200).json({ message: true })
        } catch (error) {
            console.log(error.message)
            res.status(400).json({ message: false })
        }
    }
}