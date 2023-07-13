const express = require('express');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();


// Create a new Wishlist
router.post('/wishlist', wishlistController.createWishlist);

// Get all Wishlists
// router.get('/wishlist', wishlistController.getAllWishlists);

// Get a single Wishlist by ID
router.get('/wishlist/:id', wishlistController.getWishlistById);

// Update a Wishlist by ID
// router.put('/wishlist/:id', wishlistController.updateWishlist);

// Update a Wishlist by UserID
router.get('/wishlist/user/:user', wishlistController.getWishlistByUserId);

// Delete a Wishlist by ID
router.delete('/wishlist/:id', wishlistController.deleteWishlist);

module.exports = router;
