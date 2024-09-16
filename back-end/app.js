const express = require("express");
const cors = require("cors");
const cronJobs = require("./autosetTimer/statusTime")

const app = express();
app.use(express.json())
app.use(cors())


// Controllers 
const tournamentRoute = require("./routes/tournamentRoute")
const userRoute = require("./routes/userRoute")

app.use("/api/v1", tournamentRoute);
app.use("/api/v1", userRoute)

// Initialized cron jobs
cronJobs();

module.exports = app