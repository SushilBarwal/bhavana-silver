import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";
import { Input, Button } from "../components/common";
import { registerUser } from "../api/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    newsletter: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error or success when user types
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      const response = await registerUser(payload);
      console.log("Registration success:", response);

      if (response.success) {
        const token = response.token;
        const user = response.user;

        // Auto-login after registration
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user_info", JSON.stringify(user));

        console.log("Registration Successful!");

        // Redirect to account page
        navigate("/account");
      }
    } catch (err) {
      console.error("Registration failed:", err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-12 flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="section-heading text-3xl font-serif text-gray-900 mb-2">
            CREATE ACCOUNT
          </h2>
          <p className="text-gray-600 text-sm tracking-wide">
            Join us for a premium jewelry experience
          </p>
        </div>

        {success && (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center border border-green-200">
            <p className="font-medium mb-1">{success}</p>
            <p className="text-sm">
              <Link
                to="/login"
                className="underline hover:text-green-800 font-semibold"
              >
                Click here to Login
              </Link>
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              icon={FiUser}
            />
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              icon={FiUser}
            />
          </div>

          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            icon={FiMail}
          />

          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            icon={FiPhone}
            required
          />

          <div className="space-y-4">
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              icon={FiLock}
            />
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              icon={FiLock}
            />
          </div>

          <div className="flex items-center">
            <input
              id="newsletter"
              name="newsletter"
              type="checkbox"
              checked={formData.newsletter}
              onChange={handleChange}
              className="h-4 w-4 text-[#A67C7C] focus:ring-[#A67C7C] border-gray-300 rounded cursor-pointer"
            />
            <label
              htmlFor="newsletter"
              className="ml-2 block text-sm text-gray-700 cursor-pointer select-none"
            >
              Sign up for our newsletter
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-full flex justify-center py-4 bg-[#A67C7C] hover:bg-[#956D6D] text-white transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[#A67C7C] hover:text-[#956D6D] transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
