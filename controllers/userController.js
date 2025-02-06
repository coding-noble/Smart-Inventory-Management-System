const User = require('../models/User');

// Get all users
const getAllUsers = async (req, res) => {
    //#swagger.tags = ['User']
    //#swagger.summary = 'Get all users'
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
};

// Get a single user by ID
const getSingleUser = async (req, res) => {
    //#swagger.tags = ['User']
    //#swagger.summary = 'Fetch a single user by ID'
    //#swagger.parameters['id'] = { description: 'User ID' }
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    //#swagger.tags = ['User']
    //#swagger.summary = 'Create a new user'
    const { name, email, provider, providerId } = req.body;

    try {
        const existingUser = await User.findOne({ providerId });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const newUser = await User.create({
            name,
            email: email || null,
            provider,
            providerId,
            accessLevel: 'user'
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    //#swagger.tags = ['User']
    //#swagger.summary = 'Update user information'
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
};

// Update a users access level
const updateUsersAccessLevel = async (req, res) => {
    //#swagger.tags = ['User']
    //#swagger.summary = 'Update user access level'
    const { id } = req.params;
    const { accessLevel } = req.body;

    try {
        const validAccessLevels = ['admin', 'employee', 'user'];
        if (accessLevel && !validAccessLevels.includes(accessLevel)) {
            return res.status(400).json({ message: 'Invalid access level' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { accessLevel },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update users access level', error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    //#swagger.tags = ['User']
    //#swagger.summary = 'Delete a user by ID'
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    updateUsersAccessLevel,
    deleteUser,
};
