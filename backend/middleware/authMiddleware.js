const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // 1. Extract the Authorization header
    const authHeader = req.headers['authorization']; // Use lowercase to avoid case sensitivity

    // 2. Check if the header exists and has the "Bearer" format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid authorization header format' });
    }

    // 3. Split the header to extract the token
    const token = authHeader.split(' ')[1]; // Split "Bearer <token>"

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // 4. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 5. Attach user data to the request
        req.user = { userId: decoded.userId };
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticateToken;