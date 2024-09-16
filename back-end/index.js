const dotenv = require("dotenv");
dotenv.config({path: 'config/config.env'}); // Load the environment variables
const app = require("./app");

const connectDB = require("./config/db");
const http = require("http");


// connecting db
connectDB();

dotenv.config(); 


const server = http.createServer(app)
server.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
