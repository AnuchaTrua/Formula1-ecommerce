
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import ManageProducts from "./pages/ManageProducts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ManageCategories from "./pages/ManageCategories";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import { useState, useEffect } from "react";
import ProductsByTeam from "./pages/ProductsByTeam";


import axios from "axios";

// function App() {
//   const { cart } = useCart();
//   const { token, isAdmin, logout } = useAuth();

//   return (
//     <Router>
//       <header className="flex items-center justify-between p-4 text-white bg-blue-600">
//         <div className="flex items-center space-x-4">
//           <Link to="/" className="text-xl font-bold">MiniStore</Link>
//           {isAdmin && (
//             <>
//               <Link to="/admin/add" className="hover:underline">Add</Link>
//               <Link to="/admin/manage" className="hover:underline">Manage</Link>
//               <Link to="/admin/categories" className="hover:underline">Manage Categories</Link>
//             </>
//           )}
//         </div>

//         <div className="flex items-center space-x-3">
//           <Link to="/cart" className="px-3 py-1 text-blue-600 bg-white rounded hover:bg-gray-100">
//             Cart ({cart.length})
//           </Link>

//           {!token ? (
//             <>
//               <Link to="/login" className="hover:underline">Login</Link>
//               <Link to="/register" className="hover:underline">Register</Link>
//             </>
//           ) : (
//             <button onClick={logout} className="text-white hover:underline">Logout</button>
//           )}
//         </div>
//       </header>

//       <main className="max-w-6xl p-4 mx-auto">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/admin/add" element={<AddProduct />} />
//           <Route path="/admin/manage" element={<ManageProducts />} />
//           <Route path="/admin/categories" element={<ManageCategories />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </main>
//     </Router>
//   );
// }

// export default App;
function App() {
  const { cart } = useCart();
  const { token, isAdmin, logout } = useAuth();

  const [teams, setTeams] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => {
        // กรองเอาเฉพาะหมวด team
        const teamCats = res.data.filter((c) => c.type === "team");
        setTeams(teamCats);
      })
      .catch(console.error);
  }, []);

  return (
    <Router>
      <header className="relative flex items-center justify-between p-4 text-white bg-blue-600">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold">
            MiniStore
          </Link>

          {/* Dropdown ทีม */}
          <div className="relative">
            <button
              className="px-3 py-1 bg-blue-700 rounded hover:underline"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              ทีม F1 ▼
            </button>

            {dropdownOpen && (
              <div className="absolute bg-white text-black mt-1 rounded shadow-lg z-10 min-w-[150px]">
                {teams.map((team) => (
                  <Link
                    key={team._id}
                    to={`/products/team/${team._id}`}
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {team.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Admin Links */}
          {isAdmin && (
            <>
              <Link to="/admin/add" className="px-3 py-1 rounded hover:underline">
                Add
              </Link>
              <Link
                to="/admin/manage"
                className="px-3 py-1 rounded hover:underline"
              >
                Manage
              </Link>
              <Link
                to="/admin/categories"
                className="px-3 py-1 rounded hover:underline"
              >
                Manage Categories
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/cart"
            className="px-3 py-1 text-blue-600 bg-white rounded hover:bg-gray-100"
          >
            Cart ({cart.length})
          </Link>

          {!token ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="px-3 py-1 text-white rounded hover:underline"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Routes */}
      <main className="max-w-6xl p-4 mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/add" element={<AddProduct />} />
          <Route path="/admin/manage" element={<ManageProducts />} />
          <Route path="/admin/categories" element={<ManageCategories />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* เพิ่ม Route สำหรับหน้าแสดงสินค้าของทีม */}
          <Route path="/products/team/:teamId" element={<ProductsByTeam />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;


