import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import Paste from '../models/PasteModel.js';

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password required' });
        }

        const trimmedUsername = username.trim();

        const existingUser = await User.findOne({
            username: { $regex: `^${escapeRegex(trimmedUsername)}$`, $options: 'i' },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username: trimmedUsername, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ token, username: user.username });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const trimmedUsername = username.trim();

        const user = await User.findOne({
            username: { $regex: `^${escapeRegex(trimmedUsername)}$`, $options: 'i' },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ token, username: user.username });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: 'Password required' });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        await Paste.deleteMany({ owner: req.userId });
        await User.findByIdAndDelete(req.userId);

        res.status(200).json({ message: 'Account deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};