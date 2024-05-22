const express = require("express");
const connectDB = require("./dbConfig");
const router = require("./src/router"); 
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const port = 3001;
app.use(cors({
  origin: 'http://127.0.0.1:5173', // Adjust this to match your frontend's origin
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true, // If your frontend needs to send cookies or authentication headers
}));

// Function to drop the unique index on userId in posts collection
const dropUniqueIndex = async () => {
  const db = mongoose.connection;
  try {
    const indexes = await db.collection('posts').indexes();
    const userIdIndex = indexes.find(index => index.name === 'userId_1');
    if (userIdIndex) {
      await db.collection('posts').dropIndex('userId_1');
      console.log("Unique index on userId removed");
    } else {
      console.log("Unique index on userId not found, no need to remove");
    }
  } catch (error) {
    console.error("Error dropping index:", error);
  }
};

// Initialize the server
const initializeServer = async () => {
  // Connect to the database
  await connectDB();

  // Drop the unique index
  await dropUniqueIndex();

  // Use the router
  app.use("/", router);

  // Start the server
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

// Initialize the server
initializeServer();


