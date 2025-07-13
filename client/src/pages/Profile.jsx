// import { useEffect, useState } from "react";
// import axios from "axios";

// const Profile = () => {
//   const [orders, setOrders] = useState([]);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/orders/user/${userId}`)
//       .then((res) => setOrders(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="mb-4 text-2xl font-bold">โปรไฟล์ของฉัน</h2>
//       <h3 className="mb-2 text-lg font-semibold">ประวัติการสั่งซื้อ</h3>
//       {orders.length === 0 ? (
//         <p>ไม่มีคำสั่งซื้อ</p>
//       ) : (
//         <ul className="space-y-4">
//           {orders.map((order) => (
//             <li key={order._id} className="p-4 border rounded">
//               <p><strong>สถานะ:</strong> {order.status}</p>
//               <p><strong>รวม:</strong> {order.total} บาท</p>
//               <p className="text-sm text-gray-600">
//                 {new Date(order.createdAt).toLocaleString()}
//               </p>
//               <ul className="pl-5 mt-2 list-disc">
//                 {order.items.map((item) => (
//                   <li key={item.product._id}>
//                     {item.product.name} x {item.quantity}
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Profile;
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // import useAuth

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const { userId } = useAuth(); // ดึง userId จาก context แทน localStorage

  useEffect(() => {
    if (!userId) return; // เช็ค userId ก่อน เพื่อป้องกันเรียก API ตอนยังไม่ล็อกอิน

    axios
      .get(`http://localhost:5000/api/orders/user/${userId}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, [userId]); // รันใหม่เมื่อ userId เปลี่ยน

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">โปรไฟล์ของฉัน</h2>
      <h3 className="mb-2 text-lg font-semibold">ประวัติการสั่งซื้อ</h3>
      {orders.length === 0 ? (
        <p>ไม่มีคำสั่งซื้อ</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="p-4 border rounded">
              <p><strong>สถานะ:</strong> {order.status}</p>
              <p><strong>รวม:</strong> {order.total} บาท</p>
              <p className="text-sm text-gray-600">
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <ul className="pl-5 mt-2 list-disc">
                {order.items.map((item) => (
                    <li key={item.productId}>
                    {item.name} x {item.qty}
                    </li>
                ))}
            </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
