import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function EditProductPage() {

  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    setError(false)
    axios.get(`/api/products?id=${id}`)
      .then((res) => {
        if (res?.data._id) {
          setProduct(res.data)
        }
      })
      .catch((err) => setError(true))
  },[id])

  

  return (
    <Layout>
      {error && (
        <h1>Ups... Something goes wrong!</h1>
      )}
      {product.title && ( 
        <>
        <h1>Edit Product</h1>
        <ProductForm {...product}/>
        </>
        )}
    </Layout>
  )
}
