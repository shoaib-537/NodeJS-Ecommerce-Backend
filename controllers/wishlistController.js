const Wishlist = require('../models/Wishlist');

// Create a new Wishlist
const createWishlist = async (req, res) => {
  try {
    const { userId, product } = req.body;
    const wishlist = new Wishlist({ userId, product });
    const savedWishlist = await wishlist.save();
    res.status(201).json(savedWishlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create wishlist' });
  }
};

// // Get all Wishlists
// const getAllWishlists = async (req, res) => {
//   try {
//     const wishlists = await Wishlist.find().populate('user').populate('product');
//     res.json(wishlists);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch wishlists' });
//   }
// };

// Get a single Wishlist by ID
const getWishlistById = async (req, res) => {
  try {

    // const regex = new RegExp(req.params.user)
    const wishlist = await Wishlist.find().populate('user').populate('product');
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
};

const getWishlistByUserId = async (req, res) => {
    try {
      const wishlists = await Wishlist.find({ userId: req.params.user })
        .populate('user')
        .populate('product');
      res.json(wishlists);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch wishlists' });
    }
  };

// // Update a Wishlist by ID
// const updateWishlist = async (req, res) => {
//   try {
//     const { user, product } = req.body;
//     const wishlist = await Wishlist.findByIdAndUpdate(
//       req.params.id,
//       { user, product },
//       { new: true }
//     );
//     if (!wishlist) {
//       return res.status(404).json({ error: 'Wishlist not found' });
//     }
//     res.json(wishlist);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update wishlist' });
//   }
// };

// Delete a Wishlist by ID
const deleteWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndRemove(req.params.id);
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }
    res.json({ message: 'Wishlist deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete wishlist' });
  }
};

module.exports = {
  createWishlist,
//   getAllWishlists,
  getWishlistById,
//   updateWishlist,
  deleteWishlist,
  getWishlistByUserId,
};
