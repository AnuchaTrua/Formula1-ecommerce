// // import { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";

// // const Login = () => {
// //   const [form, setForm] = useState({ username: "", password: "" });
// //   const navigate = useNavigate();
// //   const { login } = useAuth();
// //   const { token, isAdmin, userId } = res.data;

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post("http://localhost:5000/api/auth/login", form);
// //       // login(res.data.token, res.data.isAdmin);
// //       login(token, isAdmin, userId);
// //       alert("เข้าสู่ระบบสำเร็จ");
// //       if (res.data.isAdmin) {
// //         navigate("/admin/manage");
// //       } else {
// //         navigate("/");
// //       }
// //     } catch (err) {
// //       alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="max-w-md p-4 mx-auto space-y-4">
// //       <h2 className="text-2xl font-bold">เข้าสู่ระบบ</h2>
// //       <input
// //         name="username"
// //         placeholder="Username"
// //         className="w-full p-2 border"
// //         onChange={(e) => setForm({ ...form, username: e.target.value })}
// //       />
// //       <input
// //         name="password"
// //         type="password"
// //         placeholder="Password"
// //         className="w-full p-2 border"
// //         onChange={(e) => setForm({ ...form, password: e.target.value })}
// //       />
// //       <button className="px-4 py-2 text-white bg-blue-600 rounded">เข้าสู่ระบบ</button>
// //     </form>
// //   );
// // };

// // export default Login;
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", form);
//       console.log("Login response data:", res.data);

//       const user = res.data;
//       const token = "dummy-token"; // กำหนด dummy token เอง
//       const userId = user._id ? user._id.toString() : null; // แปลง ObjectId เป็น string
//       const isAdmin = user.isAdmin;

//       console.log({ token, userId, isAdmin });

//       if (!token || !userId) {
//         alert("ข้อมูลผู้ใช้ไม่ครบถ้วน");
//         return;
//       }

//       login(token, isAdmin, userId);

//       alert("เข้าสู่ระบบสำเร็จ");
//       if (isAdmin) {
//         navigate("/admin/manage");
//       } else {
//         navigate("/");
//       }
//     } catch (err) {
//       alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
//     }
//   };




//   return (
//     <form onSubmit={handleSubmit} className="max-w-md p-4 mx-auto space-y-4">
//       <h2 className="text-2xl font-bold">เข้าสู่ระบบ</h2>
//       <input
//         name="username"
//         placeholder="Username"
//         className="w-full p-2 border"
//         value={form.username}
//         onChange={(e) => setForm({ ...form, username: e.target.value })}
//       />
//       <input
//         name="password"
//         type="password"
//         placeholder="Password"
//         className="w-full p-2 border"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//       />
//       <button className="px-4 py-2 text-white bg-blue-600 rounded">เข้าสู่ระบบ</button>
//     </form>
//   );
// };

// export default Login;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      const { token, isAdmin, userId } = res.data;

      if (!token || !userId) {
        alert("ข้อมูลผู้ใช้ไม่ครบถ้วน");
        return;
      }

      login(token, isAdmin, userId);

      alert("เข้าสู่ระบบสำเร็จ");
      if (isAdmin) {
        navigate("/admin/manage");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-4 mx-auto space-y-4">
      <h2 className="text-2xl font-bold">เข้าสู่ระบบ</h2>
      <input
        name="username"
        placeholder="Username"
        className="w-full p-2 border"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full p-2 border"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="px-4 py-2 text-white bg-blue-600 rounded">เข้าสู่ระบบ</button>
    </form>
  );
};

export default Login;

