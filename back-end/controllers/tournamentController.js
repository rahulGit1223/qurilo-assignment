const Tournament = require("../models/tournamentModel");

const createTournament = async (req, res) => {
  console.log(req.body)

  const { name, entryFees, prizePool, maxPlayers, startTime, status } =
    req.body;

    console.log(req.body)
  try {
    const newTournament = new Tournament({
      name,
      entryFees,
      prizePool,
      maxPlayers,
      startTime,
      status,
    });
    console.log("unsaved")
    console.log(newTournament);
    const savedTournament = await newTournament.save();
    console.log("saved", savedTournament)
    res.status(201).json(savedTournament);
    

    // Auto saving, changing status
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


const getTournamentsByStatus = async(req, res)=>{
    const {status} = req.params;

    try{
        const tournaments = await Tournament.find({status});
        res.status(200).json(tournaments);
    } catch(e){
        res.status(500).json({error:e.message})
    }
};

const updateTournament = async (req, res) => {
  const { id } = req.params; // Get the tournament ID from the request parameters
  const { name, entryFees, prizePool, maxPlayers, startTime, status } = req.body;
   console.log(req.body);
  try {
    // Find the tournament by ID and update with new data
    const updatedTournament = await Tournament.findByIdAndUpdate(
      id,
      {
        name,
        entryFees,
        prizePool,
        maxPlayers,
        startTime,
        status,
      },
      { new: true } // Return the updated document
    );

    if (!updatedTournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    res.status(200).json(updatedTournament);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


const deleteTournament = async(req, res) => {
  const {id} = req.params;
  console.log(id)
    try {
      const result = await Tournament.findByIdAndDelete(id);

      if (!result) {
        return res.status(404).json({ message: 'Tournament not found' });
      }
      res.status(200).json({ message: 'Tournament deleted successfully' });
    } catch (error) {
      console.error('Error deleting tournament:', error);
      res.status(500).json({ message: 'Server error' });
    }
  
}

module.exports = { createTournament, getTournamentsByStatus, updateTournament, deleteTournament };
