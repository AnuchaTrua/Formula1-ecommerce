import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status });
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status } : o))
    );
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">คำสั่งซื้อทั้งหมด</h2>
      {orders.map((order) => (
        <div key={order._id} className="p-4 mb-4 border rounded">
          <p><strong>ผู้ใช้:</strong> {order.user.email}</p>
          <p><strong>รวม:</strong> {order.total} บาท</p>
          <p><strong>สถานะ:</strong> 
            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              className="px-2 py-1 ml-2 border rounded"
            >
              <option value="pending">รอดำเนินการ</option>
              <option value="shipped">จัดส่งแล้ว</option>
              <option value="cancelled">ยกเลิก</option>
            </select>
          </p>
          <ul className="pl-5 mt-2 list-disc">
            {order.items.map((item) => (
                <li key={item.productId}>
                    {item.name} x {item.qty}
                </li>
                ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
