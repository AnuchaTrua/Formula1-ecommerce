import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductsByTeam = () => {
  const { teamId } = useParams();
  const [products, setProducts] = useState([]);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    // ดึงชื่อทีม
    axios
      .get(`http://localhost:5000/api/categories/${teamId}`)
      .then((res) => {
        setTeamName(res.data.name);
      })
      .catch(() => setTeamName("ทีมนี้"));

    // ดึงสินค้าที่มีหมวดหมู่ teamId
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        // กรองสินค้าที่มี categories ตรงกับ teamId
        const filtered = res.data.filter((product) =>
          product.categories.some((catId) =>
            typeof catId === "string"
              ? catId === teamId
              : catId._id === teamId
          )
        );
        setProducts(filtered);
      })
      .catch(console.error);
  }, [teamId]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Product of this team</h1>
      {products.length === 0 && <p>ไม่มีสินค้าในทีมนี้</p>}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {products.map((p) => (
          <div key={p._id} className="p-4 border rounded">
            <img
              src={p.image}
              alt={p.name}
              className="object-cover w-full h-48 rounded"
            />
            <h2 className="mt-2 text-lg font-semibold">{p.name}</h2>
            <p className="font-bold text-red-600">{p.price} บาท</p>
            <Link
              to={`/product/${p._id}`}
              className="block mt-2 text-blue-600 hover:underline"
            >
              ดูรายละเอียด
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsByTeam;
