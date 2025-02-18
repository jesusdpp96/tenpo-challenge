// context/AuthContext.tsx
import { createContext, useContext } from "react";
import { AuthContextType } from "../models";

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
