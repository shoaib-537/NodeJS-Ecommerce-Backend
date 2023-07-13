const User = require('../models/User');

const updateAddress = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming userId is passed as a parameter
        const { address } = req.body; // Assuming the new address is sent in the request body
        if (userId !== req.userId) return res.status(401).json({ error: 'Not Authorized' });


        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { address } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json(user.address);
    } catch (error) {
        console.error('Error updating address:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getAddress = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId).select('address')
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json(user.address)
    } catch (err) {
        console.error('Error while fetching address:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = {
    updateAddress,
    getAddress
};
