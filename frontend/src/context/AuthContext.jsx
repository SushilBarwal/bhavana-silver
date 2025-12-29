import { createContext, useContext, useState, useEffect } from "react";
import { loginUser as loginAPI } from "../api/auth";
import apiClient from "../api/client";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Migration: Check for old keys and migrate to new ones
    const oldToken = localStorage.getItem("authToken");
    const oldUser = localStorage.getItem("user");

    if (oldToken && !localStorage.getItem("auth_token")) {
      localStorage.setItem("auth_token", oldToken);
      localStorage.removeItem("authToken");
    }

    if (oldUser && !localStorage.getItem("user_info")) {
      localStorage.setItem("user_info", oldUser);
      localStorage.removeItem("user");
    }

    // Check for token on mount
    const token = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("user_info");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem("user_info");
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await loginAPI(credentials);

    if (data.success) {
      // Get the token from the response
      const token = data.token;
      const userData = data.user;

      // Store it securely in localStorage
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_info", JSON.stringify(userData));

      // Update user state
      setUser(userData);

      console.log("Login Successful!", userData);
    }

    return data; // Return data for UI to handle redirects
  };

  const logout = () => {
    // Remove new keys (current implementation)
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_info");

    // Also remove old keys (for backward compatibility)
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    setUser(null);
    // Optional: Redirect to login handled by components
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
