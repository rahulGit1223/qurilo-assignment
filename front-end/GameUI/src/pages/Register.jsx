import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../data/baseUrl";

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "" });
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
    
    // Add your validation for admin role username here if needed
    if (formData.role === 'admin' && !formData.name.startsWith('ADMIN')) {
      return alert('Admin username must start with "ADMIN"');
    }

    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      alert("Registration successful");
      navigate("/login"); // Navigate to login after successful registration
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-black">
      <form className="bg-gray-900 p-6 rounded-md shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-white text-2xl mb-6">Register</h2>
        <input
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
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
        <select
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          type="submit"
        >
          Register
        </button>
        <p className="text-white mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
