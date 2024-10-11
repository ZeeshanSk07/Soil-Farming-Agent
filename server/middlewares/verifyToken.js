const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'token not found' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized', error });
    }
};

module.exports = {verifyToken};