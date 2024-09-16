const mongoose = require("mongoose")

const tournamentSchema = new mongoose.Schema({
    name: { type: String, required: true },
  entryFees: { type: Number, required: true },
  prizePool: { type: Number, required: true },
  maxPlayers: { type: Number, required: true, min: 1 },
  startTime: { type: Date, required: true },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], required: true },
  statusUpdatedAt: {
    type: Date,
    default: Date.now
  },  
}, { timestamps: true });

  const Tournament = mongoose.model('Tournament', tournamentSchema);

  module.exports = Tournament;