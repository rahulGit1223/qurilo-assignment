import React, { useState } from "react";
import { BASE_URL } from "../data/baseUrl";

const formFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "entryFees", label: "Entry Fees", type: "text" },
  { name: "prizePool", label: "Prize Pool", type: "text" },
  { name: "maxPlayers", label: "Max Players", type: "number" },
  { name: "startTime", label: "Start Time", type: "datetime-local" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["upcoming", "ongoing", "completed"],
  },
];

const TournamentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    entryFees: "",
    prizePool: "",
    maxPlayers: "",
    startTime: "",
    status: "upcoming",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      // Make the API request
      const response = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header

          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Pass FormData directly
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setSuccessMessage("Tournament created successfully");
      setErrorMessage("");

      // Reset the formData state
      setFormData({
        name: "",
        entryFees: "",
        prizePool: "",
        maxPlayers: "",
        startTime: "",
        status: "upcoming",
      });
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Error creating tournament: " + error.message);
    }
  };

  // Helper function to create input fields
  const renderField = (field) => {
    const { name, label, type, options } = field;
    return type === "select" ? (
      <div className="w-full md:w-1/2 px-2 mb-4">
        <label className="block text-gray-400 mb-2">{label}</label>
        <select
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 rounded-md text-black"
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-gray-800 text-white"
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>
    ) : (
      <div className="w-full md:w-1/2 px-2 mb-4">
        <label className="block text-gray-400 mb-2">{label}</label>
        <input
          type={type}
          name={name}
          value={type === "file" ? "" : formData[name] || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 rounded-md text-black"
        />
      </div>
    );
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="p-2 mt-6 text-white rounded-md shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Create Tournament</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap -mx-2 mb-4">
            {formFields.slice(0, 2).map(renderField)}
          </div>
          <div className="flex flex-wrap -mx-2 mb-4">
            {formFields.slice(2, 4).map(renderField)}
          </div>
          <div className="flex flex-wrap -mx-2 mb-4">
            {formFields.slice(4, 6).map(renderField)}
          </div>
          <div className="flex flex-wrap -mx-2 mb-4">
            {formFields.slice(6).map(renderField)}
          </div>
          {/* Error and Success Messages */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Create Tournament
          </button>
        </form>
      </div>
    </div>
  );
};

export default TournamentForm;
