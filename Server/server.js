
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
//* only to be used in certain cases so this is changed

// Middleware
// app.use(express.json()); // parse JSON bodies

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



///____________

// const express = require('express');
// require('dotenv').config();
// const app = express();
// console.log('Cloudinary env check:', process.env.CLOUDINARY_CLOUD_NAME ? 'Loaded' : 'Missing');


// const workshopRoutes = require('./Routes/workshopRoutes');
// const userRoutes = require('./Routes/userRoutes');
// const mongoose = require('mongoose');
// const connectDB = require('./config/dbConn')
// const port = process.env.PORT || 3000;
// const User = require('./Models/User');
// const Workshop = require('./Models/Workshop');
// const bodyParser = require('body-parser');
// const cors = require('cors');


// // connect to mongoDB
// console.log("1")
// connectDB();
// console.log("2")

// //Middleware:
// // parse application/json
// app.use(bodyParser.json())
// // CORS middleware to handle cross-origin requests
// app.use(cors())


// //Routes:
// app.use('/workshop', workshopRoutes);

// app.use('/user', userRoutes);
// //Start server after DB is ready:

// mongoose.connection.once('open', () => {
//     console.log('Connected to MongoDB');
//     app.listen(3000, () => {
//         console.log('serving app on port 3000!')
//     });
// })
