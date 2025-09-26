require('dotenv').config();
const express = require('express');
const app = express();
const workshopRoutes = require('./Routes/workshopRoutes');
const userRoutes = require('./Routes/userRoutes');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn')
const port = process.env.PORT || 3000;
const User = require('./Models/User');
const Workshop = require('./Models/Workshop');
const bodyParser = require('body-parser');
const cors = require('cors');


// connect to mongoDB
console.log("1")
connectDB();
console.log("2")

//Middleware:
// parse application/json
app.use(bodyParser.json())
// CORS middleware to handle cross-origin requests
app.use(cors())

// app.get('/', (req, res) => {
//     console.log('Here')
//     res.status(200).json({ message: "Welcome!" })
// })


// To start using router:

// Specifically to do so with all the routes that start with /classes:
//Routes:
app.use('/workshop', workshopRoutes);

app.use('/user', userRoutes);
//Start server after DB is ready:

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('serving app on port 3000!')
    });
})
