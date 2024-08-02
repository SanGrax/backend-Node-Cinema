const User = require('../models/User');// Import the User model

// Function to register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;// Extract name, email, and password from the request body
        const user = new User({ name, email, password });// Create a new user instance
        await user.save();// Save the user to the database
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
};


// Function to log in a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;// Extract email and password from the request body
        const user = await User.findOne({ email, password });// Find the user by email and password
        if (user) {
            res.status(200).json({ message: 'User logged in successfully', user });
        } else {
            res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error logging in', error });
    }
};

// Export the functions for use in other parts of the application
module.exports = { registerUser, loginUser };
