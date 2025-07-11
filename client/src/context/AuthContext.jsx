import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");

  const login = (token, isAdmin) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isAdmin", isAdmin);
    setToken(token);
    setIsAdmin(isAdmin);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
