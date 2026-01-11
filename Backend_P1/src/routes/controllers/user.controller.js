
import { User } from "../../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../../models/token.js";


// ================= REGISTER =================
const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const findExistingUser = async (username, email) => {
            const user = await User.findOne({
                $or: [
                    { email: email.toLowerCase() },
                    { username: username.toLowerCase() }
                ]
            });

            if (!user) return null;
            if (user.email === email.toLowerCase()) return "email";
            if (user.username === username.toLowerCase()) return "username";
        };

        const conflictField = await findExistingUser(username, email);
        if (conflictField) {
            return res.status(400).json({
                message: `${conflictField} already exists`
            });
        }

        const newUser = await User.create({
            username: username.toLowerCase(),
            password,
            email: email.toLowerCase()
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// ================= LOGIN =================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// ================= LOGOUT =================
const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.email, {
            refreshToken: null
        });

        return res.status(200).json({ message: "Logged out" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export { registerUser, loginUser, logoutUser };
