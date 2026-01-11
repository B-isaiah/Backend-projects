import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";
import { generateAccessToken } from "../../utils/token.js";

const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const newAccessToken = generateAccessToken(user._id);

        return res.status(200).json({
            accessToken: newAccessToken
        });
    } catch (error) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
};

export { refreshAccessToken };