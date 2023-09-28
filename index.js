const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/auth');
const mongoose = require('mongoose');
require('dotenv/config');

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/user', authRouter);

// Routes
app.get('/', (req, res) => {
    res.send('Hello World! -- Home');
});

// Connect to DB
// mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => console.log("Connected to DB!"));

// Start Server
app.listen(3000, () => {console.log(`Server is running! http://localhost:${process.env.PORT}`)});