import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const router = useRouter();

  const { id } = router.query;
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`/api/products?id=${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const goBack = () => {
    router.push("/products");
  };

  const handleDelete = async () => {
    setError(false)
    await axios.delete(`/api/products?id=${id}`)
        .then((res) => {
            if (res.data.message === true) {
                router.push('/products')
            }
        })
        .catch(err => {
            setError(true)
        })
  }

  return (
    <Layout>
        {error && (
            <h1>Ups... Something goes wrong!</h1>
        )}
      {product.title && (
        <div className="flex flex-col w-full h-full items-center justify-center">
          <h1 className="text-center">Do you really want delete &nbsp;"{product.title}"?</h1>
          <div className="flex gap-2 justify-center">
            <button 
                className="btn-red"
                onClick={handleDelete}>
                    Yes
                </button>
            <button 
                className="btn-default" 
                onClick={goBack}>
                No
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
