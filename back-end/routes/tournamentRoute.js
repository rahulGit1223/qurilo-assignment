const express = require("express");
const router = express.Router();
const { createTournament, getTournamentsByStatus, updateTournament, deleteTournament } = require("../controllers/tournamentController");
const adminAuth = require("../middleware/auth"); // Import the middleware

// Apply adminAuth middleware to both routes
router.post("/create", adminAuth, createTournament);
router.get("/tournaments/:status", adminAuth, getTournamentsByStatus);
router.put("/tournaments/:id", adminAuth, updateTournament);
router.delete("/tournaments/:id", adminAuth, deleteTournament)

module.exports = router;
