import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="p-4 transition border rounded-lg shadow hover:shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="object-cover w-full h-48 rounded"
      />
      <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="mt-1 font-bold text-blue-600">{product.price} ฿</p>
      <button
        className="px-4 py-1 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
