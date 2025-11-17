// const jwt = require('jsonwebtoken');
// const User = require('../Models/User');

// const protect = async (req, res, next) => {
//     let token = req.headers.authorization?.startsWith('Bearer')
//         ? req.headers.authorization.split(' ')[1]
//         : null;

//     if (!token) {
//         return res.status(401).json({ message: 'Not authorized, no token provided' });
//     }

//     try {
//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Load user
//         req.user = await User.findById(decoded.id).select('-password');
//         if (!req.user) {
//             return res.status(401).json({ message: 'User not found, token invalid' });
//         }

//         next();

//     } catch (error) {
//         console.error('Auth error:', error.message);
//         return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
// };

// module.exports = { protect };




const jwt = require('jsonwebtoken');
const User = require('../Models/User');
require('dotenv').config();

const protect = async (req, res, next) => {
    let token;

    // check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // extract token
            token = req.headers.authorization.split(' ')[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // attach user to request
            req.user = await User.findById(decoded.id).select('-password');

            // continue to next middleware/controller
            next();
        } catch (error) {
            console.error('Auth error:', error);
            return res.status(401).json({ message: 'Not authorized, invalid token' });
        }
    }

    // if no token:
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

module.exports = { protect };