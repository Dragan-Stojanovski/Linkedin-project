const express = require("express");
const connectDB = require("./dbConfig");
const router = require("./src/router"); 
const cors = require("cors");

const app = express();
app.use(express.json());

const port = 3001;
app.use(cors({
  origin: 'http://127.0.0.1:5173', // Adjust this to match your frontend's origin
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true, // If your frontend needs to send cookies or authentication headers
}));

connectDB();
app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
