import Jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                const payload = await Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                if (payload) {
                    req.user = payload;
                    next();
                } else {
                    res.status(400).json({ message: "token verification failed" });
                }
            } else {
                res.status(400).json({ message: "malformed auth header" });
            }
        } else {
            res.status(401).json({ message: "Auth failed" });
        }
    } catch (error) {
        res.status(401).json({ error });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                const payload = await Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                if (payload) {
                    if (payload.role === "admin") {
                        req.user = payload;
                        next();
                    } else {
                        res.status(401).json({ message: "not authorized or an admin" });
                    }
                } else {
                    res.status(400).json({ message: "token verification failed" });
                }
            } else {
                res.status(400).json({ message: "malformed auth header" });
            }
        } else {
            res.status(401).json({ message: "Auth failed" });
        }
    } catch (error) {
        res.status(401).json({ error });
    }
};