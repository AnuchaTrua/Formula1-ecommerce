// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
//   const [userId, setUserId] = useState(localStorage.getItem("userId")); // ✅ เพิ่ม

//   const login = (token, isAdmin, userId) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("isAdmin", isAdmin);
//     localStorage.setItem("userId", userId); // ✅ เก็บ userId ไว้
//     setToken(token);
//     setIsAdmin(isAdmin);
//     setUserId(userId); // ✅ ตั้งค่า
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("isAdmin");
//     localStorage.removeItem("userId"); // ✅ ลบตอน logout
//     setToken(null);
//     setIsAdmin(false);
//     setUserId(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, isAdmin, userId, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
//   const storedUserId = localStorage.getItem("userId");
//   const [userId, setUserId] = useState(
//     storedUserId && storedUserId !== "null" ? storedUserId : null
//   );

//   const login = (token, isAdmin, userId) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("isAdmin", isAdmin);
//     localStorage.setItem("userId", userId);
//     setToken(token);
//     setIsAdmin(isAdmin);
//     setUserId(userId);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("isAdmin");
//     localStorage.removeItem("userId");
//     setToken(null);
//     setIsAdmin(false);
//     setUserId(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, isAdmin, userId, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const storedUserId = localStorage.getItem("userId");
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
//   // const [userId, setUserId] = useState(
//   //   storedUserId && storedUserId !== "null" ? storedUserId : null
//   // );
//   const [userId, setUserId] = useState(
//     storedUserId && storedUserId !== "null" && storedUserId !== "" ? storedUserId : null
//   );

//   const login = (token, isAdmin, userId) => {
//     console.log("login called with:", { token, isAdmin, userId });

//     localStorage.setItem("token", token || "dummy-token");
//     localStorage.setItem("isAdmin", isAdmin);
//     // localStorage.setItem("userId", userId);
//     localStorage.setItem("userId", userId ? userId.toString() : "");


//     setToken(token || "dummy-token");
//     setIsAdmin(isAdmin);
//     setUserId(userId);
//   };



//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("isAdmin");
//     localStorage.removeItem("userId");
//     setToken(null);
//     setIsAdmin(false);
//     setUserId(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, isAdmin, userId, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUserId = localStorage.getItem("userId");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  const [userId, setUserId] = useState(
    storedUserId && storedUserId !== "null" ? storedUserId : null
  );

  const login = (token, isAdmin, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isAdmin", isAdmin);
    localStorage.setItem("userId", userId);

    setToken(token);
    setIsAdmin(isAdmin);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userId");
    setToken(null);
    setIsAdmin(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
