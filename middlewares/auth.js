const jwt = require("jsonwebtoken");


const authMiddleWare = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token)
            return res.status(401).json("No authentication token, authorization denied.");

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res.status(401).json("Token verification failed, authorization denied.");

        req.userId = verified.id;
        next();
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

module.exports = authMiddleWare;