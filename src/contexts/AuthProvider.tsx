import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Verificar token al montar el componente
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = (): boolean => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      return true;
    }
    // setIsAuthenticated(false);
    return false;
  };

  const login = (token: string): void => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    navigate("/home");
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const getToken = (): string | null => {
    return localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, checkAuth, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
