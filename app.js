// imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

// db connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to db...🔌"))
    .catch(() => console.log("Could not connect to db...❌"));

// middlewares
app.use(cors());
app.use(express.json())

// routes
app.use("/api/auth", require("./routes/auth.js"));

// port and server listening
const port = process.env.PORT
app.listen(port, () => {
    console.log("Server is running...🏃‍♀️")
})