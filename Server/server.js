require('dotenv').config();
const express = require('express');
const app = express();
const workshopRoutes = require('./Routes/workshopRoutes');
const userRoutes = require('./Routes/userRoutes');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn')
const port = process.env.PORT || 8080;
const User = require('./Models/User');
const Workshop = require('./Models/Workshop');
const bodyParser = require('body-parser');


// connect to mongoDB
console.log("1")
connectDB();
console.log("2")


// parse application/json
app.use(bodyParser.json())


// app.get('/', (req, res) => {
//     console.log('Here')
//     res.status(200).json({ message: "Welcome!" })
// })


// To start using router:

// Specifically to do so with all the routes that start with /classes:

app.use('/workshop', workshopRoutes);

app.use('/user', userRoutes);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('serving app on port 3000!')
    });
})
