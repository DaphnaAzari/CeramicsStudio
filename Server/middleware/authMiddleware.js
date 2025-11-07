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
            res.status(401).json({ message: 'Not authorized, invalid token' });
        }
    }

    // if no token:
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

module.exports = { protect };