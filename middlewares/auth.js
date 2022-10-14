const jwt = require("jsonwebtoken");


const authMiddleWare = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json("No authentication token, authorization denied.");
        }
        token = req.headers.authorization.split(" ")[1];

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res.status(401).json("Token verification failed, authorization denied.");

        req.userId = verified.id;

        res.append('Access-Control-Allow-Origin', ['*']);
        res.append("Access-Control-Allow-Headers", ['*']);
        res.append('Access-Control-Allow-Methods', 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT');

        next();
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

module.exports = authMiddleWare;