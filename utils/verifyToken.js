const JWT = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send({ message: 'Access denied!' });

    try {
        const verified = JWT.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid token!' });
    }
}

module.exports = verifyToken;