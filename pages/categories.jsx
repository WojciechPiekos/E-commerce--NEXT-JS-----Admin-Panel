import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("/api/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/categories", { name, parentCategory });
    } catch (error) {
      console.log(error.message);
    }
    setName("");
    fetchCategories();
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label htmlFor="cat_name">New category name</label>
      <form className="flex gap-1" onSubmit={saveCategory}>
        <input
          className="mb-0"
          type="text"
          placeholder="Category name"
          id="cat_name"
          name="cat_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select 
          className="mb-0" 
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}>
          <option value="">No parent category</option>
          {categories.length > 0 &&
            categories.map((item) => (
              <option value={item._id}>{item.name}</option>
            ))}
        </select>
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item?.parent?.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
