import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">🛒 ตะกร้าสินค้า</h1>
      {cart.length === 0 ? (
        <p>ไม่มีสินค้าในตะกร้า</p>
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
                  <p className="text-sm text-gray-600">จำนวน: {item.qty}</p>
                  <p className="text-sm text-gray-600">ราคา: {item.price} ฿</p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:underline"
                >
                  ลบ
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-bold text-right">
            รวมทั้งหมด: {total} ฿
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
