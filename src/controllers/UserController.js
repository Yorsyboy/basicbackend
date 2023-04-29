import User from "../models/User.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res, next) => {
    const { name, username, password, imgUrl, role } = req.body;
    const hashedPassword = await bycrypt.hash(password, 10);
    const user = new User({
        name,
        username,
        password: hashedPassword,
        imgUrl,
    });
    try {
        const newUser = await user.save();
        const admin = 'admin'
        const role = user.username === admin ? 'admin' : 'user';
        const token = jwt.sign({
            username: user.username,
            role: role
        } , process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        res.status(201).json({ message: "user created", token, decoded });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            const validPassword = await bycrypt.compare(req.body.password, user.password);
            if (validPassword) {
                const bearer = jwt.sign({ username: user.username, role: user.role }, process.env.ACCESS_TOKEN_SECRET);
                res.status(200).json({ bearer: bearer });
            } else {
                res.status(401).json({ message: "password doesn't match" });
            }
        } else {
            res.status(401).json({ message: "user doesn't exist" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
};