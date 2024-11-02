// server.js
const express = require("express");
require('dotenv').config();
const http = require("http");
require("./models/index")
const sequelize = require("./configs/sequelize");



const app = require("./app"); // Import app setup

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
   //test server
   console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown function
function gracefulShutdown() {
   console.log("Received shutdown signal, shutting down gracefully...");
   server.close(() => {
      console.log("Closed out remaining connections");
      process.exit(0); // Exit the process once all connections are closed
   });

   // If connections don't close within 10 seconds, force close
   setTimeout(() => {
      console.error(
         "Could not close connections in time, forcefully shutting down"
      );
      process.exit(1); // Forcefully exit if it takes too long
   }, 10000);
}

// Catch `Ctrl + C` (SIGINT)
process.on("SIGINT", gracefulShutdown);

// Catch SIGTERM (when a termination signal is sent to the process, like when deployed in the cloud)
process.on("SIGTERM", gracefulShutdown);
