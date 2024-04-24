import jwt from 'jsonwebtoken';

export async function isAdmin(req, res, next) {
    const token = req.cookies.chattuAdmin;
    if (!token) {
        return res.status(401).json({ message: "Only Admin can Access" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const isAdmin = decoded === process.env.ADMIN_SECRET_KEY
        // Assuming your token has an isAdmin field.
        
        if (!isAdmin) {
            return res.status(403).json({ message: "Unauthorized access, only Admin can access" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
