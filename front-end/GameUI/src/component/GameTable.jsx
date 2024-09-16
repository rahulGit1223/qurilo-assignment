import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Modal from "react-modal"; // Import react-modal
import { BASE_URL } from "../data/baseUrl";

// Ensure modal is attached to the app element
Modal.setAppElement("#root");

const GameTable = ({ status }) => {
  const [tournaments, setTournaments] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage

        const response = await fetch(`${BASE_URL}/tournaments/${status}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!response.ok) {
          // Handle HTTP errors
          const errorData = await response.json();
          throw new Error(errorData.error || "Network response was not ok.");
        }

        const data = await response.json();
        setTournaments(data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };
    fetchTournaments();
  }, [status, setTournaments]);

  const handleEdit = (tournament) => {
    setSelectedTournament(tournament);
    setEditModalOpen(true);
    
  };

  console.log("selected tournament",selectedTournament)

  const handleDelete = (tournament) => {
    setSelectedTournament(tournament);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${BASE_URL}/tournaments/${selectedTournament._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

      });
      setTournaments(tournaments.filter((t) => t.id !== selectedTournament.id));
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting tournament:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/tournaments/${selectedTournament._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedTournament),
      });


      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      setTournaments(
        tournaments.map((t) =>
          t.id === selectedTournament.id ? selectedTournament : t
        )
      );
      setSuccessMessage("Tournament updated successfully");
      setErrorMessage("");
      setEditModalOpen(false);
    } catch (error) {
      setErrorMessage("Error updating tournament: " + error.message);
      setSuccessMessage("");
    }
  };

  const closeModals = () => {
    setDeleteModalOpen(false);
    setEditModalOpen(false);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Entry Fees", selector: (row) => row.entryFees, sortable: true },
    {
      name: "Prize Pool",
      selector: (row) => row.prizePool,
      sortable: true,
      format: (row) => `$${row.prizePool.toLocaleString()}`,
    },
    { name: "Max Players", selector: (row) => row.maxPlayers, sortable: true },
    {
      name: "Start Time",
      selector: (row) => row.startTime,
      sortable: true,
      format: (row) => formatDate(row.startTime),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white p-1 rounded"
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white p-1 rounded"
            onClick={() => handleDelete(row)}
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const customStyles = {
    header: {
      style: {
        background: "linear-gradient(to right, #000000, #333333)",
        color: "white",
      },
    },
    headCells: {
      style: {
        background: "linear-gradient(to right, #000000, #333333)",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    rows: {
      style: {
        background: "linear-gradient(to right, #111111, #222222)",
        color: "white",
      },
    },
    cells: { style: { color: "white" } },
    pagination: {
      style: {
        background: "linear-gradient(to right, #000000, #333333)",
        color: "white",
      },
    },
  };

  return (
    <div className="w-full mx-auto min-h-screen">
      <DataTable
        title={`Tournaments (${status})`}
        columns={columns}
        data={tournaments}
        pagination
        highlightOnHover
        striped
        selectableRows
        customStyles={customStyles}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeModals}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            background: "linear-gradient(to right, #000000, #333333)",
            color: "white",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
            backdropFilter: "blur(5px)", // Blur effect
          },
        }}
      >
        <h2 className="text-white">Confirm Delete</h2>
        <p className="text-white">
          Are you sure you want to delete this tournament?
        </p>
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={confirmDelete}
        >
          Yes, Delete
        </button>
        <button
          className="bg-gray-500 text-white p-2 rounded"
          onClick={closeModals}
        >
          Cancel
        </button>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeModals}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            background: "linear-gradient(to right, #000000, #333333)",
            color: "white",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
            backdropFilter: "blur(5px)", // Blur effect
          },
        }}
      >
        <h2 className="text-white">Edit Tournament</h2>
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-gray-400 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={selectedTournament?.name || ""}
                onChange={(e) =>
                  setSelectedTournament({
                    ...selectedTournament,
                    name: e.target.value,
                  })
                }
                placeholder="Name"
                className="w-full p-2 border border-gray-600 rounded-md text-black"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-gray-400 mb-2">Entry Fees</label>
              <input
                type="number"
                name="entryFees"
                value={selectedTournament?.entryFees || ""}
                onChange={(e) =>
                  setSelectedTournament({
                    ...selectedTournament,
                    entryFees: parseFloat(e.target.value),
                  })
                }
                placeholder="Entry Fees"
                className="w-full p-2 border border-gray-600 rounded-md text-black"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-gray-400 mb-2">Prize Pool</label>
              <input
                type="number"
                name="prizePool"
                value={selectedTournament?.prizePool || ""}
                onChange={(e) =>
                  setSelectedTournament({
                    ...selectedTournament,
                    prizePool: parseFloat(e.target.value),
                  })
                }
                placeholder="Prize Pool"
                className="w-full p-2 border border-gray-600 rounded-md text-black"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-gray-400 mb-2">Max Players</label>
              <input
                type="number"
                name="maxPlayers"
                value={selectedTournament?.maxPlayers || ""}
                onChange={(e) =>
                  setSelectedTournament({
                    ...selectedTournament,
                    maxPlayers: parseInt(e.target.value, 10),
                  })
                }
                placeholder="Max Players"
                className="w-full p-2 border border-gray-600 rounded-md text-black"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-gray-400 mb-2">Start Time</label>
              <input
                type="datetime-local"
                name="startTime"
                value={selectedTournament?.startTime || ""}
                onChange={(e) =>
                  setSelectedTournament({
                    ...selectedTournament,
                    startTime: e.target.value,
                  })
                }
                placeholder="Start Time"
                className="w-full p-2 border border-gray-600 rounded-md text-black"
              />
            </div>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white p-2 rounded"
              onClick={closeModals}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default GameTable;
