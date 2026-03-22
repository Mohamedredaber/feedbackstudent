const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', 
            user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
const getallusers = async (req, res) => {
    try { 
        const users = await authService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};
module.exports = { register, login ,getallusers};
