import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";

// Performance monitoring (only in development)
if (import.meta.env.DEV) {
  import("./utils/performance").then(({ reportWebVitals }) => {
    reportWebVitals((metric) => {
      console.log("📊 Web Vital:", metric);
    });
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
