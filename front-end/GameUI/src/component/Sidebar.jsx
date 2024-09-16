import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa"; // Importing cross icon
import { BASE_URL } from "../data/baseUrl";

const Sidebar = ({ onCollapsed }) => {
  const navigate = useNavigate();
  
  // Check the user role from local storage
  const role = localStorage.getItem("role");

  const handleLogout = async () => {
    try {
      // Call the logout API route
      const response = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include the token if required by your backend
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
      }

      // Remove the token from local storage
      localStorage.removeItem("token");

      // Remove the role from local storage
      localStorage.removeItem("role");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-full transition-transform duration-300 ease-in-out">
      <button onClick={onCollapsed} className="text-2xl p-4 ml-auto">
        <FaTimes />
      </button>
      <div className="flex justify-between items-center p-6">
        <span className="text-2xl font-bold">Game Dashboard</span>
      </div>
      <nav className="flex flex-col space-y-2 p-4">
        <Link
          to={"/"}
          className="text-xl font-bold hover:bg-gray-700 p-2 rounded-md mb-4"
        >
          Home
        </Link>
        {/* Conditionally render the Events section based on the role */}
        {role === "admin" && (
          <div className="flex flex-col">
            <h2 className="text-2xl mb-4">Events</h2>
            <div className="flex flex-col gap-2">
              <Link
                to={"/create"}
                className="text-md font-semibold hover:bg-gray-700 p-2 rounded-md"
              >
                Create Tournament
              </Link>
              <Link
                to={"/upcoming"}
                className="text-md font-semibold hover:bg-gray-700 p-2 rounded-md"
              >
                Upcoming Tournament
              </Link>
              <Link
                to={"/ongoing"}
                className="text-md font-semibold hover:bg-gray-700 p-2 rounded-md"
              >
                Ongoing Tournament
              </Link>
              <Link
                to={"/completed"}
                className="text-md font-semibold hover:bg-gray-700 p-2 rounded-md"
              >
                Completed Tournaments
              </Link>
            </div>
          </div>
        )}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 mb-4 mx-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
