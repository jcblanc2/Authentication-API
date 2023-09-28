const express = require('express');
const app = express();
const cors = require('cors');
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
require('dotenv/config');

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => console.log("Connected to DB!"));

// Middleware
app.use(express.json());
app.use(cors());

// Routes Middleware
app.use('/api/user', authRoute);

// Start Server
app.listen(3000, () => {console.log(`Server is running! http://localhost:${process.env.PORT}`)});