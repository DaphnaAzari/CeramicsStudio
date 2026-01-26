
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const cors = require('cors');

const workshopRoutes = require('./Routes/workshopRoutes');
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

//in order to see every request that hits my backend
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


// Enable CORS so frontend can call backend
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


// Only parse JSON for non-multipart routes
app.use((req, res, next) => {
    if (req.is('multipart/form-data')) {
        // skip express.json for file uploads
        return next();
    }
    express.json()(req, res, next);
});

// Routes

app.use('/users', userRoutes); // notice /users matches frontend fetch
app.use('/workshop', workshopRoutes);
app.use('/products', productRoutes);

// Start server after DB connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});



