import jwt from "jsonwebtoken";

export const protect = (req, resp, next) => {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer "))
        return resp.status(401).send({ message: "Not authorized!" })
    
    const token = auth.split(" ")[1];

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode; // Attach to req instead of resp
        next();
    } catch (error) {
        resp.status(401).send({ message: "Auth failed! Token might be invalid or expired." });
    }
}

// admin role middleware
export const adminOnly = (req, resp, next) => {
    if (!req.user || req.user.role !== "admin") {
        return resp.status(403).send({ message: "Access denied. Admins only!" });
    }
    next();
}