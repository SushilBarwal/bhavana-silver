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
    // Check for token on mount
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (token) {
      // Validate token or just set state if we trust localStorage for now
      // Ideally we'd verify with an API call like /auth/me
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse stored user", e);
          localStorage.removeItem("user");
        }
      }
      // Set default header for axios
      // Actually, the interceptor in client.js might handle this if it reads from localStorage?
      // But client.js reads update headers on each request?
      // Let's rely on client.js interceptor or env vars.
      // Wait, client.js Step 910:
      // headers: { Authorization: ... env variable }
      // It does NOT read from localStorage automatically for dynamic tokens!
      // I MUST add an interceptor or update defaults.

      // Update: client.js (Step 910) only sets static headers.
      // I need to update client.js or add interceptor.
      // For now, I will manually set default header here to be safe.
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await loginAPI(credentials);

    const token = data.token || data.access_token;
    const userData = data.user;

    if (token) {
      localStorage.setItem("authToken", token);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set global header
    }

    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } else {
      // Fallback if API doesn't return user object immediately (unlikely given previous steps)
      // Maybe decode JWT? For now assume API returns it.
      const fallbackUser = { email: credentials.email, name: "User" }; // Temp fallback
      setUser(fallbackUser);
    }
    return data; // Return data for UI to handle redirects
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    delete apiClient.defaults.headers.common["Authorization"];
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
