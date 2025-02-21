exports.requireRole = (requiredRole) => (req, res, next) => {
    if (!req.user || !req.user.role) {
        console.log(`Unauthorized access attempt by unknown user`);
        return res.status(401).json({ error: "Unauthorized" });
    }

    const roleHierarchy = {
        "SuperAdmin": ["Admin", "Moderator", "User"],
        "Admin": ["Moderator", "User"],
        "Moderator": ["User"],
        "User": []
    };

    if (req.user.role !== requiredRole && !roleHierarchy[req.user.role]?.includes(requiredRole)) {
        console.log(`Access Denied: User ID ${req.user.id} attempted to access ${requiredRole} resources.`);
        return res.status(403).json({ error: "Access denied" });
    }
    next();
};
