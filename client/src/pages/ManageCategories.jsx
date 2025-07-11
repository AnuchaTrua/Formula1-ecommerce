import { useEffect, useState } from "react";
import axios from "axios";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", type: "team" });
  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/categories/${editId}`, form);
      } else {
        await axios.post("http://localhost:5000/api/categories", form);
      }
      setForm({ name: "", type: "team" });
      setEditId(null);
      fetchCategories();
    } catch (err) {
      alert("เกิดข้อผิดพลาด");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("ต้องการลบหมวดหมู่นี้หรือไม่?")) {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    }
  };

  const handleEdit = (cat) => {
    setEditId(cat._id);
    setForm({ name: cat.name, type: cat.type });
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">🏷️ จัดการหมวดหมู่</h1>

      <form onSubmit={handleSubmit} className="max-w-md space-y-2">
        <input
          type="text"
          name="name"
          placeholder="ชื่อหมวดหมู่"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="team">ทีม</option>
          <option value="type">ประเภทสินค้า</option>
          <option value="driver">นักแข่ง</option>
        </select>

        <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          {editId ? "อัปเดต" : "เพิ่ม"} หมวดหมู่
        </button>
      </form>

      <hr className="my-6" />

      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat._id} className="flex items-center justify-between p-3 border rounded">
            <div>
              <strong>{cat.name}</strong> <span className="text-sm text-gray-500">({cat.type})</span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(cat)}
                className="text-yellow-600 hover:underline"
              >
                แก้ไข
              </button>
              <button
                onClick={() => handleDelete(cat._id)}
                className="text-red-600 hover:underline"
              >
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCategories;
