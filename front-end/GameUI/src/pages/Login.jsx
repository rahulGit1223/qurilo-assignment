import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../data/baseUrl";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is a token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Redirect to home if token exists
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login Failed");
      }

      const { token, role } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("role", role); // Store role in local storage
      alert("Login successful");
      navigate("/"); // Navigate to dashboard after successful login
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-black">
      <form className="bg-gray-900 p-6 rounded-md shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-white text-2xl mb-6">Login</h2>
        <input
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          type="submit"
        >
          Login
        </button>
        <p className="text-white mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign up here
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
