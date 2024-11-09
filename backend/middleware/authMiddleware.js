// backend/middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided, authorization denied' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = { _id: decoded.userId };
//         //console.log("Token in middleware:", req.header('Authorization'));

//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };

// module.exports = authMiddleware;
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Retrieve token from 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user; // Attach user info to request
        next();
    });
};

 module.exports = authenticateToken;

// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//     const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from the Authorization header

//     if (!token) {
//         return res.status(403).json({ message: 'Access denied. No token provided.' });
//     }

//     try {
//         // Verify token using the secret key
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
//         // Attach the userId to the request object
//         req.user = { userId: decoded.userId }; // Ensure the userId is attached to req.user

//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         console.error('Error verifying token:', error);
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };

// module.exports = authenticateToken;
