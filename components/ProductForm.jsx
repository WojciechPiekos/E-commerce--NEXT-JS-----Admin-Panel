import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || 0);
  const [goToProducts, setGoToProducts] = useState(false);

  const router = useRouter();

  const saveProduct = async (e) => {
    e.preventDefault();

    const data = { title, description, price };

    if (_id) {
      // update product
      try {
        await axios.put("/api/products", { ...data, _id });
      } catch (error) {
        console.log(error);
      }
    } else {
      // create product
      try {
        await axios.post("/api/products", data);
      } catch (error) {
        console.log(error);
      }
    }
    setGoToProducts(true);
  };

  if (goToProducts) {
    router.push("/products");
  }

  const uploadImages = async (e) => {

    const files = e.target?.files
    if (files?.length > 0) {
        const data = new FormData()
        for (const file of files) {
            data.append("file", file)
        }
        
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: data,
        })
        console.log(res)
    }

  };
    
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
        <label>Photos</label>
        <div className="mb-2">
          <label className="w-24 h-24 text-center flex justify-center items-center gap-1 text-sm text-gray-500 rounded-lg bg-gray-200 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Upload</div>
            <input
              type="file"
              name=""
              id=""
              className="hidden"
              onChange={uploadImages}
            />
          </label>
          {!images?.length && <div>No photos in this product</div>}
        </div>
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
  );
}
