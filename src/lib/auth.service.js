const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET, REFRESH_SECRET } = require("../../config");

exports.hashPassword = async (password) => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
};

exports.comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

exports.generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "15m" });
};

exports.generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: "7d" });
};

exports.verifyToken = (token) => jwt.verify(token, JWT_SECRET);

exports.refreshToken = (oldRefreshToken) => {
    try {
        const decoded = jwt.verify(oldRefreshToken, REFRESH_SECRET);
        return exports.generateAccessToken({ id: decoded.id, role: decoded.role });
    } catch (err) {
        throw new Error("Invalid or expired refresh token");
    }
};
