import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";



const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ team: [], type: [], driver: [] });

  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const [proRes, catRes] = await Promise.all([
        axios.get("http://localhost:5000/api/products"),
        axios.get("http://localhost:5000/api/categories"),
      ]);
      setProducts(proRes.data);
      setFiltered(proRes.data);
      setCategories(catRes.data);
    };

    fetchData();
  }, []);

  // ฟังก์ชันจัดการการเลือก filter
  const toggleFilter = (type, id) => {
    const updated = { ...filters };
    if (updated[type].includes(id)) {
      updated[type] = updated[type].filter((i) => i !== id);
    } else {
      updated[type].push(id);
    }
    setFilters(updated);

    // ปรับ URL ให้ sync
    const newParams = new URLSearchParams();
    Object.keys(updated).forEach((key) => {
      updated[key].forEach((v) => newParams.append(key, v));
    });
    setSearchParams(newParams);
  };

  // อัปเดตสินค้าตาม filter
  useEffect(() => {
    if (products.length === 0) return;

    const allFilters = Object.values(filters).flat();

    if (allFilters.length === 0) {
      setFiltered(products);
      return;
    }

    const newFiltered = products.filter((product) =>
      allFilters.every((filterId) => product.categories.includes(filterId))
    );

    setFiltered(newFiltered);
  }, [filters, products]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {/* Sidebar filter */}
      <div className="md:col-span-1">
        <h2 className="mb-2 text-lg font-semibold">Filter</h2>
        {["team", "type", "driver"].map((catType) => (
          <div key={catType} className="mb-4">
            <h3 className="font-medium capitalize">{catType}</h3>
            {categories
              .filter((c) => c.type === catType)
              .map((cat) => (
                <label key={cat._id} className="block text-sm">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters[catType].includes(cat._id)}
                    onChange={() => toggleFilter(catType, cat._id)}
                  />
                  {cat.name}
                </label>
              ))}
          </div>
        ))}
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 gap-4 md:col-span-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div key={p._id} className="p-3 border rounded">
            <img src={p.image} alt={p.name} className="object-cover w-full h-48" />
            <h3 className="mt-2 text-lg font-bold">{p.name}</h3>
            <p className="text-gray-700">{p.price} บาท</p>
            <button
              onClick={() => addToCart(p)}
              className="px-4 py-1 mt-2 text-white bg-black rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
