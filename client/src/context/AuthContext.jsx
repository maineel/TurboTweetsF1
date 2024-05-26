import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedUser);


  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};