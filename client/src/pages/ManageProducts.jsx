import { useEffect, useState } from "react";
import axios from "axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    if (confirm("ต้องการลบสินค้านี้หรือไม่?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts(); // รีโหลดใหม่
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">📦 จัดการสินค้า</h1>
      <ul className="space-y-4">
        {products.map((p) => (
          <li key={p._id} className="flex items-center justify-between p-4 border rounded">
            <div>
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-600">{p.price} ฿</p>
            </div>
            <button
              onClick={() => deleteProduct(p._id)}
              className="text-red-500 hover:underline"
            >
              ลบ
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
