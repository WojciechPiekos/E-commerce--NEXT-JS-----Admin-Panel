import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductForm({ 
    _id,
    title: existingTitle, 
    description: existingDescription, 
    price: existingPrice 
}) {

    const [title, setTitle] = useState(existingTitle || "")
    const [description, setDescription] = useState(existingDescription || "")
    const [price, setPrice] = useState(existingPrice || 0)
    const [goToProducts, setGoToProducts] = useState(false)
  
    const router = useRouter()
  
    const saveProduct = async (e) => {
      e.preventDefault()

      const data = {title, description, price}

      if (_id) {
        // update product
        try {
            await axios.put('/api/products', {...data, _id})
        } catch (error) {
            console.log(error)
        }
      } else {
        // create product
        try {
            await axios.post('/api/products', data) 
        } catch (error) {
            console.log(error)
        }
      }
      setGoToProducts(true)
    }
  
    if (goToProducts) {
      router.push('/products')
    }
  
    return (
        <>
            <form onSubmit={saveProduct}>
            <label htmlFor="product">Product</label>
            <input
                type="text"
                placeholder="product name"
                name="product"
                id="product"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="description">Description</label>
            <textarea
                placeholder="description"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label htmlFor="price">Price (in USD)</label>
            <input 
                type="number" 
                placeholder="price" 
                name="price" 
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
            <button className="btn-primary">Save</button>
            </form>
        </>
    )
}
