import { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    categories: [], // ✅ เพิ่มตรงนี้
  });

  const [categories, setCategories] = useState([]); // ✅ สำหรับเก็บหมวดหมู่จาก backend

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryToggle = (categoryId) => {
    setForm((prev) => {
      if (prev.categories.includes(categoryId)) {
        return {
          ...prev,
          categories: prev.categories.filter((id) => id !== categoryId),
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, categoryId],
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", {
        name: form.name,
        image: form.image,
        price: parseFloat(form.price),
        description: form.description,
        categories: form.categories, // ✅ ส่งแน่ ๆ
      });
      alert("เพิ่มสินค้าเรียบร้อยแล้ว");
      setForm({
        name: "",
        image: "",
        price: "",
        description: "",
        categories: [],
      });
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">➕ Add product</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <input
          name="name"
          placeholder="ชื่อสินค้า"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="image"
          placeholder="ลิงก์รูปภาพ"
          value={form.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          type="number"
          placeholder="ราคา"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="รายละเอียด"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* ✅ เลือกหมวดหมู่ */}
        <div>
          <label className="font-semibold">Choose category</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {["team", "type", "driver"].map((catType) => (
              <div key={catType}>
                <p className="mb-1 text-sm text-gray-600 capitalize">{catType}</p>
                {categories
                  .filter((c) => c.type === catType)
                  .map((cat) => (
                    <label key={cat._id} className="block">
                      <input
                        type="checkbox"
                        checked={form.categories.includes(cat._id)}
                        onChange={() => handleCategoryToggle(cat._id)}
                      />
                      <span className="ml-2">{cat.name}</span>
                    </label>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          เพิ่มสินค้า
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
