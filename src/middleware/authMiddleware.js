const jwt = require('jsonwebtoken');

const protect = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            const error = new Error("Not authorized, no token");
            error.statusCode = 401;
            return next(error);
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Contains id, role (e.g., 'registrar'), and name

            // Role-Based Access Control (RBAC)
            if (roles.length && !roles.includes(req.user.role)) {
                const error = new Error(`Role ${req.user.role} is not authorized to access this route`);
                error.statusCode = 403;
                throw error;
            }

            next();
        } catch (err) {
            next(err);
        }
    };
};

module.exports = { protect };