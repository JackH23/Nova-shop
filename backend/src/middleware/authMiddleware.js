const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {
            return res.status(401).json({
                message: "Access token is required",
            });
        }

        const accessToken = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            accessToken,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Access token expired",
            });
        }

        return res.status(401).json({
            message: "Invalid access token",
        });
    }
};

module.exports = authMiddleware;