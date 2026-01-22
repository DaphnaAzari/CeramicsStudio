const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connected to database:", mongoose.connection.name);
        console.log("MongoDB host:", mongoose.connection.host);
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
    }
};

module.exports = connectDB;


// const mongoose = require('mongoose');
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.DATABASE_URI, {
//             // useUnifiedTopology: true,
//             useNewUrlParser: true
//         });
//         console.log("MongoDB connected")
//     } catch (err) {
//         console.error("MongoDB connection error:", err.message);

//     }
// };

// module.exports = connectDB