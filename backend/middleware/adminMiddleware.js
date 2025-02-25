const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Check if user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden: Admins only' });
        }

        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
