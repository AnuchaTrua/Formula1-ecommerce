// import { useCart } from "../context/CartContext";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const Cart = () => {
//   const { cart, removeFromCart, clearCart } = useCart();
//   const { token, userId } = useAuth();

//   const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

//   const handleCheckout = async () => {
//     if (!token || !userId) {
//       alert("กรุณาเข้าสู่ระบบก่อนสั่งซื้อ");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/orders", {
//         userId,
//         items: cart.map(item => ({
//           productId: item._id,
//           name: item.name,
//           qty: item.qty,
//           price: item.price,
//         })),
//         total,
//       });

//       alert("🛍️ สั่งซื้อเรียบร้อยแล้ว!");
//       clearCart();
//     } catch (err) {
//       console.error(err);
//       alert("❌ เกิดข้อผิดพลาดในการสั่งซื้อ");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="mb-4 text-2xl font-bold">🛒 ตะกร้าสินค้า</h1>

//       {cart.length === 0 ? (
//         <p>ไม่มีสินค้าในตะกร้า</p>
//       ) : (
//         <>
//           <ul className="space-y-4">
//             {cart.map((item) => (
//               <li
//                 key={item._id}
//                 className="flex items-center justify-between p-4 border rounded"
//               >
//                 <div>
//                   <h2 className="font-semibold">{item.name}</h2>
//                   <p className="text-sm text-gray-600">จำนวน: {item.qty}</p>
//                   <p className="text-sm text-gray-600">ราคา: {item.price} ฿</p>
//                 </div>
//                 <button
//                   onClick={() => removeFromCart(item._id)}
//                   className="text-red-500 hover:underline"
//                 >
//                   ลบ
//                 </button>
//               </li>
//             ))}
//           </ul>

//           <div className="mt-4 font-bold text-right">
//             รวมทั้งหมด: {total.toLocaleString()} ฿
//           </div>

//           <div className="mt-6 text-right">
//             {token ? (
//               <button
//                 onClick={handleCheckout}
//                 className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
//               >
//                 ✅ ยืนยันคำสั่งซื้อ
//               </button>
//             ) : (
//               <p className="text-red-600">กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ</p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;
// const Cart = () => {
//   const { cart, removeFromCart, clearCart } = useCart();
//   const { token, userId } = useAuth();

//   const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

//   const handleCheckout = async () => {
//     if (!token || !userId) {
//       alert("กรุณาเข้าสู่ระบบก่อนสั่งซื้อ");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/orders", {
//         userId,
//         items: cart.map((item) => ({
//           productId: item._id,
//           name: item.name,
//           qty: item.qty,
//           price: item.price,
//         })),
//         total,
//       });

//       alert("🛍️ สั่งซื้อเรียบร้อยแล้ว!");
//       clearCart();
//     } catch (err) {
//       console.error(err);
//       alert("❌ เกิดข้อผิดพลาดในการสั่งซื้อ");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="mb-4 text-2xl font-bold">🛒 ตะกร้าสินค้า</h1>

//       {cart.length === 0 ? (
//         <p>ไม่มีสินค้าในตะกร้า</p>
//       ) : (
//         <>
//           <ul className="space-y-4">
//             {cart.map((item) => (
//               <li
//                 key={item._id}
//                 className="flex items-center justify-between p-4 border rounded"
//               >
//                 <div>
//                   <h2 className="font-semibold">{item.name}</h2>
//                   <p className="text-sm text-gray-600">จำนวน: {item.qty}</p>
//                   <p className="text-sm text-gray-600">ราคา: {item.price} ฿</p>
//                 </div>
//                 <button
//                   onClick={() => removeFromCart(item._id)}
//                   className="text-red-500 hover:underline"
//                 >
//                   ลบ
//                 </button>
//               </li>
//             ))}
//           </ul>

//           <div className="mt-4 font-bold text-right">
//             รวมทั้งหมด: {total.toLocaleString()} ฿
//           </div>

//           <div className="mt-6 text-right">
//             {token && userId ? (
//               <button
//                 onClick={handleCheckout}
//                 className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
//               >
//                 ✅ ยืนยันคำสั่งซื้อ
//               </button>
//             ) : (
//               <p className="text-red-600">กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ</p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };


import { useCart } from "../context/CartContext";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { token, userId } = useAuth();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (!token || !userId) {
      alert("Please login before checkout");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/orders", {
        userId,
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          qty: item.qty,
          price: item.price,
        })),
        total,
      });

      alert("🛍️ Purchase succesfully!");
      clearCart();
    } catch (err) {
      console.error(err);
      alert("❌ เกิดข้อผิดพลาดในการสั่ง");
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">🛒 Cart</h1>

      {cart.length === 0 ? (
        <p>Nothing in cart</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-between p-4 border rounded"
              >
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">Quantity: {item.qty}</p>
                  <p className="text-sm text-gray-600">Price: {item.price} ฿</p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:underline"
                >
                  delete
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 font-bold text-right">
            Total: {total.toLocaleString()} ฿
          </div>

          <div className="mt-6 space-x-3 text-right">
            <button
              onClick={clearCart}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            >
              🗑️ Clear cart
            </button>

            {token && userId ? (
              <button
                onClick={handleCheckout}
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                ✅ Confirm
              </button>
            ) : (
              <p className="inline-block ml-2 text-red-600">
                Please login before checkout
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
