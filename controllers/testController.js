const User = require('../models/User');

const findUserById = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming userId is passed as a parameter

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Error finding user by ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  findUserById,
};
