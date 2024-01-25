import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';


function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
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
    const data = { name, parentCategory }
    if (editedCategory) {
      try {
        axios.put(`/api/categories`, {...data, _id: editedCategory._id})
      } catch (error) {
        console.log(error.message)
      }
      setName("");
      setParentCategory("")
      setEditedCategory(null)
      fetchCategories();
    } else {
      try {
        await axios.post("/api/categories", data);
      } catch (error) {
        console.log(error.message);
      }
      setName("");
      setParentCategory("")
      fetchCategories();
    }
    
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setName(category.name)
    setParentCategory(category.parent?._id)
  };

  const deleteCategory = (category) => {
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want delete ${category.name}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: 'red',
      reverseButtons: true,
    }).then(result => {
        if (result.isConfirmed) {
          try {
            const res = axios.delete(`/api/categories?id=${category._id}`)
            if (!res) {
              console.log("Nie ma takiego id")
            }
          } catch (error) {
            console.log(error.message)
          }
          fetchCategories() 
        }
    })
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label htmlFor="cat_name">
        {editedCategory ? `Edit category ${editedCategory.name}` : "Create new category"}
      </label>
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
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value="">No parent category</option>
          {categories.length > 0 &&
            categories.map((item) => (
              <option value={item._id} key={item._id}>{item.name}</option>
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
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item?.parent?.name}</td>
                <td>
                  <div className="flex gap-1 justify-end">
                    <button
                      onClick={() => editCategory(item)}
                      className="btn-primary"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteCategory(item)}
                      className="btn-primary">
                        Delete
                      </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}


export default withSwal(({swal}, ref) => (
  <Categories swal={swal}/>
))
