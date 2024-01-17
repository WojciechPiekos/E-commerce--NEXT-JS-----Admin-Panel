import Layout from "@/components/Layout";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProduct() {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [goToProducts, setGoToProducts] = useState(false)

  const router = useRouter()

  const createProduct = async (e) => {
    e.preventDefault()
    const data = {title, description, price}
    await axios.post('/api/products', data)
    setGoToProducts(true)
  }

  if (goToProducts) {
    router.push('/products')
  }

  return (
    <Layout>
      <h1>New Product</h1>
      <form onSubmit={createProduct}>
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
    </Layout>
  );
}
