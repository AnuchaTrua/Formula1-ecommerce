import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("สมัครสมาชิกสำเร็จ");
      navigate("/login");
    } catch (err) {
      alert("เกิดข้อผิดพลาด");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-4 mx-auto space-y-4">
      <h2 className="text-2xl font-bold">สมัครสมาชิก</h2>
      <input name="username" placeholder="Username" className="w-full p-2 border" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" className="w-full p-2 border" onChange={handleChange} />
      <button className="px-4 py-2 text-white bg-blue-600 rounded">สมัคร</button>
    </form>
  );
};

export default Register;
